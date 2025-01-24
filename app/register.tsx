import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { postRegister, postStudents, postTeachers } from "shared/service";
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
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const mutation = useMutation({
    mutationFn: async (payload: any) => postRegister(payload),
    mutationKey: ["register"],
  });

  const teacherMutation = useMutation({
    mutationFn: async (payload: any) => postTeachers(payload),
    mutationKey: ["create-teacher"],
  });

  const studentMutation = useMutation({
    mutationFn: async (payload: any) => postStudents(payload),
    mutationKey: ["create-students"],
  });

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    try {
      const payload = {
        ...data,
        fullName: `${data?.firstName} ${data?.lastName}`,
        phoneNumber: `${data?.countryCode?.callingCode}${data?.phoneUser}`,
        countryCode: data?.countryCode?.callingCode,
      };

      console.log(payload);

      if (payload.nip === null && payload.nim === null) {
        return "";
      } else {
        const response = await mutation.mutateAsync(payload);
        Toast.show({
          type: "success",
          text1: "Register Success",
          text2: "Your account has been successfully registered.",
        });

        console.log(response);

        if (response.status === 200) {
          if (response.data.nim === null && response.data.nip !== null) {
            const res = await teacherMutation.mutateAsync({
              userId: response.data._id,
              classId: "",
            });
            if (res.status === 200) {
              await AsyncStorage.setItem("userToken", response.data.token);
              router.push(`/(tabs)`);
            }
          } else {
            const res = await studentMutation.mutateAsync({
              userId: response.data._id,
              status: "active",
              classId: "",
            });
            if (res.status === 200) {
              await AsyncStorage.setItem("userToken", response.data.token);
              router.push(`/(tabs)`);
            }
          }
        }
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
            rules={{ required: "Nama Depan Wajib Di Isi" }}
            placeholder="Masukan Nama Depan"
          />

          <OrganismControlledInput
            control={control}
            name="lastName"
            rules={{ required: "Nama Belakang Wajib Di Isi" }}
            placeholder="Masukan Nama Belakang"
          />

          <OrganismControlledInput
            control={control}
            name="email"
            rules={{ required: "Email Wajib Di Isi" }}
            placeholder="Masukan email"
          />

          <PasswordFieldOrganism
            control={control}
            rules={{ required: "Kata Sandi Wajib Di Isi" }}
            name="password"
            placeholder="Masukan Kata Sandi"
          />

          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={toggleCheckbox}
              className={`w-6 h-6 rounded border-2 ${
                isChecked ? "bg-blue-500 border-blue-500" : "border-gray-400"
              } justify-center items-center`}
            >
              {isChecked && <View className="w-3 h-3 bg-white rounded" />}
            </TouchableOpacity>
            <Text className="text-base text-gray-800">
              Centang ini jika anda dosen
            </Text>
          </View>

          {isChecked ? (
            <OrganismControlledInput
              control={control}
              name="nip"
              rules={{ required: "NIP Wajib Di Isi" }}
              placeholder="Masukan NIP"
            />
          ) : (
            <OrganismControlledInput
              control={control}
              name="nim"
              rules={{ required: "NIM Wajib Di Isi" }}
              placeholder="Masukan NIM"
            />
          )}

          <PhoneNumberInputOrganism
            control={control}
            rules={{ required: "No Telfon Wajib Di Isi" }}
            name="phoneNumber"
            placeholder="Masukkan no telfon"
            onChangePhoneNumber={(params) => setValue(`phoneUser`, params)}
            onChangeSelectedCountry={(params) =>
              setValue(`countryCode`, params)
            }
          />
        </Animated.View>

        {/* Upload Gambar
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
        </Animated.View> */}

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
