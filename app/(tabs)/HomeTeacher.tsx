import { useMutation, useQuery } from "@tanstack/react-query";
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

const HomeTeacher: React.FC = (token: any) => {
  const [className, setClassName] = useState<string>("");
  const [schedule, setSchedule] = useState<string>("Monday");

  const { data: dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserInfo({}, token?.token),
    enabled: !!token?.token,
  });

  const User = dataUser && dataUser?.data;

  const { data: dataClassByUserId, refetch } = useQuery({
    queryKey: ["class"],
    queryFn: async () =>
      await getClass(
        {
          userId: User?._id,
        },
        token?.token
      ),
    enabled: !!token.token && !!User,
  });

  const classByUserId = dataClassByUserId && dataClassByUserId?.data;

  console.log(classByUserId);

  const mutationCreateClass = useMutation({
    mutationFn: async (payload: any) => postClass(payload, token?.token),
    mutationKey: ["create-class"],
  });

  const createClass = async () => {
    if (className.trim() === "") return;
    console.log(
      `Kelas baru "${className}" dengan jadwal "${schedule}" telah dibuat.`
    );

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
          <View className="bg-white p-4 rounded-lg shadow mt-2">
            <Text className="text-lg font-semibold">{item?.name}</Text>
            <Text className="text-gray-600">Jadwal: {item?.schedule}</Text>
            {/* <Text className="text-gray-600">{item.students} mahasiswa</Text> */}
          </View>
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
      <View className="bg-white rounded-lg shadow mt-2">
        <Picker
          selectedValue={schedule}
          onValueChange={(itemValue: any) => setSchedule(itemValue)}
          className="p-2"
        >
          <Picker.Item label="Monday" value="Monday" />
          <Picker.Item label="Tuesday" value="Tuesday" />
          <Picker.Item label="Wednesday" value="Wednesday" />
          <Picker.Item label="Thursday" value="Thursday" />
          <Picker.Item label="Friday" value="Friday" />
          <Picker.Item label="Saturday" value="Saturday" />
          <Picker.Item label="Sunday" value="Sunday" />
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
