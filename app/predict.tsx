import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const apiUrl = "https://backendflask-441120.uc.r.appspot.com";
const Predict = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [billingAmount, setBillingAmount] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [admissionType, setAdmissionType] = useState("");
  const [medication, setMedication] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [prediction, setPrediction] = useState(0);
  const [probability, setProbability] = useState(0.0);

  console.log(apiUrl);

  const router = useRouter();

  const predict = async () => {
    if (!age) {
      Alert.alert("Error", "Please enter age", [{ text: "OK" }], {
        cancelable: false,
      });
      return;
    }
    if (!gender) {
      Alert.alert("Error", "Please select your gender", [{ text: "OK" }], {
        cancelable: false,
      });
      return;
    }
    if (!bloodType) {
      Alert.alert("Error", "Please select your blood type", [{ text: "OK" }], {
        cancelable: false,
      });
      return;
    }
    if (!medicalCondition) {
      Alert.alert(
        "Error",
        "Please enter your medical condition",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      return;
    }
    if (!insuranceProvider) {
      Alert.alert(
        "Error",
        "Please enter your insurance provider",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      return;
    }
    if (!billingAmount) {
      Alert.alert(
        "Error",
        "Please enter your billing amount",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      return;
    }
    if (!roomNumber) {
      Alert.alert("Error", "Please enter your room number", [{ text: "OK" }], {
        cancelable: false,
      });
      return;
    }
    if (!admissionType) {
      Alert.alert(
        "Error",
        "Please enter your admission type",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      return;
    }
    if (!medication) {
      Alert.alert("Error", "Please enter your medication", [{ text: "OK" }], {
        cancelable: false,
      });
      return;
    }
    if (!selectedDate) {
      Alert.alert(
        "Error",
        "Please enter your admission date",
        [{ text: "OK" }],
        {
          cancelable: false,
        }
      );
      return;
    }
    const data = {
      features: [
        parseInt(age), //integer
        gender, //string
        bloodType, // string
        medicalCondition, //string
        insuranceProvider, // string
        parseFloat(billingAmount), //float
        parseInt(roomNumber), // integer
        admissionType, //string
        medication, //string
        selectedDate.getFullYear(), // integer
        selectedDate.getMonth() + 1, // integer
        selectedDate.getDate(), // integer
      ],
    };

    console.log("Data: ", data);

    const token = await AsyncStorage.getItem("healthToken");
    if (!token) {
      router.replace("/auth/");
      return;
    }
    console.log(token);
    const headers = {
      "Content-Type": "application/json",
      Autorization: `Bearer ${token}`,
    };
    await Axios.post(`${apiUrl}/predict`, data, { headers })
      .then((res) => {
        console.log(res.data);
        setPrediction(res.data.prediction);
        setProbability(res.data.probability);
        setModalVisible(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        width: "100%",
      }}
    >
      <Text style={styles.title}>Patient Details</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter age"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender</Text>
        <Picker
          style={styles.dropdownStyle}
          selectedValue={gender}
          onValueChange={setGender}
        >
          <Picker.Item label="Select gender" value="" />
          <Picker.Item label="Male" value="0" />
          <Picker.Item label="Female" value="1" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Blood Type</Text>
        <Picker
          style={styles.dropdownStyle}
          selectedValue={bloodType}
          onValueChange={setBloodType}
        >
          <Picker.Item label="Select blood type" value="" />
          <Picker.Item label="A+" value="1" />
          <Picker.Item label="A-" value="2" />
          <Picker.Item label="B+" value="6" />
          <Picker.Item label="B-" value="0" />
          <Picker.Item label="O+" value="3" />
          <Picker.Item label="O-" value="7" />
          <Picker.Item label="AB+" value="4" />
          <Picker.Item label="AB-" value="5" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medical Condition</Text>
        <Picker
          style={styles.dropdownStyle}
          selectedValue={medicalCondition}
          onValueChange={setMedicalCondition}
        >
          <Picker.Item label="Select medical condition" value="" />
          <Picker.Item label="Cancer" value="0" />
          <Picker.Item label="Obesity" value="1" />
          <Picker.Item label="Diabetes" value="2" />
          <Picker.Item label="Asthma" value="3" />
          <Picker.Item label="Hypertension" value="4" />
          <Picker.Item label="Arthritis" value="5" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Insurance Provider</Text>
        <Picker
          style={styles.dropdownStyle}
          selectedValue={insuranceProvider}
          onValueChange={setInsuranceProvider}
        >
          <Picker.Item label="Select insurance provider" value="" />
          <Picker.Item label="Blue Cross" value="0" />
          <Picker.Item label="Medicare" value="1" />
          <Picker.Item label="Aetna" value="2" />
          <Picker.Item label="UnitedHealthcare" value="3" />
          <Picker.Item label="Cigna" value="4" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Billing Amount</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter billing amount"
          value={billingAmount}
          onChangeText={setBillingAmount}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Room Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter room number"
          value={roomNumber}
          onChangeText={setRoomNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Admission Type</Text>
        <Picker
          style={styles.dropdownStyle}
          selectedValue={admissionType}
          onValueChange={setAdmissionType}
        >
          <Picker.Item label="Select admission type" value="" />
          <Picker.Item label="Urgent" value="0" />
          <Picker.Item label="Emergency" value="1" />
          <Picker.Item label="Elective" value="2" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Medication</Text>
        <Picker
          style={styles.dropdownStyle}
          selectedValue={medication}
          onValueChange={setMedication}
        >
          <Picker.Item label="Select medication" value="" />
          <Picker.Item label="Paracetamol" value="0" />
          <Picker.Item label="Ibuprofen" value="1" />
          <Picker.Item label="Aspirin" value="2" />
          <Picker.Item label="Penicillin" value="3" />
          <Picker.Item label="Lipitor" value="4" />
        </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Admission Date</Text>
        <Text
          style={[styles.input, { color: "black" }]}
          onPress={() => setShowDatePicker(true)}
        >
          {selectedDate.toLocaleDateString()}
        </Text>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}
      </View>
      <TouchableOpacity style={styles.button} onPress={predict}>
        <Text style={styles.buttonText}>Predict</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Prediction Result</Text>
            <Text style={styles.modalText}>
              Prediction:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {prediction ? prediction : 0}
              </Text>
            </Text>
            <Text style={styles.modalText}>
              Probability:{" "}
              <Text style={{ fontWeight: "bold" }}>
                {probability ? probability : 0}
              </Text>
            </Text>
            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Predict;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginVertical: 10,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dropdownStyle: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePicker: {
    width: "100%",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    marginVertical: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
