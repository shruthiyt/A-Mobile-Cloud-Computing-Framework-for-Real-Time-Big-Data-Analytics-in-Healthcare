import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const Support = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/support.jpg")}
        style={styles.logo}
      />
      <Text style={styles.title}>Support</Text>
      <Text style={styles.text}>
        For support, contact us at{" "}
        <Text style={{ fontWeight: "bold" }}>support@healthcareapp.com</Text> or
        call <Text style={{ fontWeight: "bold" }}>(123) 456-7890</Text>.
      </Text>
      <Text style={styles.text}>
        We are here to help you <Text style={{ fontWeight: "bold" }}>24/7</Text>{" "}
        with any questions you have about your healthcare predictions.
      </Text>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 26,
  },
  logo: {
    width: "100%",
    height: 250,
    marginBottom: 16,
  },
});
