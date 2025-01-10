import React from "react";
import { View, Text, FlatList, Pressable, Image } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Ticket {
  id: string;
  matchDay: string;
  matchDate: string;
  matchTime: string;
  teams: string;
  venue: string;
  category: string;
  price: number;
}

const TicketDetails: React.FC = () => {
  const ticket: Ticket = {
    id: "1",
    matchDay: "Sunday",
    matchDate: "Jan 15, 2025",
    matchTime: "7:00 PM",
    teams: "Team A vs Team B",
    venue: "National Stadium",
    category: "VIP",
    price: 1500000, // Harga tiket dalam IDR
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  return (
    <View className="flex-1 bg-[#F5F7FA]">
      {/* Header */}
      <View className="bg-[#192031] pt-16 pb-8 rounded-b-lg">
        <View className="flex-row items-center justify-between px-4">
          <Pressable onPress={() => router.back()}>
            <View className="rounded-full bg-gray-500 p-2">
              <MaterialIcons
                name="keyboard-arrow-left"
                size={24}
                color="white"
              />
            </View>
          </Pressable>
          <Text className="text-white font-extrabold text-lg">Ticket Details</Text>
          <MaterialCommunityIcons
            name="ticket-confirmation"
            size={30}
            color="white"
          />
        </View>
        {/* Match Details */}
        <View className="mx-auto mt-4">
          <Text className="text-white text-xl font-bold text-center">
            {ticket.teams}
          </Text>
          <Text className="text-gray-400 text-sm text-center mt-1">
            {ticket.matchDay}, {ticket.matchDate} • {ticket.matchTime}
          </Text>
        </View>
        {/* Venue Info */}
        <View className="flex-row items-center justify-center mt-3">
          <MaterialCommunityIcons name="stadium" size={20} color="white" />
          <Text className="text-white font-medium text-sm ml-2">
            {ticket.venue}
          </Text>
        </View>
      </View>

      {/* Ticket Information */}
      <View className="mx-4 my-6 bg-white rounded-lg p-4 shadow-md">
        <Text className="text-lg font-bold text-black">Ticket Information</Text>
        <View className="flex-row items-center justify-between mt-4">
          <View>
            <Text className="text-sm text-gray-500">Category</Text>
            <Text className="text-base font-bold text-black mt-1">
              {ticket.category}
            </Text>
          </View>
          <View>
            <Text className="text-sm text-gray-500">Price</Text>
            <Text className="text-base font-bold text-green-600 mt-1">
              {formatCurrency(ticket.price)}
            </Text>
          </View>
        </View>
        <View className="mt-4">
          <Text className="text-sm text-gray-500">Venue</Text>
          <Text className="text-base font-bold text-black mt-1">
            {ticket.venue}
          </Text>
        </View>
      </View>

      {/* Ticket Code */}
      <View className="mx-4 bg-white rounded-lg p-4 shadow-md">
        <Text className="text-lg font-bold text-black">Your Ticket Code</Text>
        <View className="flex-row items-center justify-between mt-4 bg-gray-100 rounded-lg p-3">
          <Text className="text-lg font-bold text-black">X3PERHEQ</Text>
          <MaterialCommunityIcons name="qrcode-scan" size={30} color="black" />
        </View>
        <Text className="text-sm text-gray-500 mt-2">
          Show this QR Code at the gate to enter the venue.
        </Text>
      </View>

      {/* Footer */}
      <View className="absolute bottom-0 w-full p-4 bg-white shadow-lg">
        <Pressable
          className="bg-[#192031] py-4 rounded-lg"
          onPress={() => router.push("/thankyou")}
        >
          <Text className="text-center text-white text-lg font-bold">
            Done
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TicketDetails;
