import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

interface Match {
  id: string;
  matchDay: string;
  matchDate: string;
  matchTime: string;
  teams: string;
  venue: string;
  category: string;
  duration: string;
}

const MatchDetails: React.FC = () => {
  const matches: Match[] = [
    {
      id: "1",
      matchDay: "Sunday",
      matchDate: "Jan 15",
      matchTime: "7:00 PM",
      teams: "Team A vs Team B",
      venue: "National Stadium",
      category: "VIP",
      duration: "90 mins",
    },
  ];

  const renderItem = ({ item }: { item: Match }) => (
    <View className="bg-white mx-4 my-2 rounded-lg p-4 shadow-sm">
      {/* Match Details */}
      <View className="flex-row items-center">
        <Text className="text-sm text-gray-500 font-semibold">
          {item.matchDay}
        </Text>
        <Text className="text-sm text-gray-500 ml-1">
          , {item.matchDate}
        </Text>
      </View>
      <View className="flex-row items-center mt-1">
        <MaterialCommunityIcons name="soccer" size={20} color="green" />
        <Text className="text-lg font-bold text-black ml-2">
          {item.matchTime}
        </Text>
      </View>
      <Text className="text-lg font-bold mt-2">{item.teams}</Text>
      <Text className="text-sm text-gray-500 mt-1">
        Venue: {item.venue}
      </Text>
      <Text className="text-sm text-gray-500 mt-1">
        Category: {item.category}
      </Text>
      <Text className="text-sm text-gray-500 mt-1">
        Duration: {item.duration}
      </Text>
    </View>
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
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
              Match Details
            </Text>
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={30}
              color="white"
            />
          </View>
          {/* Match Title */}
          <View className="flex-row mx-auto mt-3 justify-center items-center px-8">
            <Text className="text-lg font-bold text-white">
              Team A vs Team B
            </Text>
          </View>
          <View className="flex-row mx-auto mt-3 justify-between items-center px-6 py-2 bg-white rounded-lg">
            {/* Date */}
            <View className="flex items-center">
              <Text className="text-sm font-semibold text-black">
                2025-01-15
              </Text>
            </View>
            {/* Dot */}
            <View className="flex items-center mx-2">
              <MaterialCommunityIcons name="circle" size={6} color="gray" />
            </View>
            {/* Category */}
            <View className="flex items-center">
              <Text className="text-sm font-semibold text-black">VIP</Text>
            </View>
          </View>
        </View>
        <View className="flex-row mx-5 mt-3 mb-3 justify-between items-center">
          <Text className="text-lg font-bold">Match Info</Text>
          <Text className="text-base text-gray-700 font-medium">
            General Rules Apply
          </Text>
        </View>
        <View>
          <FlatList
            data={matches}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
        <View className="flex-row mx-5 mt-3 mb-3 justify-between items-center">
          <Text className="text-lg font-semibold">Match Duration</Text>
          <Text className="text-base text-gray-700 font-medium">90 mins</Text>
        </View>
        <View>
          <View className="w-full bg-[#192031] p-4 mt-5">
            <View className="flex-row items-center justify-between px-4">
              <Text className="text-white font-extrabold text-lg">
                {formatCurrency(150000)} {/* Total price in IDR */}
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

export default MatchDetails;
