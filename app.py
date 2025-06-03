import pickle

import numpy as np
from flask import Flask, jsonify, request
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import (JWTManager, create_access_token,
                                get_jwt_identity, jwt_required)
from flask_sqlalchemy import SQLAlchemy

# Initialize the app, SQLAlchemy, bcrypt, and JWT
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Change this to a strong secret key

db = SQLAlchemy(app)

# Load the scaler and model for predictions
with open("scaler.pkl", "rb") as scaler_file:
    scaler = pickle.load(scaler_file)

with open("voting_classifier.pkl", "rb") as model_file:
    model = pickle.load(model_file)

# User model for SQLAlchemy
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# Create the database tables
with app.app_context():
    db.create_all()

# Register route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        access_token = create_access_token(identity={'username': username})
        return jsonify(access_token=access_token), 200

    return jsonify({'message': 'Invalid username or password'}), 401

# Test Results Mapping
test_results_mapping = {0: 'Normal', 1: 'Inconclusive', 2: 'Abnormal'}

# Protected route that requires authentication (JWT)
@app.route('/predict', methods=['POST'])
# @jwt_required()
def predict():
    data = request.get_json()
    print(data)
    features = np.array(data['features']).reshape(1, -1)

    # Scale features
    scaled_features = scaler.transform(features)

    # Make prediction
    prediction = model.predict(scaled_features)
    probability = model.predict_proba(scaled_features).max()
    
    # Convert the integer prediction to the corresponding string value
    prediction_str = test_results_mapping.get(int(prediction[0]), "Unknown")

    response = {
        "prediction": prediction_str,
        "probability": float(probability)
    }
    return jsonify(response)

# Logout route (optional - simply remove the token on the client-side)
@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({"message": "Successfully logged out"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
