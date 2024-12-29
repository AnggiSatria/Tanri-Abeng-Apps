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

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const { control, handleSubmit } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: async (payload) => postLogin(payload),
    mutationKey: ["login"],
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    mutation
      .mutateAsync(data)
      .then((res) => {
        console.log(res);
        Toast.show({
          type: `success`,
          text1: `Login Success`,
          text2: `${res?.data?.message}`,
        });
      })
      .catch((err) => {
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
        backgroundColor: "#192031",
      }}
    >
      <Toast />
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
        <Animated.View
          entering={FadeInDown.duration(600).delay(200).springify()}
        >
          <Text className="text-neutral-300 text-sm text-center mb-8">
            Login to your account to discover amazing flights and deals.
          </Text>
        </Animated.View>

        {/* Input Login */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(300).springify()}
          className="w-full gap-5 space-y-4"
        >
          {/* <TextInput
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
          /> */}

          <OrganismControlledInput
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            placeholder="Enter your email"
            customStyles={{}}
          />
          <OrganismControlledInput
            control={control}
            name="password"
            rules={{ required: "Password is required" }}
            placeholder="Enter your password"
            customStyles={{}}
          />
        </Animated.View>

        {/* Tombol Login */}
        <Animated.View
          entering={FadeInDown.duration(600).delay(500).springify()}
          className="w-full mt-8"
        >
          {/* <Pressable
            onPress={() => router.push("/(tabs)")}
            className="bg-[#12B3A8] rounded-full justify-center items-center py-4"
          >
            <Text className="text-white text-lg font-bold">Login</Text>
          </Pressable> */}
          <OrganismButton
            title="Submit"
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
            Don't have an account?
          </Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text className="text-[#12B3A8] font-bold text-sm leading-[38px] pl-2">
              Register
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
  },
  buttonText: {
    fontSize: 18,
  },
});
