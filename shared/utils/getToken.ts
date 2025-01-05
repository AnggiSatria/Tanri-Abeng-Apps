import AsyncStorage from "@react-native-async-storage/async-storage";

const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default getToken
