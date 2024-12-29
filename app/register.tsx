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
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "shared/service";
import Toast from "react-native-toast-message";
import OrganismControlledInput from "shared/components/organisms/ControlledInput";
import PhoneField from "shared/components/molecules/MoleculesPhoneInputField";
import PasswordFieldOrganism from "shared/components/organisms/PasswordFieldOrganism";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  url: any;
  fullName: string;
};

export default function RegisterScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  console.log(selectedImage);

  const { control, handleSubmit } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: async (payload) => postRegister(payload),
    mutationKey: ["register"],
  });

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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    mutation
      .mutateAsync(data)
      .then((res) => {
        console.log(res);
        Toast.show({
          type: `success`,
          text1: `Register Success`,
          text2: `${res?.data?.message}`,
        });
      })
      .catch((err) => {
        if (err.status === "404") {
          Toast.show({
            type: `error`,
            text1: `Register Failed`,
            text2: `${err.message}`,
          });
        } else {
          Toast.show({
            type: `error`,
            text1: `Register Failed`,
            text2: `${err.response.data.message}`,
          });
        }
      });
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "#192031",
      }}
    >
      <Toast />
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
      <View className="flex-1 items-center px-6 mt-0.5">
        {/* Input Register */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(300).springify()}
          className="w-full space-y-4 gap-2.5"
        >
          <OrganismControlledInput
            control={control}
            name="firstName"
            rules={{ required: "First Name is required" }}
            placeholder="Enter your First Name"
            customStyles={{}}
          />

          <OrganismControlledInput
            control={control}
            name="lastName"
            rules={{ required: "Last Name is required" }}
            placeholder="Enter your Last Name"
            customStyles={{}}
          />

          <OrganismControlledInput
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            placeholder="Enter your email"
            customStyles={{}}
          />

          <PasswordFieldOrganism
            control={control}
            name="password"
            // rules={{ required: "Password is required" }}
            placeholder="Enter your password"
          />

          {/* <PhoneField
            control={control}
            placeholder="Phone Number"
            name="phone"
            rules={{ required: "Phone number is required" }}
            defaultCode="ID"
          /> */}
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
            onPress={handleSubmit(onSubmit)}
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
          <Text
            onPress={() => router.push("/login")}
            className="text-[#12B3A8] font-bold text-sm leading-[38px] pl-2"
          >
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
