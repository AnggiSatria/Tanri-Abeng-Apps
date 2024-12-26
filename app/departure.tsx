import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router"; // Menggunakan useRouter hook
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

// Tipe untuk bandara
type Airport = {
  id: number;
  name: string;
  dataCode: string;
};

export default function DepartureScreen() {
  const [searchInput, setSearchInput] = useState<string>(""); // State untuk input pencarian
  const [selectedAirports, setSelectedAirports] = useState<Airport[]>([]); // Simpan semua bandara yang dipilih
  const router = useRouter(); // Menggunakan hook useRouter untuk navigasi

  // Data Dummy Bandara
  const airportData: Airport[] = [
    { id: 1, name: "Soekarno-Hatta", dataCode: "CGK" },
    { id: 2, name: "Ngurah Rai", dataCode: "DPS" },
    { id: 3, name: "Juanda", dataCode: "SUB" },
    { id: 4, name: "Kualanamu", dataCode: "KNO" },
    { id: 5, name: "Adisutjipto", dataCode: "JOG" },
  ];

  // Filter Data Berdasarkan Input
  const autoCompleteResults = searchInput
    ? airportData.filter((airport) =>
        airport.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : [];

  const handleInputChange = (value: string) => {
    setSearchInput(value); // Menangani perubahan input
  };

  const handleSelectAirport = (airport: Airport) => {
    // Tambahkan bandara ke dalam selectedAirports jika belum ada
    if (!selectedAirports.find((item) => item.id === airport.id)) {
      setSelectedAirports((prev) => [...prev, airport]);
    }
    setSearchInput(""); // Kosongkan input pencarian
  };

  return (
    <View className="flex-1 items-center bg-[#F5F7FA]">
      <View className="w-full h-full">
        <View
          className="pb-8 justify-start border-orange-600 w-full bg-[#192031] relative pt-16"
          style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
        >
          <View>
            {/* Header */}
            <View className="flex-row gap-4 justify-start items-center px-2">
              <Pressable
                onPress={() => router.back()} // Navigasi kembali
                className="flex-row items-center justify-center h-14 w-[20%]"
              >
                <View className="rounded-full bg-gray-500 w-10 h-10 justify-center items-center">
                  <MaterialIcons
                    name="keyboard-arrow-left"
                    size={26}
                    color="white"
                  />
                </View>
              </Pressable>
              <View className="w-[60%] justify-center items-center flex-row">
                <Text className="text-lg text-white font-extrabold">
                  Select Departure
                </Text>
              </View>
              <View>
                <MaterialCommunityIcons
                  name="dots-horizontal"
                  size={30}
                  color="white"
                />
              </View>
            </View>
          </View>
        </View>
        {/* Airport or City Search */}
        <View className="w-full py-4 px-4 relative">
          <View className="flex-row justify-between items-center bg-white border-2 border-gray-400 h-14 rounded-xl overflow-hidden">
            <View className="w-full h-full px-4 justify-center">
              <TextInput
                placeholder="search for airport or city"
                placeholderTextColor="gray"
                value={searchInput}
                onChangeText={handleInputChange} // Menangani perubahan input
                className="bg-transparent text-gray-600 h-full px-2 capitalize"
              />
            </View>
          </View>
          {/* Auto Complete Results */}
          {autoCompleteResults.length > 0 && (
            <View className="border-2 border-gray-400 bg-white rounded-xl shadow-sm mt-4">
              <FlatList
                data={autoCompleteResults}
                keyExtractor={(item) => item.id.toString()} // Pastikan id adalah string
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleSelectAirport(item)} // Menambahkan bandara yang dipilih
                    className="px-4 py-2 my-1 rounded-xl"
                  >
                    <Text className="text-gray-500 capitalize">
                      {item.name} ({item.dataCode})
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          )}
          {/* Tampilkan Bandara yang Dipilih */}
          {selectedAirports.length > 0 && (
            <View className="px-4 w-full">
              <Text className="text-gray-600 font-bold mt-4 mb-2">
                Previous Selected
              </Text>
              <View className="space-y-2 gap-2">
                {selectedAirports.map((airport) => (
                  <View
                    key={airport.id}
                    className="bg-white border-2 border-gray-300 rounded-xl px-4 py-3"
                  >
                    <Text className="text-gray-600 font-medium">
                      {airport.name} ({airport.dataCode})
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
