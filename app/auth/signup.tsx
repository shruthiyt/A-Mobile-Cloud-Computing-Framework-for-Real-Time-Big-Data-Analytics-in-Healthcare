import { HelloWave } from "@/components/HelloWave";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const apiUrl = "https://backendflask-441120.uc.r.appspot.com";

export default function TabTwoScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("healthToken").then((token) => {
      if (token) {
        router.push("/");
      }
    });
  }, []);

  const signup = async () => {
    if (!email) {
      Alert.alert("Email is required!", "Please enter your email to sign up!", [
        { text: "OK" },
      ]);
      return;
    }
    if (!password) {
      Alert.alert(
        "Password is required!",
        "Please enter your password to sign up!",
        [{ text: "OK" }]
      );
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(
        "Passwords do not match!",
        "Please make sure your passwords match!",
        [{ text: "OK" }]
      );
      return;
    }
    await Axios.post(`${apiUrl}/register`, {
      username: email,
      password,
    })
      .then((res) => {
        if (res.status === 201) {
          Alert.alert("Account created!", "Your account has been created!", [
            { text: "OK", onPress: () => router.push("/auth/") },
          ]);
        }
        console.log(res.status);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          Alert.alert(
            "Signup Failed",
            "A user with this email already exists. Please choose a different email or login instead.",
            [{ text: "OK" }]
          );
        } else {
          console.error(err);
          Alert.alert(
            "Error",
            "An unexpected error occurred. Please try again.",
            [{ text: "OK" }]
          );
        }
      });
  };

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Image
            source={require("@/assets/images/login.jpg")}
            style={styles.logo}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Sign Up!</Text>
            <HelloWave />
          </View>
          <View style={styles.stepContainer}>
            <Text>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
            <Text>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              secureTextEntry
            />
            <TouchableOpacity onPress={() => signup()} style={styles.btn}>
              <Text style={styles.btnText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  logo: {
    height: 200,
    width: "100%",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    color: "black",
  },
  btn: {
    backgroundColor: "#1D3D47",
    color: "white",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 8,
  },
  btnText: {
    color: "white",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
