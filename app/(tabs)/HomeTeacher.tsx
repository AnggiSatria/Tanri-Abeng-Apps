import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Picker,
} from "react-native";
import { getClass, getUserInfo, postClass } from "shared/service";

interface TeacherClass {
  name: string;
  schedule: string;
  userId: string;
}

interface HomeTeacherProps {
  token: string | any; // Sesuaikan tipe token
}

const HomeTeacher: React.FC<HomeTeacherProps> = ({ token }) => {
  const [className, setClassName] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("Monday");

  const { data: dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserInfo({}, token),
    enabled: !!token,
  });

  const User = dataUser && dataUser?.data;

  const { data: dataClassByUserId, refetch } = useQuery({
    queryKey: ["class"],
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

  const mutationCreateClass = useMutation({
    mutationFn: async (payload: any) => postClass(payload, token),
    mutationKey: ["create-class"],
  });

  const createClass = async () => {
    if (className.trim() === "") return;

    const response = await mutationCreateClass.mutateAsync({
      name: className,
      schedule: schedule,
      userId: User?._id,
    });

    if (response.status === 200 || response.status === 201) {
      refetch();
    }

    setClassName("");
    setSchedule("Monday");
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Daftar Kelas */}
      <Text className="text-xl font-bold text-gray-800">Kelas Saya</Text>
      <FlatList
        data={classByUserId}
        keyExtractor={(item) => item?._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/(tabs)/TeacherClassPage?classId=${item?._id}`)
            }
            className="bg-white p-4 rounded-lg shadow mt-2"
          >
            <Text className="text-lg font-semibold">{item?.name}</Text>
            <Text className="text-gray-600">Jadwal: {item?.schedule}</Text>
            {/* <Text className="text-gray-600">{item.students} mahasiswa</Text> */}
          </TouchableOpacity>
        )}
      />

      {/* Form Buat Kelas Baru */}
      <Text className="text-xl font-bold text-gray-800 mt-6">
        Buat Kelas Baru
      </Text>
      <TextInput
        className="bg-white p-2 rounded-lg shadow mt-2"
        placeholder="Nama Kelas"
        value={className}
        onChangeText={setClassName}
      />
      <Text className="text-gray-700 mt-4">Pilih Hari</Text>
      <View className="bg-white rounded-lg shadow mt-2 border border-black">
        <Picker
          selectedValue={schedule}
          onValueChange={(itemValue: any) => setSchedule(itemValue)}
          className="p-2"
        >
          <Picker.Item label="Senin" value="Senin" />
          <Picker.Item label="Selasa" value="Selasa" />
          <Picker.Item label="Rabu" value="Rabu" />
          <Picker.Item label="Kamis" value="Kamis" />
          <Picker.Item label="Jumat" value="Jumat" />
          <Picker.Item label="Sabtu" value="Sabtu" />
          <Picker.Item label="Minggu" value="Minggu" />
        </Picker>
      </View>
      <TouchableOpacity
        className="bg-blue-600 rounded-lg p-4 mt-4 items-center"
        onPress={createClass}
      >
        <Text className="text-white font-bold">Buat Kelas</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeTeacher;
