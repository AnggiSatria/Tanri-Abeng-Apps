import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { getProductById, getShowsById } from "shared/service";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

interface Match {
  product?: {
    category: string;
    createdAt: string;
    price: number;
    qty: string;
    showId: string;
    updatedAt: string;
    _id: string;
  };
  show?: {
    _id: string;
    away: string;
    createdAt: string;
    date: string;
    home: string;
    location: string;
    times: string;
    updatedAt: string;
    url: any[];
  };
}

const MatchDetails: React.FC = () => {
  const { id } = useGlobalSearchParams();

  console.log(id);

  const [token, setToken] = useState<string | null>(null);
  const [dataDetails, setDataDetails] = useState<any>([]);
  console.log(dataDetails);

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
    queryKey: ["product-by-id", token, id],
    queryFn: async () => getProductById({}, token, id),
    enabled: !!token && !!id,
    refetchOnWindowFocus: false,
  });

  // Ambil data produk
  const {
    data: showData,
    isLoading: loadingShow,
    error: errorShow,
  } = useQuery({
    queryKey: ["show-by-id", token, productsData],
    queryFn: async () => getShowsById({}, token, productsData?.data?.showId),
    enabled: !!token && !!productsData,
    refetchOnWindowFocus: false,
  });

  const product = productsData?.data;
  const show = showData?.data;

  useEffect(() => {
    if (showData) {
      setDataDetails([{ product, show }]);
    }
  }, [showData]);

  const renderItem = ({ item }: { item: Match }) => {
    console.log(item);

    return (
      <View className="bg-white mx-4 my-2 rounded-lg p-4 shadow-sm">
        {/* Match Details */}
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-500 font-semibold">
            {item?.show?.date}
          </Text>
          <Text className="text-sm text-gray-500 ml-1">
            , {dayjs(item?.show?.times).format("LT")}
          </Text>
        </View>
        <View className="flex-row items-center mt-1">
          <MaterialCommunityIcons name="soccer" size={20} color="green" />
          <Text className="text-lg font-bold text-black ml-2">
            {dayjs(item?.show?.times).format("LT")}
          </Text>
        </View>
        <Text className="text-lg font-bold mt-2">
          {item?.show?.home} vs {item?.show?.away}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Venue: {item?.show?.location}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Category: {item?.product?.category}
        </Text>
        <Text className="text-sm text-gray-500 mt-1">Duration: 90 mins</Text>
      </View>
    );
  };

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
              {`${showData?.data?.home} vs ${showData?.data?.away}`}
            </Text>
          </View>
          <View className="flex-row mx-auto mt-3 justify-between items-center px-6 py-2 bg-white rounded-lg">
            {/* Date */}
            <View className="flex items-center">
              <Text className="text-sm font-semibold text-black">
                {showData?.data?.date}
              </Text>
            </View>
            {/* Dot */}
            <View className="flex items-center mx-2">
              <MaterialCommunityIcons name="circle" size={6} color="gray" />
            </View>
            {/* Category */}
            <View className="flex items-center">
              <Text className="text-sm font-semibold text-black">
                {productsData?.data?.category}
              </Text>
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
            data={dataDetails}
            keyExtractor={(item: any) => item?.product?.id}
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
                {formatCurrency(product?.price)} {/* Total price in IDR */}
              </Text>
              <Pressable
                onPress={() =>
                  router.push(`/formuser?productId=${product?._id}`)
                }
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
