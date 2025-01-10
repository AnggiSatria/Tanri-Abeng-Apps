import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Alert, Linking } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, useGlobalSearchParams } from "expo-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SubmitHandler, useForm } from "react-hook-form";
import OrganismControlledInput from "shared/components/organisms/ControlledInput";
import {
  getProductById,
  getUserInfo,
  midtrans,
  postTransaction,
} from "shared/service";

type FormData = {
  fullName?: string;
  userId?: string;
  productId?: string;
  status?: string;
  paymentStatus?: string;
  qty?: number;
  email?: string;
  phoneNumber?: string;
};

const FormUser: React.FC = () => {
  const { productId } = useGlobalSearchParams();
  const { control, handleSubmit, setValue } = useForm<FormData>();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      const authToken = await AsyncStorage.getItem("userToken");
      setToken(authToken);
    };
    fetchToken();
  }, []);

  const { data: dataUser } = useQuery({
    queryKey: ["authUser", token],
    queryFn: () => getUserInfo({}, token),
    enabled: !!token,
  });

  const { data: productsData } = useQuery({
    queryKey: ["product-by-id", token, productId],
    queryFn: () => getProductById({}, token, productId),
    enabled: !!token && !!productId,
  });

  useEffect(() => {
    if (dataUser && productsData) {
      setValue("fullName", dataUser?.data?.fullName);
      setValue("productId", productsData?.data._id);
      setValue("userId", dataUser?.data?._id);
      setValue("paymentStatus", "unpaid");
      setValue("status", "Pending");
      setValue("email", dataUser?.data?.email);
      setValue("phoneNumber", dataUser?.data?.phoneNumber);
    }
  }, [dataUser, productsData, setValue]);

  const mutation = useMutation({
    mutationFn: (payload: any) => postTransaction(payload, token),
    mutationKey: ["post-transactions"],
  });

  const mutationMidtrans = useMutation({
    mutationFn: (payload: any) => midtrans(payload),
    mutationKey: ["post-midtrans"],
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!data.productId || !data.userId) {
      Alert.alert("Error", "Product and User information are required!");
      return;
    }

    const payloadTransactions = {
      productId: data.productId || productsData?.data._id,
      userId: data.userId,
      status: data.status || "Pending",
      paymentStatus: data.paymentStatus || "unpaid",
      qty: Number(data.qty),
    };

    try {
      const responseTransactions = await mutation.mutateAsync(
        payloadTransactions
      );

      const payloadMidtrans = {
        id: responseTransactions?.data._id,
        userId: data?.userId,
        productId: data?.productId || productsData?.data._id,
        status: data?.status || "Pending",
        paymentStatus: data?.paymentStatus || "unpaid",
        qty: Number(data?.qty),
        productPrice: productsData?.data.price,
        customerDetails: {
          first_name: dataUser?.data.firstName,
          last_name: dataUser?.data.lastName,
          email: dataUser?.data.email,
          phone: data?.phoneNumber || "+6221890213412",
        },
      };

      const responseMidtrans = await mutationMidtrans.mutateAsync(
        payloadMidtrans
      );

      const paymentUrl = responseMidtrans?.data?.redirectUrl;

      if (paymentUrl) {
        // Open the payment URL in the device's default browser
        Linking.openURL(paymentUrl);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "An error occurred while processing the payment.");
    }
  };

  return (
    <View className="flex-1 bg-[#F5F7FA]">
      <View className="w-full bg-[#192031] pt-16 pb-8 rounded-b-lg">
        <View className="flex-row items-center justify-between px-4">
          <Pressable onPress={() => router.back()}>
            <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
          </Pressable>
          <Text className="text-white font-extrabold text-lg">
            User Details
          </Text>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={30}
            color="white"
          />
        </View>
      </View>

      <View className="mx-6 mt-4">
        <Text className="text-lg font-bold text-black">Enter Your Details</Text>

        <OrganismControlledInput
          control={control}
          name="fullName"
          rules={{ required: "Full Name is required" }}
          placeholder="Enter your Full Name"
        />

        <OrganismControlledInput
          control={control}
          name="email"
          rules={{ required: "Email is required" }}
          placeholder="Enter your Email"
        />

        <OrganismControlledInput
          control={control}
          name="qty"
          rules={{
            required: "Seat count is required",
            min: { value: 1, message: "Minimum 1 seat required" },
            max: { value: 4, message: "Maximum 4 seats allowed" }
          }}          placeholder="Enter your Seat Count"
          keyboardType="numeric"
          maxLength={4}
        />
      </View>

      <View className="mx-6 mt-6">
        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-[#12B3A8] w-full rounded-md p-3"
        >
          <Text className="text-white text-lg font-semibold text-center">
            Submit Booking
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FormUser;
