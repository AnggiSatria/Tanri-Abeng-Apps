import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useDebounce } from "hooks/useDebounce";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import Toast from "react-native-toast-message";
import {
  getClassById,
  getMemberClass,
  getUserById,
  getUserInfo,
  getUsers,
  postMemberClass,
} from "shared/service";

interface User {
  Class: string;
  countryCode: string;
  email: string;
  firstName: string;
  fullName: string;
  isEmailVerified: boolean;
  lastName: string;
  nim: string | any;
  nip: string | any;
  password: string;
  phoneNumber: string;
  phoneUser: string;
  role: string[];
  _id: string;
  userId: string;
  taskId: string;
  createdBy: {
    Class: string;
    countryCode: string;
    email: string;
    firstName: string;
    fullName: string;
    isEmailVerified: boolean;
    lastName: string;
    nim: string | any;
    nip: string | any;
    password: string;
    phoneNumber: string;
    phoneUser: string;
    role: string[];
    _id: string;
  };
  classId: string;
}

interface Assignment {
  id: string;
  title: string;
  fileUrl: string; // URL untuk gambar atau PDF
}

const TeacherClassPage: React.FC = () => {
  const { classId } = useLocalSearchParams<{ classId: string }>();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      title: "Math Assignment",
      fileUrl: "https://example.com/sample.pdf",
    },
    {
      id: "2",
      title: "Science Assignment",
      fileUrl: "https://example.com/sample.jpg",
    },
  ]);

  console.log(selectedUsers);

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

  const debouncedText = useDebounce(searchTerm, 500);

  const { data: dataUser } = useQuery({
    queryKey: ["all-user", debouncedText, token],
    queryFn: async () =>
      await getUsers(
        {
          fullName: debouncedText,
        },
        token
      ),
    enabled: !!token,
  });

  const User = dataUser && dataUser?.data;

  const { data: dataClassById, refetch } = useQuery({
    queryKey: ["class-by-id"],
    queryFn: async () => await getClassById({}, token, classId),
    enabled: !!token && !!classId,
  });

  const classById = dataClassById && dataClassById?.data;

  const { data: dataMemberClassByClassId } = useQuery({
    queryKey: ["member-class-by-class-id"],
    queryFn: async () =>
      getMemberClass(
        {
          classId: classId,
        },
        token
      ),
  });

  const memberClassByClassId =
    dataMemberClassByClassId && dataMemberClassByClassId?.data;

  const { data: dataUserById } = useQuery({
    queryKey: ["user-by-id", memberClassByClassId],
    queryFn: async () =>
      getUserById({}, token, memberClassByClassId?.[0]?.userId),
    enabled: !!memberClassByClassId?.[0]?.userId,
  });

  const userById: User = dataUserById && dataUserById?.data;

  useEffect(() => {
    if (userById) {
      setSelectedUsers([...selectedUsers, userById]);
    }
  }, [userById]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(
        User?.filter((user: any) =>
          user?.fullName?.toLowerCase()?.includes(text?.toLowerCase())
        )
      );
    }
  };

  const handleSelectUser = (user: User) => {
    if (!selectedUsers.some((u) => u?._id === user?._id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setSearchTerm("");
    setFilteredUsers([]);
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((user) => user?._id !== userId));
  };

  const mutationPostMember = useMutation({
    mutationKey: ["post-member-class"],
    mutationFn: async (payload: any) => postMemberClass(payload, token),
  });

  const handleSendInvitation = async () => {
    try {
      const response = await mutationPostMember.mutateAsync({
        classId,
        userId: selectedUsers?.[0]?._id,
      });

      console.log(response);

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: `success`,
          text1: `Send Invitation Success`,
          text2: ``,
        });
      }
    } catch (error: any) {
      // Alert.alert("Error", error.message || "Something went wrong");

      Toast.show({
        type: `error`,
        text1: `Send Invitation Failed`,
        text2: ``,
      });
    }
  };

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Toast />
      <Text className="text-2xl font-bold mb-4">{`${
        classById?.name
      } ${`(${classById?.schedule})`} - ${
        classById?.createdBy?.fullName
      }`}</Text>

      {/* Input untuk Autocomplete */}
      <Text className="text-lg font-semibold mb-2">Invite Users</Text>
      <Autocomplete
        data={filteredUsers}
        value={searchTerm}
        onChangeText={handleSearch}
        placeholder="Search users..."
        flatListProps={{
          keyExtractor: (item: any) => item?._id,
          renderItem: ({ item }: { item: User }) => (
            <TouchableOpacity
              onPress={() => handleSelectUser(item)}
              className="p-2 border-b border-gray-200"
            >
              <Text>{item?.fullName}</Text>
            </TouchableOpacity>
          ),
        }}
        containerStyle={{
          borderWidth: 0,
          padding: 0,
          marginBottom: 8,
        }}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 4,
          paddingHorizontal: 8,
        }}
      />

      {/* List User yang Dipilih */}
      {selectedUsers.length > 0 && (
        <View className="mt-4">
          <Text className="text-lg font-semibold">Selected Users:</Text>
          <FlatList
            data={selectedUsers}
            keyExtractor={(item) => item?._id}
            renderItem={({ item }) => (
              <View className="flex-row items-center justify-between bg-gray-200 p-2 rounded-md mt-2">
                <Text>{item?.fullName}</Text>
                <TouchableOpacity onPress={() => handleRemoveUser(item?._id)}>
                  <Text className="text-red-500">Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      {/* Tombol Kirim Undangan */}
      <TouchableOpacity
        className="bg-blue-500 py-2 px-4 rounded-md mt-4"
        onPress={handleSendInvitation}
        disabled={selectedUsers.length === 0}
      >
        <Text className="text-white text-center">
          {selectedUsers.length > 0
            ? "Send Invitation"
            : "Select users to invite"}
        </Text>
      </TouchableOpacity>

      {/* List Tugas */}
      <Text className="text-xl font-semibold mt-6 mb-2">Assignments</Text>
      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white shadow rounded-md p-4 mb-4">
            <Text className="text-lg font-bold mb-2">{item.title}</Text>
            {item.fileUrl.endsWith(".pdf") ? (
              <Text className="text-blue-500">Preview PDF: {item.fileUrl}</Text>
            ) : (
              <Image
                source={{ uri: item.fileUrl }}
                className="w-full h-40 rounded-md"
                resizeMode="cover"
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

export default TeacherClassPage;
