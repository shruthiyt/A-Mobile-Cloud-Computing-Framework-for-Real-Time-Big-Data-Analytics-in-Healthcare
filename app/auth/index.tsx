import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { HelloWave } from "@/components/HelloWave";
import Axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const apiUrl = process.env.EXPO_PUBLIC_URL;

export default function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        router.push("/");
      }
    });
  }, []);

  const loginFunc = async () => {
    if (!email) {
      Alert.alert("Email is required!", "Please enter your email to login!", [
        { text: "OK" },
      ]);
      return;
    }
    if (!password) {
      Alert.alert(
        "Password is required!",
        "Please enter your password to login!",
        [{ text: "OK" }]
      );
      return;
    }

    await Axios.post(`${apiUrl}/login`, {
      username: email,
      password,
    })
      .then((res) => {
        AsyncStorage.setItem("token", res.data.access_token);
        console.log(res.data.access_token);
        router.push("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.outerContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require("@/assets/images/login.jpg")}
          style={styles.logo}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome!</Text>
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
            placeholderTextColor={"#000"}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            placeholderTextColor={"#000"}
          />
          <TouchableOpacity onPress={() => loginFunc()} style={styles.btn}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
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
    width: "100%",
    height: 200,
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
});
