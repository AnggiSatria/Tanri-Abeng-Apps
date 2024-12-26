import { Image, View, Text } from "react-native";

const Header = () => {
  return (
    <View className="flex-row justify-between items-center px-4">
      <View className="w-1/2 flex-row h-14 items-center">
        <View className="pr-2">
          <View className="overflow-hidden">
            <Image
              source={require("../assets/images/profile.webp")}
              className="w-14 h-14 border-2 border-white rounded-full"
            />
          </View>
        </View>
        <View>
          <Text className="text-base text-neutral-400 font-medium">
            {" "}
            Welcome back
          </Text>
          <Text className="text-xl text-white font-bold">
            {" "}
            William Murpy 👋
          </Text>
        </View>
      </View>
      <View className="w-1/2 flex-row space-x-4 justify-end items-center">
        <View className="bg-gray-600 rounded-full px-4 flex-row gap-2 items-center">
          <View className="bg-yellow-500 rounded-full w-8 h-8 justify-center items-center">
            <Text className="text-white font-semibold">P</Text>
          </View>
          <View className="justify-start items-start gap-1">
          <Text className="text-base text-gray-200">Flight Point</Text>
          <Text className="text-white">✈️ 5,231</Text>

          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;
