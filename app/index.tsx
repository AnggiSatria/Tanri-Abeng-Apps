import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "#192031",
      }}
    >
      <StatusBar style="light" />
      <Image
        className="mt-10"
        source={require("assets/images/indonesia-no-bg.png")}
        style={styles.halfScreenImage}
      />
      <View className="h-full">
        <View className="w-full px-4 items-center my-8">
          <Animated.View
            entering={FadeInDown.duration(200).springify()}
            className="flex-row justify-center items-center pb-5"
          >
            <MaterialCommunityIcons name="ticket" size={24} color="#12B3A8" />
            <Text className="text-[#FFFFFF] text-xl font-light leading-[60px] pl-1"></Text>
            <Text className="text-[#12B3A8] text-xl leading-[60px] pl-1 italic">
              Ticket ID
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInRight.duration(600).delay(600).springify()}
          >
            <Image
              source={require("assets/images/air-plane-image.png")}
              style={styles.airplaneImage}
            />
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(200).delay(200).springify()}
            className="mt-16"
          >
            <Text className="text-[#FFFFFF] text-[32px] font-medium leading-[40px] text-center">
              The Best Solution for Booking Tickets with a Smart System!
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.duration(200).delay(400).springify()}
            className="mt-5"
          >
            <Text className="text-neutral-300 text-sm font-medium leading-[20px] text-center">
              Enjoy the convenience of finding tickets at the best prices and
              schedules that suit your needs
            </Text>
          </Animated.View>
          {/* Tombol dan Footer */}
          <Animated.View
            entering={FadeInDown.duration(200).delay(600).springify()}
            className="h-1/4 w-full justify-start pt-4 px-10"
          >
            <Pressable
              onPress={() => router.push("/login")}
              className="bg-[#12B3A8] rounded-full justify-center items-center py-3"
            >
              <Text className="text-white font-bold text-lg">
                Discover our feature
              </Text>
            </Pressable>
            <View className="flex-row mt-4 w-full justify-center gap-2">
              <Text className="text-neutral-300 font-medium text-sm leading-[38px] text-center">
                Don't have an account?
              </Text>
              <Text className="text-white font-semibold text-sm leading-[38px] text-center">
                Register
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
    height: "50%",
    resizeMode: "cover",
    alignSelf: "center",
  },
  airplaneImage: {
    width: 350,
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
  },
});
