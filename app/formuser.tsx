import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select'; // Import the picker component

const FormUser: React.FC = () => {
  // State variables for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [seatCount, setSeatCount] = useState("1");
  const [classType, setClassType] = useState("Economy");
  const [dob, setDob] = useState(new Date()); // Initial date set to current date
  const [openDatePicker, setOpenDatePicker] = useState(false); // To control visibility of date picker

  // Handle form submission
  const handleSubmit = () => {
    // Example validation
    if (!name || !email) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    // On successful submission, navigate to the next page or show confirmation
    Alert.alert("Success", `Booking details for ${name} submitted.`);
    // Redirect to another screen or further action here
    router.push("/(tabs)");
  };

  return (
    <View className="flex-1 bg-[#F5F7FA]">
      <View className="w-full bg-[#192031] pt-16 pb-8 rounded-b-lg">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4">
          <Pressable onPress={() => router.back()}>
            <View className="rounded-full bg-gray-500 p-2">
              <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
            </View>
          </Pressable>
          <Text className="text-white font-extrabold text-lg">User Details</Text>
          <MaterialCommunityIcons name="dots-horizontal" size={30} color="white" />
        </View>
      </View>

      <View className="mx-6 mt-4">
        <Text className="text-lg font-bold text-black">Enter Your Details</Text>

        {/* Name Input */}
        <Text className="text-sm text-gray-600 mt-4">Full Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "white",
          }}
        />

        {/* Email Input */}
        <Text className="text-sm text-gray-600">Email Address</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "white",
          }}
        />

        {/* Seat Count Input */}
        <Text className="text-sm text-gray-600">Seat Count</Text>
        <TextInput
          value={seatCount}
          onChangeText={setSeatCount}
          keyboardType="numeric"
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "white",
          }}
        />

        {/* Class Type Select (Dropdown) */}
        <Text className="text-sm text-gray-600 pb-2">Class</Text>
        <RNPickerSelect
          onValueChange={(value) => setClassType(value)} // Set class type
          items={[
            { label: 'Economy', value: 'Economy' },
            { label: 'Business', value: 'Business' },
          ]}
          value={classType} // Default value
          style={{
            inputIOS: {
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: "white",
              marginBottom: 12,
            },
            inputAndroid: {
              borderColor: "#ccc",
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: "white",
              marginBottom: 5,
            },
          }}
          placeholder={{
            label: "Select seat class...",
            value: null,
          }}
        />

        {/* Date of Birth Picker */}
        <Text className="text-sm text-gray-600 mt-4">Date of Birth</Text>
        <Pressable
          onPress={() => setOpenDatePicker(true)}
          style={{
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            marginBottom: 12,
            backgroundColor: "white",
          }}
        >
          <Text className="text-sm text-gray-600">
            {dob.toLocaleDateString()} {/* Display the selected date */}
          </Text>
        </Pressable>

        {/* Date Picker Modal */}
        {openDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setDob(selectedDate); // Set the selected date
              }
              setOpenDatePicker(false); // Close the date picker modal
            }}
          />
        )}
      </View>

      {/* Submit Button */}
      <View className="mx-6 mt-6">
        <Pressable
          onPress={handleSubmit}
          className="bg-[#12B3A8] w-full rounded-md justify-center items-center p-3"
        >
          <Text className="text-white text-lg font-semibold">Submit Booking</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default FormUser;
