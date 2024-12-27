import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Flight {
  id: string;
  departureDay: string;
  departureDate: string;
  departureTime: string;
  departureAirport: string;
  airline: string;
  class: string;
  arrivalDay: string;
  arrivalDate: string;
  arrivalTime: string;
  arrivalAirport: string;
  duration: string;
}

const FlightSchedule: React.FC = () => {
  const flights: Flight[] = [
    {
      id: "1",
      departureDay: "Tuesday",
      departureDate: "Sep 24",
      departureTime: "8:00 PM",
      departureAirport: "CGK Airport",
      airline: "Adam Airlines",
      class: "Economy M Class",
      arrivalDay: "Wednesday",
      arrivalDate: "Sep 25",
      arrivalTime: "8:05 AM",
      arrivalAirport: "BLI Airport",
      duration: "12 hrs 0 mins",
    },
  ];

  const renderItem = ({ item }: { item: Flight }) => (
    <View className="bg-white mx-4 my-2 rounded-lg p-4 shadow-sm">
      {/* Top Section: Departure */}
      <View className="flex-row items-center">
        <Text className="text-sm text-gray-500 font-semibold">
          {item.departureDay}
        </Text>
        <Text className="text-sm text-gray-500 ml-1">
          , {item.departureDate}
        </Text>
      </View>
      <View className="flex-row items-center mt-1">
        <MaterialCommunityIcons name="circle" size={8} color="orange" />
        <Text className="text-lg font-bold text-black ml-2">
          {item.departureTime}
        </Text>
      </View>
      <Text className="text-sm text-gray-500 mt-1 ml-4">
        {item.departureAirport}
      </Text>

      {/* Divider */}
      <View className="ml-4 border-l-2 border-orange-500 h-6"></View>

      {/* Middle Section: Airline and Class */}
      <View className="ml-6">
        <Text className="text-sm text-gray-600">{item.airline}</Text>
        <Text className="text-sm text-gray-500">{item.class}</Text>
      </View>

      {/* Divider */}
      <View className="ml-4 border-l-2 border-orange-500 h-6"></View>

      {/* Bottom Section: Arrival */}
      <View className="flex-row items-center mt-2">
        <Text className="text-sm text-gray-500 font-semibold">
          {item.arrivalDay}
        </Text>
        <Text className="text-sm text-gray-500 ml-1">, {item.arrivalDate}</Text>
      </View>
      <View className="flex-row items-center mt-1">
        <MaterialCommunityIcons name="circle" size={8} color="orange" />
        <Text className="text-lg font-bold text-black ml-2">
          {item.arrivalTime}
        </Text>
        <Text className="text-sm text-gray-500 ml-auto">{item.duration}</Text>
      </View>
      <Text className="text-sm text-gray-500 mt-1 ml-4">
        {item.arrivalAirport}
      </Text>
    </View>
  );

  // Fungsi untuk memformat mata uang IDR
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  };

  return (
    <View className="flex-1 bg-[#F5F7FA]">
      <View className="flex-1 bg-[#F5F7FA]">
        <View className="w-full bg-[#192031] pt-16 pb-8 rounded-b-lg">
          {/* Header */}
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
            <Text className="text-white font-extrabold text-lg">
              Flight Details
            </Text>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={30}
              color="white"
            />
          </View>
          {/* Route */}
          <View className="flex-row mx-auto mt-3 justify-start items-center px-8">
            <View>
              <Text className="text-lg font-bold text-white">Jakarta</Text>
            </View>
            <View className="w-[60%] justify-center items-center flex-row">
              <MaterialCommunityIcons
                name="arrow-right"
                size={30}
                color="white"
              />
            </View>
            <View>
              <Text className="text-lg font-bold text-white">Bali</Text>
            </View>
          </View>
          <View className="flex-row mx-auto mt-3 justify-between items-center px-6 py-2 bg-white rounded-lg">
            {/* Kolom Tanggal */}
            <View className="flex items-center">
              <Text className="text-sm font-semibold text-black">
                2024-07-30
              </Text>
            </View>

            {/* Titik */}
            <View className="flex items-center mx-2">
              <MaterialCommunityIcons name="circle" size={6} color="gray" />
            </View>

            {/* Jumlah Kursi */}
            <View className="flex items-center">
              <Text className="text-sm font-semibold text-black">1 seat</Text>
            </View>

            {/* Titik */}
            <View className="flex items-center mx-2">
              <MaterialCommunityIcons name="circle" size={6} color="gray" />
            </View>

            {/* Kelas */}
            <View className="flex items-center">
              <Text className="text-sm font-semibold text-black">Economy</Text>
            </View>
          </View>
        </View>
        <View className="flex-row mx-5 mt-3 mb-3 justify-between items-center">
          <Text className="text-lg font-bold">Search Results</Text>
          <Text className="text-base text-gray-700 font-medium">
            free rules
          </Text>
        </View>
        <View>
          <FlatList
            data={flights}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
        <View className="flex-row mx-5 mt-3 mb-3 justify-between items-center">
          <Text className="text-lg font-semibold">Trip Total</Text>
          <Text className="text-base text-gray-700 font-medium">
            12 hrs 5 mins
          </Text>
        </View>
        <View>
          <View className="w-full bg-[#192031] p-4 mt-5">
            <View className="flex-row items-center justify-between px-4">
              <Text className="text-white font-extrabold text-lg">
                {formatCurrency(3000000)} {/* Memformat Total dalam IDR */}
              </Text>
              <Pressable
                onPress={() => router.push("/formuser")}
                className="bg-[#12B3A8] w-1/2 rounded-md justify-center items-center p-2"
              >
                <Text className="text-white text-lg font-semibold">
                  Continue Booking
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FlightSchedule;
