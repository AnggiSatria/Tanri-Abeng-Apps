import React from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
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

const TicketsPage: React.FC = () => {
  const tickets: Ticket[] = [
    {
      id: "1",
      matchDay: "Sunday",
      matchDate: "Jan 15, 2025",
      matchTime: "7:00 PM",
      teams: "Team A vs Team B",
      venue: "National Stadium",
      category: "VIP",
      price: 1500000,
    },
    {
      id: "2",
      matchDay: "Saturday",
      matchDate: "Feb 10, 2025",
      matchTime: "5:00 PM",
      teams: "Team C vs Team D",
      venue: "City Stadium",
      category: "General",
      price: 750000,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };

  const renderItem = ({ item }: { item: Ticket }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/tickets/[id]",
          params: { id: item.id },
        })
      }
      className="bg-white mx-4 my-2 rounded-lg p-4 shadow-sm"
    >
      {/* Match Details */}
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm text-gray-500 font-semibold">
            {item.matchDay}, {item.matchDate}
          </Text>
          <Text className="text-lg font-bold text-black mt-1">
            {item.teams}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            {item.matchTime} • {item.venue}
          </Text>
        </View>
        <View className="items-end">
          <Text className="text-sm text-gray-500">Category</Text>
          <Text className="text-base font-bold text-black">
            {item.category}
          </Text>
        </View>
      </View>
      {/* Price */}
      <View className="flex-row justify-between items-center mt-4">
        <Text className="text-base font-bold text-green-600">
          {formatCurrency(item.price)}
        </Text>
        <MaterialCommunityIcons name="ticket" size={24} color="#192031" />
      </View>
    </Pressable>
  );

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
          <Text className="text-white font-extrabold text-lg">My Tickets</Text>
          <MaterialCommunityIcons
            name="ticket-confirmation"
            size={30}
            color="white"
          />
        </View>
      </View>

      {/* Ticket List */}
      <FlatList
        data={tickets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Footer */}
      {tickets.length === 0 && (
        <View className="flex-1 justify-center items-center px-8">
          <MaterialCommunityIcons
            name="ticket-outline"
            size={80}
            color="gray"
          />
          <Text className="text-gray-600 text-lg font-bold text-center mt-4">
            No Tickets Available
          </Text>
          <Text className="text-gray-500 text-center mt-2">
            You haven't purchased any tickets yet.
          </Text>
          <Pressable
            onPress={() => router.push("/")}
            className="bg-[#192031] py-4 px-8 rounded-lg mt-6"
          >
            <Text className="text-center text-white text-lg font-bold">
              Buy Tickets
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default TicketsPage;
