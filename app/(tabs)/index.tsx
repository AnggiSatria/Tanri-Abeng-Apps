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
  ScrollView,
} from "react-native";
import {
  ArrowPathRoundedSquareIcon,
  ChevronDoubleRightIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker"; // Install library jika belum terpasang
import React, { useEffect, useState } from "react";
import Header from "components/Header";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
// import { ScrollView } from "react-native-reanimated/lib/typescript/Animated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getTransactions, getUserInfo } from "shared/service";
import { User } from "shared/lib";
import { getItem } from "shared/utils/getStorage";

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
            Domestic Match
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
            Internasional Match
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

  const {
    data: dataUser,
    isPending: isPendingUser,
    error: errorUser,
  } = useQuery({
    queryKey: ["authUser", token],
    queryFn: async () => getUserInfo({}, token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!token,
  });

  const AuthUser: User | any = dataUser;

  const [isPending, setIsPending] = useState(false);
  const [pageNavigation, setPageNavigation] = useState("oneWay");
  const [selectedClass, setSelectedClass] = useState("Economy"); // State untuk menyimpan kelas yang dipilih
  const [flightOfferData, setFlightOfferData] = useState<FlightOfferData>({
    originLocationCode: "",
    destinationLocationCode: "",
    departureDate: new Date(),
    returnDate: new Date(),
    adults: 0,
    maxResults: 10,
  });

  const {
    data: dataTransactions,
    isLoading: loadingTransactions,
    error: errorTransactions,
  } = useQuery({
    queryKey: ["listTransactions", token, AuthUser],
    queryFn: async () =>
      getTransactions(
        {
          userId: AuthUser?.data?._id,
        },
        token
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
    enabled: !!token && !!AuthUser,
  });

  const ListTransactions = dataTransactions?.data;

  const handleSearch = async () => {
    const searchQuery = {
      originCity: searchFlightData.originCity,
      destinationCity: searchFlightData.destinationCity,
      departureDate: searchFlightData.departureDate,
      seat: searchFlightData.seat.toString(),
    };

    // Membuat query string dari object searchQuery
    const queryString = new URLSearchParams(searchQuery).toString();

    // Navigate to /searchResult dengan query parameters

    router.push(`/searchResult?${queryString}`);
  };

  const [searchFlightData, setSearchFlightData] = useState<searchFlightData>({
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
    <ScrollView className="flex-1 bg-[#F5F7FA]">
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
          <Header data={AuthUser} />
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
            <View className="mx-4 my-3">
              {/* <Text className="text-gray-700 font-semibold mb-2">Select Class</Text> */}
              <View className="border-2 border-gray-500 rounded-2xl">
                <Picker
                  selectedValue={selectedClass}
                  onValueChange={(itemValue) => setSelectedClass(itemValue)}
                  style={{ height: 50, color: "gray" }}
                >
                  <Picker.Item label="Economy" value="Economy" />
                  <Picker.Item label="Medium" value="Medium" />
                  <Picker.Item label="VIP" value="VIP" />
                  <Picker.Item label="VVIP" value="VVIP" />
                  <Picker.Item
                    label="Supporters Section"
                    value="Supporters Section"
                  />
                </Picker>
              </View>
            </View>
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
                maxLength={1} // Membatasi input hanya 1 karakter jika diperlukan
                value={String(searchFlightData.seat)}
                onChangeText={(text) => {
                  // Konversi teks menjadi angka
                  const seatValue = parseInt(text, 10);

                  // Validasi nilai maksimal 4
                  const validSeatValue =
                    isNaN(seatValue) || seatValue > 4 ? 4 : seatValue;

                  // Update state hanya jika valid
                  setSearchFlightData((prev) => ({
                    ...prev,
                    seat: validSeatValue,
                  }));

                  // setFlightOfferData((prev) => ({
                  //   ...prev,
                  //   adults: validSeatValue,
                  // }));
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
          {/* <FlatList
        horizontal
          data={dummyResults}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingHorizontal: 20 }}
        />  */}
          <FlatList
            data={ListTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View
                style={{
                  width: "100%", // Menggunakan lebar penuh untuk elemen vertikal
                  marginVertical: 10, // Memberikan jarak vertikal antar item
                  padding: 10,
                  backgroundColor: "#ffffff", // Mengubah warna latar belakang menjadi putih
                  borderRadius: 8,
                }}
              >
                <View className="flex justify-between">
                  <Text style={{ fontWeight: "bold" }}>
                    {item.homeTeam} vs {item.awayTeam}
                  </Text>
                  <Text>{item.seat} </Text>
                  <Text>
                    {item.matchDate} at {item.matchTime}
                  </Text>
                  <Text>{item.venue}</Text>
                  <Text>{item.class}</Text>

                  <View
                    style={{
                      backgroundColor:
                        item.ticketAvailability === "Cancel"
                          ? "red"
                          : item.ticketAvailability === "Pending"
                          ? "#ffd32c"
                          : item.ticketAvailability === "Lunas"
                          ? "green"
                          : "black", // Default warna jika status tidak ditemukan
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 15, // Membuat bentuk melengkung
                      alignSelf: "flex-start", // Agar badge berada di sisi kiri
                      marginTop: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: "#f5f5f5",
                        fontWeight: "bold",
                      }}
                    >
                      {item.ticketAvailability}
                    </Text>
                  </View>

                  <Text style={{ fontWeight: "bold" }}>
                    Price: {item.price}
                  </Text>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>
      </View>
    </ScrollView>
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
