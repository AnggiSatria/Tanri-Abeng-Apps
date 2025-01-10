import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getShows, getShowsById } from "shared/service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

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

  const [token, setToken] = useState<string | null>(null);
  const [combinedData, setCombinedData] = useState<any[]>([]);

  console.log(combinedData);

  // Ambil token
  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await AsyncStorage.getItem("userToken");
      setToken(authToken || null);
    };
    fetchToken();
  }, []);

  // Ambil data produk
  const {
    data: productsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["list-products", token],
    queryFn: async () => getProducts({}, token),
    enabled: !!token,
    refetchOnWindowFocus: false,
  });

  // Ambil detail show berdasarkan `showId` dan gabungkan data
  // useEffect(() => {
  //   const fetchAndCombineData = async () => {
  //     if (productsData?.data) {
  //       const results = await Promise.all(
  //         productsData.data.map(async (product: any) => {
  //           try {
  //             const showResponse = await getShowsById(
  //               {},
  //               token,
  //               product.showId
  //             );
  //             // Gabungkan data berdasarkan ID yang sama
  //             return { ...product, ...showResponse.data };
  //           } catch (error) {
  //             console.error(
  //               `Error fetching show details for ID: ${product.showId}`,
  //               error
  //             );
  //             return { ...product, showDetails: null };
  //           }
  //         })
  //       );
  //       setCombinedData(results);
  //     }
  //   };

  //   fetchAndCombineData();
  // }, [productsData, token]);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      if (productsData?.data) {
        const results = await Promise.all(
          productsData.data.map(async (product: any) => {
            try {
              const showResponse = await getShowsById(
                {},
                token,
                product.showId
              );

              // Gabungkan data dengan namespace
              return {
                product: { ...product }, // Data dari produk
                show: { ...showResponse.data }, // Data dari show
              };
            } catch (error) {
              console.error(
                `Error fetching show details for ID: ${product.showId}`,
                error
              );
              return {
                product: { ...product },
                show: null, // Show data tidak tersedia
              };
            }
          })
        );
        setCombinedData(results);
      }
    };

    fetchAndCombineData();
  }, [productsData, token]);

  const renderItem = ({ item }: any) => (
    <View className="bg-white mx-4 my-2 rounded-lg p-4 shadow-sm">
      <Pressable
        onPress={() => router.push(`/flightdetail?id=${item?.product?._id}`)}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-bold">
            {item?.show?.home} vs {item?.show?.away}
          </Text>
          <View className="bg-green-100 px-2 py-1 rounded-lg">
            <Text className="text-xs text-green-700 font-semibold">
              {item?.product?.qty === "0" ? "Sold Out" : "Available"}
            </Text>
          </View>
        </View>
        {/* Match Information */}
        <View className="flex-row justify-between items-center mt-2">
          <View>
            <Text className="text-gray-700 font-bold">{item?.show?.date}</Text>
            <Text className="text-sm text-gray-500">
              Time: {dayjs(item?.show?.times).format("LT")}
            </Text>
          </View>
          <MaterialCommunityIcons name="stadium" size={24} color="teal" />
          <View>
            <Text className="text-gray-700 font-bold">
              {item?.show?.location}
            </Text>
          </View>
        </View>
        {/* Footer */}
        <View className="flex-row justify-between items-center mt-4">
          <Text className="text-lg font-bold text-teal-600">
            {item?.product?.price}
          </Text>
          <View
            style={{
              backgroundColor:
                item?.product?.qty === "0"
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
              {item?.product?.qty}
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
          {combinedData?.length} results
        </Text>
      </View>

      {/* Results */}
      <FlatList
        data={combinedData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default SearchResults;
