import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Image, View, Text, TouchableOpacity, Alert } from "react-native";
import { User } from "shared/lib";
import { getUserInfo } from "shared/service";

interface Props {
  token: string | null;
  onLogout: () => void; // Fungsi logout diterima dari props
}

const Header = ({ data, onLogout }: User | any) => {
  const photo = data?.data?.url?.[0]?.url;

  console.log(photo);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", onPress: onLogout },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-row justify-between items-center px-4">
      {/* Kiri: Informasi Pengguna */}
      <View className="w-1/2 flex-row h-14 items-center">
        <View className="pr-2">
          <View className="overflow-hidden">
            <Image
              source={photo || require("../assets/images/profile.webp")}
              className="w-14 h-14 border-2 border-white rounded-full"
            />
          </View>
        </View>
        <View>
          <Text className="text-base text-neutral-400 font-medium">
            Welcome back
          </Text>
          <Text className="text-xl text-white font-bold">
            {data?.data?.fullName} 👋
          </Text>
        </View>
      </View>

      {/* Kanan: Tombol Logout */}
      <View className="w-1/2 flex-row space-x-4 justify-end items-center">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-600 rounded-full px-4 py-2 flex-row items-center"
        >
          <Text className="text-white font-medium">Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
