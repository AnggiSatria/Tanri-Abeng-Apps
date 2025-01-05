import {
  Image,
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  Text,
  Pressable,
  TextInput,
  FlatList,
} from "react-native";
import {
  ArrowPathRoundedSquareIcon,
  ChevronDoubleRightIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TripOptionProps {
  pageNavigation: string;
  handleNavigationChange: (type: string) => void;
}

interface searchFlightData {
  originCity: string;
  destinationCity: string;
  departureDate: string;
  seat: number;
}

const TripOption: React.FC<TripOptionProps> = ({
  pageNavigation,
  handleNavigationChange,
}) => {
  const [token, setToken] = useState<string | null>(null);

  console.log(token);

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await AsyncStorage.getItem("userToken");
      if (authToken) {
        setToken(authToken);
      } else {
        setToken(null);
      }
    };

    fetchToken();
  }, [token]);

  // useEffect(() => {
  //   if (!token) {
  //     return router.push(`/login`);
  //   }
  // }, [token]);

  return (
    <View className="flex-row justify-between w-full px-4 py-2">
      <Pressable
        className="flex-row w-1/2"
        onPress={() => handleNavigationChange("oneWay")}
      >
        <View
          className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
            pageNavigation === "oneWay"
              ? " border-b-4 border-[#12B3AB]"
              : "border-transparent"
          }`}
        >
          <ChevronDoubleRightIcon
            size={20}
            color={pageNavigation === "oneWay" ? "#12B3AA" : "#000"}
            strokeWidth={pageNavigation === "oneWay" ? 3 : 2}
          />
          <Text
            className={`text-sm pl-2 ${
              pageNavigation === "oneWay" ? "text-[#12B3AA]" : "text-gray-600"
            }`}
            style={{ fontWeight: pageNavigation === "oneWay" ? "700" : "500" }}
          >
            One Way
          </Text>
        </View>
      </Pressable>
      <Pressable
        className="flex-row w-1/2"
        onPress={() => handleNavigationChange("roundTrip")}
      >
        <View
          className={`w-full justify-center items-center flex-row space-x-2 pb-2 ${
            pageNavigation === "roundTrip"
              ? " border-b-4 border-[#12B3AB]"
              : "border-transparent"
          }`}
        >
          <ArrowPathRoundedSquareIcon
            size={20}
            color={pageNavigation === "roundTrip" ? "#12B3AA" : "#000"}
            strokeWidth={pageNavigation === "roundTrip" ? 3 : 2}
          />
          <Text
            className={`text-sm pl-2 ${
              pageNavigation === "roundTrip"
                ? "text-[#12B3AA]"
                : "text-gray-600"
            }`}
            style={{
              fontWeight: pageNavigation === "roundTrip" ? "700" : "500",
            }}
          >
            Round Trip
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

{
  /* Location Components */
}

interface FlightOfferData {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: Date;
  returnDate: Date;
  adults: number;
  maxResults: number;
}

interface LocationInputProps {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onPress: () => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  placeholder,
  icon,
  value,
  onPress,
}) => (
  <View className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center">
    <Pressable onPress={onPress}>
      <View className="px-4 flex-row justify-between items-center">
        <View className="w-[15%] border-r-2 border-gray-200">{icon}</View>
        <View className="w-[80%] py-3">
          {value ? (
            <Text className="bg-transparent text-gray-600 font-bold">
              {value}
            </Text>
          ) : (
            <Text className="bg-transparent text-lg text-gray-600 font-semibold">
              {placeholder}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  </View>
);

interface DepartureDateProps {
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onPress: () => void;
}

const DepartureDate: React.FC<DepartureDateProps> = ({
  placeholder,
  icon,
  value,
  onPress,
}) => (
  <Pressable
    onPress={onPress}
    className="border-2 border-gray-300 mx-4 mb-4 rounded-2xl justify-center py-4 flex-row items-center pl-4"
  >
    <View className="w-[15%] border-r-2 border-gray-200">{icon}</View>
    <View className="w-[85%] px-4 items-start justify-start">
      <Text className="bg-transparent text-gray-600 font-bold">
        {value || placeholder}
      </Text>
    </View>
  </Pressable>
);

export default function TabTwoScreen() {
  const [isPending, setIsPending] = useState(false);
  const [pageNavigation, setPageNavigation] = useState("oneWay");
  const [flightOfferData, setFlightOfferData] = useState<FlightOfferData>({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: new Date(),
    returnDate: new Date(),
    adults: 0,
    maxResults: 10,
  });
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
  ];
  const renderItem = ({ item }) => (
    <View className="bg-white mx-4 my-2 rounded-lg p-4 shadow-sm">
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-bold">
          {item.airlineCode} - Garuda Indonesia ACC24
        </Text>
        {/* <View className="bg-green-100 px-2 py-1 rounded-lg">
            <Text className="text-xs text-green-700 font-semibold">
              Recommended
            </Text>
          </View> */}
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
  const handleSearch = () => {
    // Dummy data to be sent as query parameters
    const searchQuery = {
      originCity: searchFlightData.originCity,
      destinationCity: searchFlightData.destinationCity,
      departureDate: searchFlightData.departureDate,
      seat: searchFlightData.seat.toString(), // Mengonversi seat menjadi string
    };

    // Membuat query string dari object searchQuery
    const queryString = new URLSearchParams(searchQuery).toString();

    // Navigate to /searchResult dengan query parameters
    router.push(`/searchResult?${queryString}`);
  };

  const [searchFlightData, setSeacrhFlightData] = useState<searchFlightData>({
    originCity: "Soekarno-Hatta (CGK)",
    destinationCity: "Ngurah Rai (DPS)",
    departureDate: "31-01-2024",
    seat: 2,
  });

  const [selectedDate, setSelectedDate] = useState<any>(new Date());

  const handleNavigationChange = (type: string) => {
    setPageNavigation(type);
  };

  return (
    <View className="flex-1 items-center relative bg-[#F5F7FA]">
      <StatusBar style="light" />
      {isPending && (
        <View className="absolute z-50 w-full h-full justify-center items-center">
          <View className="bg-[#000000] bg-opacity-50 h-full w-full justify-center items-center"></View>
          <View className="absolute">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        </View>
      )}
      {/* Header */}
      <View
        className="h-64 mb-4 justify-start border-orange-600 w-full bg-[#192031] relative pt-16"
        style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
      >
        <Header />
      </View>
      {/* Form Area */}
      <View className="w-full px-4 mx-4 -mt-32">
        <View className="bg-white rounded-3xl pt-3 pb-4 shadow-md shadow-slate-300">
          <View className="flex-row justify-between w-full px-4 py-2">
            <TripOption
              pageNavigation={pageNavigation}
              handleNavigationChange={handleNavigationChange}
            />
          </View>
          {/* Location Input */}
          <LocationInput
            placeholder={
              searchFlightData.originCity
                ? searchFlightData.originCity
                : "Depature City"
            }
            icon={
              <FontAwesome5 size={20} color="gray" name="plane-departure" />
            }
            value={searchFlightData.originCity}
            onPress={() => router.push("/departure")}
          />
          <LocationInput
            placeholder={
              searchFlightData.destinationCity
                ? searchFlightData.destinationCity
                : "Destination City"
            }
            icon={<FontAwesome5 size={20} color="gray" name="plane-arrival" />}
            value={searchFlightData.destinationCity}
            onPress={() => router.push("/destination")}
          />
          <DepartureDate
            placeholder={
              selectedDate && selectedDate.length > 0
                ? selectedDate.replace(/^"|"$/g, "")
                : "Depature Date"
            }
            icon={<FontAwesome5 size={20} color="gray" name="calendar-alt" />}
            value={searchFlightData.departureDate.replace(/^"|"$/g, "")}
            onPress={() => router.push("/departuredate")}
          />
          {/* Seat */}
          <View className="border-2 border-gray-500 mx-4 py-3 rounded-2xl justify-center flex-row items-center pl-4">
            <View>
              <MaterialCommunityIcons
                size={20}
                color="gray"
                name="seat-passenger"
              />
            </View>
            <TextInput
              className="w-[85%] text-base px-4 text-gray-600 font-semibold"
              placeholder="Seat"
              keyboardType="numeric"
              value={String(searchFlightData.seat)}
              onChangeText={(text) => {
                const seatValue = parseInt(text, 10);

                const validSeatValue = isNaN(seatValue) ? 0 : seatValue;

                setSeacrhFlightData((prev) => ({
                  ...prev,
                  seat: validSeatValue,
                }));

                setFlightOfferData((prev) => ({
                  ...prev,
                  adults: validSeatValue,
                }));
              }}
            />
          </View>
          {/* search button */}
          <View className="w-full justify-start pt-2 px-4 mt-2">
            <Pressable
              className="bg-[#12B3AB] rounded-lg justify-center items-center py-4"
              onPress={handleSearch}
            >
              <Text className="text-center text-lg text-white font-bold">
                Search
              </Text>
            </Pressable>
          </View>
        </View>
        <View className="flex-row justify-between items-center px-5 py-4">
          <Text className="text-lg font-semibold text-black">
            Archive Tiket
          </Text>
          <Pressable
            className="flex-row justify-center items-center gap-2"
            onPress={() => {}}
          >
            <Text className="text-sm font-semibold text-black">see more</Text>
          </Pressable>
        </View>
        <FlatList
          data={dummyResults}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
