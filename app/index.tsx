import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          width: "100%",
          gap: 16,
        }}
      >
        <Image
          source={require("@/assets/images/home.jpg")}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to Healthcare Prediction App!</Text>
        <Text style={styles.text}>
          Predict your healthcare conditions with the help of our AI-powered
          prediction engine.
        </Text>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          router.push("/predict");
        }}
      >
        <Text style={styles.btnText}>Predict Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: "100%",
    height: 250,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  btnText: {
    color: "#fff",
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 26,
    paddingHorizontal: 16,
  },
});
