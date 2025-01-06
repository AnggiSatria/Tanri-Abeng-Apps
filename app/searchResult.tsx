import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const SearchResults = () => {
  const dummyResults = [
    {
      id: "1",
      homeTeam: "Barcelona",
      awayTeam: "Real Madrid",
      matchDate: "2024-07-30",
      matchTime: "20:00",
      venue: "Camp Nou",
      ticketAvailability: "Available",
      price: "IDR 500,000",
    },
    {
      id: "2",
      homeTeam: "Manchester United",
      awayTeam: "Chelsea",
      matchDate: "2024-08-10",
      matchTime: "22:00",
      venue: "Old Trafford",
      ticketAvailability: "Sold Out",
      price: "IDR 750,000",
    },
    {
      id: "3",
      homeTeam: "Juventus",
      awayTeam: "AC Milan",
      matchDate: "2024-09-05",
      matchTime: "18:00",
      venue: "Allianz Stadium",
      ticketAvailability: "Pending",
      price: "IDR 300,000",
    },
  ];

  const renderItem = ({ item }) => (
    <View className="bg-white mx-4 my-2 rounded-lg p-4 shadow-sm">
      <Pressable onPress={() => router.push('/flightdetail')}>
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold">
            {item.homeTeam} vs {item.awayTeam}
          </Text>
          <View className="bg-green-100 px-2 py-1 rounded-lg">
            <Text className="text-xs text-green-700 font-semibold">
              {item.ticketAvailability === "Sold Out" ? "Sold Out" : "Available"}
            </Text>
          </View>
        </View>
        {/* Match Information */}
        <View className="flex-row justify-between items-center mt-2">
          <View>
            <Text className="text-gray-700 font-bold">{item.matchDate}</Text>
            <Text className="text-sm text-gray-500">Time: {item.matchTime}</Text>
          </View>
          <MaterialCommunityIcons name="stadium" size={24} color="teal" />
          <View>
            <Text className="text-gray-700 font-bold">{item.venue}</Text>
          </View>
        </View>
        {/* Footer */}
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-lg font-bold text-teal-600">{item.price}</Text>
          <View
            style={{
              backgroundColor:
                item.ticketAvailability === "Sold Out"
                  ? "red"
                  : item.ticketAvailability === "Pending"
                  ? "yellow"
                  : "green",
              paddingVertical: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              alignSelf: "flex-start",
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
              }}
            >
              {item.ticketAvailability}
            </Text>
          </View>
        </View>
      </Pressable>
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
      </View>

      <View className="flex-row mx-5 mt-3 mb-3 justify-between items-center">
        <Text className="text-lg font-bold">Search Results</Text>
        <Text className="text-base text-gray-700 font-medium">
          {dummyResults.length} results
        </Text>
      </View>

      {/* Results */}
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
