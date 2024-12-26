import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeInRight,
} from "react-native-reanimated";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function RegisterScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "#192031",
      }}
    >
      <StatusBar style="light" />
      {/* Judul Halaman */}
      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        className="items-center mt-12"
      >
        <Text className="text-[#FFFFFF] text-2xl font-bold text-center mb-4">
          Create Account
        </Text>
      </Animated.View>
      <View className="flex-1 items-center px-6 mt-6">
        {/* Input Register */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(300).springify()}
          className="w-full space-y-4 gap-6"
        >
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#a5b4fc"
            className="bg-neutral-800 text-white p-4 rounded-lg w-full"
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#a5b4fc"
            className="bg-neutral-800 text-white p-4 rounded-lg w-full"
          />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#a5b4fc"
            keyboardType="email-address"
            className="bg-neutral-800 text-white p-4 rounded-lg w-full"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#a5b4fc"
            secureTextEntry
            className="bg-neutral-800 text-white p-4 rounded-lg w-full"
          />
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#a5b4fc"
            keyboardType="phone-pad"
            className="bg-neutral-800 text-white p-4 rounded-lg w-full"
          />
        </Animated.View>

        {/* Upload Gambar */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(500).springify()}
          className="w-full mt-4"
        >
          <Pressable
            onPress={handleImagePick}
            className="bg-neutral-800 border border-dashed border-[#a5b4fc] rounded-lg justify-center items-center py-10"
          >
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                style={styles.uploadedImage}
              />
            ) : (
              <Text className="text-[#a5b4fc] text-lg">Upload Image</Text>
            )}
          </Pressable>
        </Animated.View>

        {/* Tombol Register */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(700).springify()}
          className="w-full mt-8"
        >
          <Pressable
            onPress={() => router.push("/login")}
            className="bg-[#12B3A8] rounded-full justify-center items-center py-4"
          >
            <Text className="text-white text-lg font-bold">Register</Text>
          </Pressable>
        </Animated.View>

        {/* Tombol dan Teks Footer */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(900).springify()}
          className="flex-row mt-6 w-full justify-center"
        >
          <Text className="text-neutral-300 font-medium text-sm leading-[38px]">
            Already have an account?
          </Text>
          <Text className="text-[#12B3A8] font-bold text-sm leading-[38px] pl-2">
            Login
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  uploadedImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
});
