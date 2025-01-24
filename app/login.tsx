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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SubmitHandler, useForm } from "react-hook-form";
import OrganismControlledInput from "shared/components/organisms/ControlledInput";
import OrganismButton from "shared/components/organisms/Button";
import { useMutation } from "@tanstack/react-query";
import { postLogin } from "shared/service";
import Toast from "react-native-toast-message";
import PasswordFieldOrganism from "shared/components/organisms/PasswordFieldOrganism";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: async (payload: any) => postLogin(payload),
    mutationKey: ["login"],
  });

  const onSubmit: SubmitHandler<FormData> = async (data: any) => {
    mutation
      .mutateAsync(data)
      .then((res: any) => {
        console.log(res);
        Toast.show({
          type: `success`,
          text1: `Login Success`,
          text2: `${res?.data?.message}`,
        });

        if (res.status === 200) {
          const setToken = async () => {
            await AsyncStorage.setItem("userToken", res.data.token);
            if (res?.data?.user?.nim !== "") {
              await AsyncStorage.setItem("status", "student");
            } else if (res?.data?.user?.nip !== "") {
              await AsyncStorage.setItem("status", "teacher");
            }
          };
          setToken();
          router.push(`/(tabs)`);
        }
      })
      .catch((err: any) => {
        if (err.status === "404") {
          Toast.show({
            type: `error`,
            text1: `Login Failed`,
            text2: `${err.message}`,
          });
        } else {
          Toast.show({
            type: `error`,
            text1: `Login Failed`,
            text2: `${err.response.data.message}`,
          });
        }
      });
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: "white",
      }}
    >
      <Toast />
      <StatusBar style="light" />
      {/* Logo dan Gambar */}

      <Animated.View
        entering={FadeInDown.duration(200).springify()}
        className="flex-row justify-center items-center mt-10 pb-5"
      ></Animated.View>
      <View className="flex-1 items-center px-6 mt-6">
        {/* Judul Halaman */}
        <Animated.View entering={FadeInRight.duration(600).springify()}>
          <Text className="text-[#0a0a0a] text-2xl font-bold text-center mb-4">
            Selamat Datang!
          </Text>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(600).delay(200).springify()}
        >
          <Text className="text-[#0a0a0a] text-sm text-center mb-8">
            Silahkan login atau daftar jika belum mempunyai akun
          </Text>
        </Animated.View>

        {/* Input Login */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(300).springify()}
          className="w-full gap-5 space-y-4"
        >
          <OrganismControlledInput
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            placeholder="Masukan Email"
            customStyles={{}}
          />

          <PasswordFieldOrganism
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            placeholder="Masukkan Kata Sandi"
            // customStyles={{}}
          />
        </Animated.View>

        {/* Tombol Login */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(500).springify()}
          className="w-full mt-8"
        >
          <OrganismButton
            title="Kirim"
            onPress={handleSubmit(onSubmit)}
            loading={false}
            style={{
              containerStyle: styles.buttonContainer,
              textStyle: styles.buttonText,
            }}
          />
        </Animated.View>

        {/* Tombol dan Teks Footer */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(700).springify()}
          className="flex-row mt-6 w-full justify-center"
        >
          <Text className="text-neutral-300 font-medium text-sm leading-[38px]">
            Belum Punya Akun?
          </Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text className="hover:text-[#1919e7] text-[#2525cb] font-bold text-sm leading-[38px] pl-2">
              Daftar
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  buttonContainer: {
    width: "100%",
    backgroundColor: "#2525cb",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});
