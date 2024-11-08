import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const router = useRouter();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    router.push("/auth/");
  };

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{
          title: "Health Prediction",
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerRight: () => {
            return (
              <MaterialIcons.Button
                name="logout"
                size={24}
                color="black"
                backgroundColor="transparent"
                onPress={logout}
                underlayColor="#eee"
              />
            );
          },
          headerLeft: () => {
            return (
              <AntDesign.Button
                name="customerservice"
                size={24}
                color="black"
                backgroundColor="transparent"
                onPress={() => {
                  router.push("/support");
                }}
                underlayColor="#eee"
              />
            );
          },
        }}
      />
      <Stack.Screen
        name="support"
        options={{
          title: "Support",
          headerBackVisible: true,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="predict"
        options={{
          title: "Predict",
          headerBackVisible: true,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
