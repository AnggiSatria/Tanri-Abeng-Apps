import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import {
  getClass,
  getClassById,
  getMemberClass,
  getUserInfo,
} from "shared/service";

interface Class {
  id: string;
  name: string;
  tasks: number;
}

interface HomeStudentProps {
  token: string | any; // Sesuaikan tipe token
}

const HomeStudent: React.FC<HomeStudentProps> = ({ token }) => {
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const { data: dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserInfo({}, token),
    enabled: !!token,
  });

  console.log(combinedData);

  const User = dataUser && dataUser?.data;

  const { data: dataClassByUserId, refetch } = useQuery({
    queryKey: ["class", token, User],
    queryFn: async () =>
      await getClass(
        {
          userId: User?._id,
        },
        token
      ),
    enabled: !!token && !!User,
  });

  const classByUserId = dataClassByUserId && dataClassByUserId?.data;

  const { data: dataMemberClassByUserId } = useQuery({
    queryKey: ["member-class-by-user-id"],
    queryFn: async () =>
      getMemberClass(
        {
          userId: User?._id,
        },
        token
      ),
    enabled: !!token,
  });

  const memberClassByUserId =
    dataMemberClassByUserId && dataMemberClassByUserId?.data;

  console.log(`member`, memberClassByUserId);

  useEffect(() => {
    const fetchAndCombineData = async () => {
      if (memberClassByUserId) {
        const results = await Promise.all(
          memberClassByUserId?.map(async (memberClass: any) => {
            try {
              const classResponse = await getClassById(
                {},
                token,
                memberClass?.classId
              );

              // Gabungkan data dengan namespace
              return {
                memberClass: { ...memberClass }, // Data dari produk
                class: { ...classResponse.data }, // Data dari show
              };
            } catch (error) {
              console.error(
                `Error fetching show details for ID: ${memberClass?.classId}`,
                error
              );
              return {
                memberClass: { ...memberClass },
                class: null, // Show data tidak tersedia
              };
            }
          })
        );
        setCombinedData(results);
      }
    };

    fetchAndCombineData();
  }, [memberClassByUserId, token]);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold text-gray-800">Kelas Anda</Text>
      <FlatList
        data={combinedData}
        keyExtractor={(item) => item?.class?._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className="bg-white p-4 rounded-lg shadow mt-2"
              onPress={() =>
                router.push(
                  `/(tabs)/StudentClassPage?classId=${item?.memberClass?.classId}`
                )
              }
            >
              <Text className="text-lg font-semibold">{item?.class?.name}</Text>
              <Text className="text-gray-600">{item.tasks}tugas tersedia</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default HomeStudent;
