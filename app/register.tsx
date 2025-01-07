// import React, { useState } from "react";
// import {
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   Pressable,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { StatusBar } from "expo-status-bar";
// import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
// import { router } from "expo-router";
// import * as ImagePicker from "expo-image-picker";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { postRegister } from "shared/service";
// import Toast from "react-native-toast-message";
// import OrganismControlledInput from "shared/components/organisms/ControlledInput";
// import PasswordFieldOrganism from "shared/components/organisms/PasswordFieldOrganism";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// type FormData = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   url: string[]; // URL is now an array of strings
// };

// export default function RegisterScreen() {
//   const [selectedImages, setSelectedImages] = useState<string[]>([]);
//   const { control, handleSubmit } = useForm<FormData>();

//   const mutation = useMutation({
//     mutationFn: async (payload) => postRegister(payload),
//     mutationKey: ["register"],
//   });

//   const handleImagePick = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImages(result.assets.map((asset) => asset.uri)); // Collect multiple URIs
//     }
//   };

//   const onSubmit: SubmitHandler<FormData> = async (data: any) => {
//     try {
//       const payload = {
//         ...data,
//         fullName: `${data?.firstName} ${data?.lastName}`,
//         phoneNumber: ``,
//         url: [
//           {
//             fileName: "image.png",
//             url: selectedImages.toString(),
//           },
//         ],
//       };

//       console.log(payload);

//       const response = await mutation.mutateAsync(payload);
//       Toast.show({
//         type: "success",
//         text1: "Register Success",
//         text2: "Your account has been successfully registered.",
//       });

//       console.log(response);

//       if (response.status === 200) {
//         await AsyncStorage.setItem("userToken", response.data.token);
//         router.push(`/(tabs)`);
//       }
//     } catch (err: any) {
//       Toast.show({
//         type: "error",
//         text1: "Register Failed",
//         text2: err.response?.data?.message || err.message,
//       });
//     }
//   };

//   return (
//     <SafeAreaView style={{ backgroundColor: "#192031", flex: 1 }}>
//       <Toast />
//       <StatusBar style="light" />

//       {/* Judul Halaman */}
//       <Animated.View
//         entering={FadeInDown.duration(400).springify()}
//         style={{ alignItems: "center", marginTop: 12 }}
//       >
//         <Text style={styles.title}>Create Account</Text>
//       </Animated.View>

//       {/* Form */}
//       <View style={{ flex: 1, alignItems: "center", paddingHorizontal: 24 }}>
//         <Animated.View
//           entering={FadeInUp.duration(600).delay(300).springify()}
//           style={{ width: "100%", marginTop: 20, gap: 16 }}
//         >
//           {/* Input Fields */}
//           <OrganismControlledInput
//             control={control}
//             name="firstName"
//             rules={{ required: "First Name is required" }}
//             placeholder="Enter your First Name"
//           />

//           <OrganismControlledInput
//             control={control}
//             name="lastName"
//             rules={{ required: "Last Name is required" }}
//             placeholder="Enter your Last Name"
//           />

//           <OrganismControlledInput
//             control={control}
//             name="email"
//             rules={{ required: "Email is required" }}
//             placeholder="Enter your email"
//           />

//           <PasswordFieldOrganism
//             control={control}
//             name="password"
//             placeholder="Enter your password"
//           />
//         </Animated.View>

//         {/* Upload Gambar */}
//         <Animated.View
//           entering={FadeInDown.duration(600).delay(500).springify()}
//           style={{ width: "100%", marginTop: 16 }}
//         >
//           <Pressable onPress={handleImagePick} style={styles.imagePicker}>
//             {selectedImages.length > 0 ? (
//               <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
//                 {selectedImages.map((uri, index) => (
//                   <Image
//                     key={index}
//                     source={{ uri }}
//                     style={styles.uploadedImage}
//                   />
//                 ))}
//               </View>
//             ) : (
//               <Text style={styles.uploadText}>Upload Images</Text>
//             )}
//           </Pressable>
//         </Animated.View>

//         {/* Tombol Register */}
//         <Animated.View
//           entering={FadeInUp.duration(600).delay(700).springify()}
//           style={{ width: "100%", marginTop: 24 }}
//         >
//           <Pressable
//             onPress={handleSubmit(onSubmit)}
//             style={styles.registerButton}
//           >
//             <Text style={styles.registerText}>Register</Text>
//           </Pressable>
//         </Animated.View>

//         {/* Footer */}
//         <Animated.View
//           entering={FadeInUp.duration(600).delay(900).springify()}
//           style={{ flexDirection: "row", marginTop: 16 }}
//         >
//           <Text style={styles.footerText}>Already have an account?</Text>
//           <Text onPress={() => router.push("/login")} style={styles.loginLink}>
//             Login
//           </Text>
//         </Animated.View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   title: {
//     color: "#FFFFFF",
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   imagePicker: {
//     backgroundColor: "#1F2937",
//     borderStyle: "dashed",
//     borderColor: "#a5b4fc",
//     borderRadius: 8,
//     borderWidth: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 40,
//   },
//   uploadedImage: {
//     width: 100,
//     height: 100,
//     resizeMode: "cover",
//     borderRadius: 50,
//   },
//   uploadText: {
//     color: "#a5b4fc",
//     fontSize: 16,
//   },
//   registerButton: {
//     backgroundColor: "#12B3A8",
//     borderRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 16,
//   },
//   registerText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   footerText: {
//     color: "#A0AEC0",
//     fontSize: 14,
//   },
//   loginLink: {
//     color: "#12B3A8",
//     fontSize: 14,
//     fontWeight: "bold",
//     paddingLeft: 4,
//   },
// });

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

  //   const handleImagePick = async () => {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 1,
  //     });

  //     if (!result.canceled) {
  //       setSelectedImage(result.assets[0].uri);
  //     }
  //   };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      try {
        // Convert the image URI to a blob
        const response = await fetch(uri);
        const blob = await response.blob();

        console.log("Blob created:", blob); // You can now use the blob (e.g., upload to a server)
        setSelectedImage(uri); // Still display the image preview using the URI
      } catch (error) {
        console.error("Error converting image to blob:", error);
      }
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
      <View className="flex-1 items-center px-6">
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
