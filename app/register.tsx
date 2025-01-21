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
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister } from "shared/service";
import Toast from "react-native-toast-message";
import OrganismControlledInput from "shared/components/organisms/ControlledInput";
import PasswordFieldOrganism from "shared/components/organisms/PasswordFieldOrganism";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import PhoneNumberInputFieldOrganism from "shared/components/organisms/PhoneNumberInput";
import PhoneNumberInputOrganism from "shared/components/organisms/PhoneNumber";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  url: string[]; // URL is now an array of strings
  countryCode?: any;
  phoneUser?: string;
};

export default function RegisterScreen() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const { control, handleSubmit, setValue } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: async (payload: any) => postRegister(payload),
    mutationKey: ["register"],
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImages(result.assets.map((asset) => asset.uri)); // Collect multiple URIs
    }
  };

  //  const handleImagePick = async () => {
  //    const result = await ImagePicker.launchImageLibraryAsync({
  //      mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //      allowsEditing: true,
  //      aspect: [1, 1],
  //      quality: 1,
  //    });

  //    if (!result.canceled) {
  //      const uri = result.assets[0].uri;

  //      try {
  //        // Convert the image URI to a blob
  //        const response = await fetch(uri);
  //        const blob = await response.blob();

  //        console.log("Blob created:", blob); // You can now use the blob (e.g., upload to a server)
  //        setSelectedImage(uri); // Still display the image preview using the URI
  //      } catch (error) {
  //        console.error("Error converting image to blob:", error);
  //      }
  //    }
  //  };

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    try {
      const payload = {
        ...data,
        fullName: `${data?.firstName} ${data?.lastName}`,
        phoneNumber: `${data?.countryCode?.callingCode}${data?.phoneUser}`,
        countryCode: data?.countryCode?.callingCode,
        url: [
          {
            fileName: "image.png",
            url: selectedImages.toString(),
          },
        ],
      };

      console.log(payload);

      const response = await mutation.mutateAsync(payload);
      Toast.show({
        type: "success",
        text1: "Register Success",
        text2: "Your account has been successfully registered.",
      });

      console.log(response);

      if (response.status === 200) {
        await AsyncStorage.setItem("userToken", response.data.token);
        router.push(`/(tabs)`);
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Register Failed",
        text2: err.response?.data?.message || err.message,
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <Toast />
      <StatusBar style="light" />

      {/* Judul Halaman */}
      <Animated.View
        entering={FadeInDown.duration(400).springify()}
        style={{ alignItems: "center", marginTop: 12 }}
      >
        <Text className="mt-5" style={styles.title}>
          Buat Akun
        </Text>
      </Animated.View>

      {/* Form */}
      <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 15 }}>
        <Animated.View
          entering={FadeInUp.duration(600).delay(300).springify()}
          style={{ width: "100%", marginTop: 20, gap: 16 }}
        >
          {/* Input Fields */}
          <OrganismControlledInput
            control={control}
            name="firstName"
            rules={{ required: "First Name is required" }}
            placeholder="Masukan Nama Depan"
          />

          <OrganismControlledInput
            control={control}
            name="lastName"
            rules={{ required: "Last Name is required" }}
            placeholder="Masukan Nama Belakang"
          />

          <OrganismControlledInput
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            placeholder="Masukan email"
          />

          <PasswordFieldOrganism
            control={control}
            rules={{ required: "Password is required" }}
            name="password"
            placeholder="Masukan Kata Sandi"
          />

          <PhoneNumberInputOrganism
            control={control}
            rules={{ required: "Phone Number is required" }}
            name="phoneNumber"
            placeholder="Masukkan no telfon"
            onChangePhoneNumber={(params) => setValue(`phoneUser`, params)}
            onChangeSelectedCountry={(params) =>
              setValue(`countryCode`, params)
            }
          />
        </Animated.View>

        {/* Upload Gambar */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(500).springify()}
          style={{ width: "100%", marginTop: 16 }}
        >
          <Pressable onPress={handleImagePick} style={styles.imagePicker}>
            {selectedImages.length > 0 ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {selectedImages.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    style={styles.uploadedImage}
                  />
                ))}
              </View>
            ) : (
              <Text style={styles.uploadText}>Upload Images</Text>
            )}
          </Pressable>
        </Animated.View>

        {/* Tombol Register */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(700).springify()}
          style={{ width: "100%", marginTop: 24 }}
        >
          <Pressable
            onPress={handleSubmit(onSubmit)}
            style={styles.registerButton}
          >
            <Text style={styles.registerText}>Daftar</Text>
          </Pressable>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(900).springify()}
          style={{ flexDirection: "row", marginTop: 16 }}
        >
          <Text style={styles.footerText}>Sudah punya akun?</Text>
          <Text onPress={() => router.push("/login")} style={styles.loginLink}>
            Masuk
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#0a0a0a",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  imagePicker: {
    backgroundColor: "#1F2937",
    borderStyle: "dashed",
    borderColor: "#a5b4fc",
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  uploadedImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  uploadText: {
    color: "#a5b4fc",
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#2525cb",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  registerText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    color: "#0a0a0a",
    fontSize: 14,
  },
  loginLink: {
    color: "#1919e7",
    fontSize: 14,
    fontWeight: "bold",
    paddingLeft: 4,
  },
});
