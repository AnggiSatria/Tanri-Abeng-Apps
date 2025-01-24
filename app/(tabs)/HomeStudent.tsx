import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { getClass, getUserInfo, getUsers } from "shared/service";

interface Class {
  id: string;
  name: string;
  tasks: number;
}

const classes: Class[] = [
  { id: "1", name: "Pemrograman Mobile", tasks: 3 },
  { id: "2", name: "Basis Data", tasks: 2 },
];

const HomeStudent: React.FC = (token: any) => {
  const { data: dataUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUserInfo({}, token),
    enabled: !!token,
  });

  console.log(dataUser);

  // const {} = useQuery({
  //   queryKey: ["get-class"],
  //   queryFn: () => getClass({
  //     userId:
  //   }, token),
  // });

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-xl font-bold text-gray-800">Kelas Anda</Text>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="bg-white p-4 rounded-lg shadow mt-2">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-600">{item.tasks} tugas tersedia</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeStudent;
