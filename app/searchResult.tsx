import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const SearchResults = () => {
  const dummyResults = [
    {
      id: "1",
      airlineCode: "GA",
      fromCity: "Jakarta",
      fromAirport: "CGK",
      toCity: "Surabaya",
      toAirport: "SUB",
      duration: "1 hour 30 minutes",
      stops: "Non-stop",
      departureTime: "08:30 AM",
      arrivalTime: "10:00 AM",
      cabin: "Economy",
      price: "IDR 750,000",
    },
    {
      id: "2",
      airlineCode: "SJ",
      fromCity: "Bali",
      fromAirport: "DPS",
      toCity: "Jakarta",
      toAirport: "CGK",
      duration: "2 hours 10 minutes",
      stops: "Non-stop",
      departureTime: "01:00 PM",
      arrivalTime: "03:10 PM",
      cabin: "Business",
      price: "IDR 2,500,000",
    },
    {
      id: "3",
      airlineCode: "ID",
      fromCity: "Makassar",
      fromAirport: "UPG",
      toCity: "Balikpapan",
      toAirport: "BPN",
      duration: "1 hour 20 minutes",
      stops: "Non-stop",
      departureTime: "10:20 AM",
      arrivalTime: "11:40 AM",
      cabin: "Economy",
      price: "IDR 1,200,000",
    },
  ];

  const renderItem = ({ item }) => (
    <View className="bg-white mx-4 my-2 rounded-lg p-4 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold">{item.airlineCode}</Text>
        <View className="bg-green-100 px-2 py-1 rounded-lg">
          <Text className="text-xs text-green-700 font-semibold">
            Recommended
          </Text>
        </View>
      </View>
      {/* Route Information */}
      <View className="flex-row justify-between items-center mt-2">
        <View>
          <Text className="text-gray-700 font-bold">{item.fromCity}</Text>
          <Text className="text-sm text-gray-500">{item.fromAirport}</Text>
        </View>
        <MaterialCommunityIcons name="airplane" size={24} color="teal" />
        <View>
          <Text className="text-gray-700 font-bold">{item.toCity}</Text>
          <Text className="text-sm text-gray-500">{item.toAirport}</Text>
        </View>
      </View>
      {/* Time and Stops */}
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-sm text-gray-600">{item.departureTime}</Text>
        <Text className="text-xs text-gray-500">{item.stops}</Text>
        <Text className="text-sm text-gray-600">{item.arrivalTime}</Text>
      </View>
      {/* Duration */}
      <Text className="text-xs text-gray-500 mt-1">{item.duration}</Text>
      {/* Footer */}
      <View className="flex-row justify-between items-center mt-4">
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="seat" size={18} color="gray" />
          <Text className="text-sm text-gray-700 ml-1">{item.cabin}</Text>
        </View>
        <Text className="text-lg font-bold text-teal-600">{item.price}</Text>
      </View>
    </View>
  );

  return (
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
            Search Results
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
            <Text className="text-sm font-semibold text-black">2024-07-30</Text>
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

      {/* Results */}
      <View className="flex-row mx-5 mt-3 mb-3 justify-between items-center">
        <Text className="text-lg font-bold">Search Results</Text>
          <Text className="text-base text-gray-700 font-medium">
            10 results
          </Text>
      </View>
      <FlatList
        data={dummyResults}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default SearchResults;
