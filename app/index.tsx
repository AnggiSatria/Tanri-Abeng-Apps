import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await AsyncStorage.getItem("userToken");
      if (authToken) {
        setToken(authToken);
      } else {
        setToken(null);
      }
    };

    fetchToken();
  }, [token]);

  // useEffect(() => {
  //   if (token) {
  //     return router.push(`/(tabs)`);
  //   }
  // }, [token]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="light" />
      <Image
        className="bg-cover"
        source={require("assets/images/logo-tau.jpeg")}
        style={styles.halfScreenImage}
      />
      <View className="h-full">
        <View className="w-full h-full px-4 items-center flex flex-col justify-between">
          <Animated.View
            entering={FadeInDown.duration(200).delay(200).springify()}
            className="mt-5"
          ></Animated.View>
          <Animated.View
            entering={FadeInDown.duration(200).delay(600).springify()}
            className="h-1/4 w-full justify-start pt-4 px-10"
          >
            <Pressable
              onPress={() => router.push("/login")}
              className="bg-[#2525cb] hover:bg-[#1919e7] rounded-md justify-center items-center py-3"
            >
              <Text className="text-[#ffff] font-bold text-lg">Mulai</Text>
            </Pressable>
            <View className="flex-row mt-4 w-full justify-center gap-2">
              <Text className="text-neutral-300 font-medium text-sm leading-[38px] text-center">
                Belum punya akun?
              </Text>
              <Text
                onPress={() => router.push("/register")}
                className="hover:text-[#1919e7] text-[#2525cb] font-semibold text-sm leading-[38px] text-center"
              >
                Daftar
              </Text>
            </View>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  halfScreenImage: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  airplaneImage: {
    width: 350,
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
