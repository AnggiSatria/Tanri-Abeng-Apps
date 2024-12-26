import { View, Text, Pressable, TextInput, FlatList, Alert } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Calendar } from "react-native-calendars";

const DepartureScreen = () => {
  const [flightOfferData, setFlightOfferData] = useState<any>({
    departureDate: new Date(),
  });

  // Fungsi untuk menyimpan tanggal keberangkatan
  const saveDepartureDate = () => {
    const formattedDate = flightOfferData.departureDate.toISOString().split("T")[0];
    // Simulasi penyimpanan (misalnya simpan ke server atau local storage)
    console.log("Departure Date Saved:", formattedDate);
    Alert.alert("Success", `Departure Date: ${formattedDate} has been saved!`);
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
                  Departure Date
                </Text>
              </View>
              <View>
                <Pressable
                  onPress={saveDepartureDate} // Menyimpan tanggal keberangkatan
                  className="flex-row items-center justify-center h-10 w-10"
                >
                  <Text className="text-white">Save</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
        <Calendar
          onDayPress={(day: any) => {
            setFlightOfferData({
              ...flightOfferData,
              departureDate: new Date(day.dateString),
            });
          }}
          markedDates={{
            [flightOfferData.departureDate.toISOString().split("T")[0]]: {
              selected: true,
              selectedColor: "#12B3AB",
              selectedTextColor: "white",
              disableTouchEvent: false,
            },
          }}
        />
      </View>
    </View>
  );
};

export default DepartureScreen;
