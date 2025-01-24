// StudentClassPage.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { getClassById } from "shared/service";

interface Assignment {
  id: string;
  title: string;
}

const StudentClassPage: React.FC = () => {
  const { classId } = useLocalSearchParams<{ classId: string }>();
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: "1", title: "Math Assignment" },
    { id: "2", title: "Science Assignment" },
  ]);

  const [token, setToken] = useState<any>("");

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

  const { data: dataClassById, refetch } = useQuery({
    queryKey: ["class-by-id", classId],
    queryFn: async () => await getClassById({}, token, classId),
    enabled: !!token && !!classId,
  });

  const classById = dataClassById && dataClassById?.data;

  const handleFileUpload = (id: string) => {
    console.log(`Submitting assignment for ${id}`);
    // Tambahkan logika untuk mengunggah tugas
  };

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold mb-4">{`${
        classById?.name
      } ${`(${classById?.schedule})`}`}</Text>

      {/* List Tugas */}
      <Text className="text-xl font-semibold mb-2">Assignments</Text>
      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white shadow rounded-md p-4 mb-4">
            <Text className="text-lg font-bold mb-2">{item.title}</Text>
            <TouchableOpacity
              className="bg-blue-500 py-2 px-4 rounded-md"
              onPress={() => handleFileUpload(item.id)}
            >
              <Text className="text-white text-center">Submit Assignment</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default StudentClassPage;
