import { Image, StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp, FadeInRight } from "react-native-reanimated";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "#192031",
      }}
    >
      <StatusBar style="light" />
      {/* Logo dan Gambar */}

      <Animated.View
            entering={FadeInDown.duration(200).springify()}
            className="flex-row justify-center items-center pb-5"
          >
            <MaterialCommunityIcons name="airplane" size={24} color="#12B3A8" />
            <Text className="text-[#FFFFFF] text-xl font-light leading-[60px] pl-1">
              Univ
            </Text>
            <Text className="text-[#12B3A8] text-xl leading-[60px] pl-1 italic">
              Airplane
            </Text>
          </Animated.View>
      <View className="flex-1 items-center px-6 mt-6">
        {/* Judul Halaman */}
        <Animated.View entering={FadeInRight.duration(600).springify()}>
          <Text className="text-[#FFFFFF] text-2xl font-bold text-center mb-4">
            Welcome Back!
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.duration(600).delay(200).springify()}>
          <Text className="text-neutral-300 text-sm text-center mb-8">
            Login to your account to discover amazing flights and deals.
          </Text>
        </Animated.View>

        {/* Input Login */}
        <Animated.View entering={FadeInUp.duration(600).delay(300).springify()} className="w-full gap-5 space-y-4">
          <TextInput
            placeholder="Email"
            placeholderTextColor="#a5b4fc"
            className="bg-neutral-800 text-white p-4 rounded-lg w-full"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#a5b4fc"
            secureTextEntry
            className="bg-neutral-800 text-white p-4 rounded-lg w-full"
          />
        </Animated.View>

        {/* Tombol Login */}
        <Animated.View entering={FadeInDown.duration(600).delay(500).springify()} className="w-full mt-8">
          <Pressable
            onPress={() => router.push('/(tabs)')}
            className="bg-[#12B3A8] rounded-full justify-center items-center py-4"
          >
            <Text className="text-white text-lg font-bold">Login</Text>
          </Pressable>
        </Animated.View>

        {/* Tombol dan Teks Footer */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(700).springify()}
          className="flex-row mt-6 w-full justify-center"
        >
          <Text className="text-neutral-300 font-medium text-sm leading-[38px]">
            Don't have an account?
          </Text>
          <Pressable onPress={()=> router.push('/register')}>
          <Text className="text-[#12B3A8] font-bold text-sm leading-[38px] pl-2">
            Register
          </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

