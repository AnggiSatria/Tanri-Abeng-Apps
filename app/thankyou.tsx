import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const ThankYouPage: React.FC = () => {
  return (
    <View className="flex-1 bg-[#F5F7FA]">
      {/* Header */}
      <View className="bg-[#192031] pt-16 pb-8 rounded-b-lg">
        <View className="flex-row items-center justify-between px-4">
          <Pressable onPress={() => router.replace("/")}>
            <View className="rounded-full bg-gray-500 p-2">
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="white"
              />
            </View>
          </Pressable>
          <Text className="text-white font-extrabold text-lg">Thank You</Text>
          <MaterialCommunityIcons
            name="check-circle"
            size={30}
            color="white"
          />
        </View>
      </View>

      {/* Main Content */}
      <View className="flex-1 justify-center items-center px-8">
        {/* Success Icon */}
        <View className="bg-green-100 rounded-full p-6 mb-4">
          <MaterialCommunityIcons
            name="check-circle-outline"
            size={80}
            color="green"
          />
        </View>

        {/* Thank You Text */}
        <Text className="text-2xl font-bold text-gray-800 text-center">
          Thank You for Your Purchase!
        </Text>
        <Text className="text-gray-600 text-center mt-3">
          Your ticket has been successfully purchased. You will receive a
          confirmation email shortly with your ticket details.
        </Text>

        {/* Ticket Info */}
        <View className="mt-6 bg-white rounded-lg p-4 shadow-md w-full">
          <Text className="text-lg font-bold text-black text-center">
            Team A vs Team B
          </Text>
          <Text className="text-gray-600 text-center mt-1">
            Sunday, Jan 15, 2025 • 7:00 PM
          </Text>
          <Text className="text-gray-600 text-center mt-1">National Stadium</Text>
        </View>

        {/* Action Buttons */}
        <View className="w-full mt-6">
          <Pressable
            onPress={() => router.push("/tiket")}
            className="bg-[#192031] py-4 rounded-lg mb-3"
          >
            <Text className="text-center text-white text-lg font-bold">
              View My Tickets
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/")}
            className="bg-gray-200 py-4 rounded-lg"
          >
            <Text className="text-center text-gray-800 text-lg font-bold">
              Go to Home
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Footer */}
      <View className="absolute bottom-0 w-full p-4 bg-white">
        <Text className="text-center text-gray-500 text-sm">
          Need help? Contact our support team at support@ticketing.com
        </Text>
      </View>
    </View>
  );
};

export default ThankYouPage;
