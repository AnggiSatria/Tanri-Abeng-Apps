import { Image, StyleSheet, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HelloWave } from "components/HelloWave";
import ParallaxScrollView from "components/ParallaxScrollView";
import { ThemedText } from "components/ThemedText";
import { ThemedView } from "components/ThemedView";

export default function HomeScreen() {
  <SafeAreaView className="flex-1">
    <View className="h-full px-4 items-center my-8">
      <View className="flex-row justify-center items-center pb-24">
        <MaterialCommunityIcons name="airplane" size={24} color="#12B3A8" />
      </View>
    </View>
  </SafeAreaView>;
}
