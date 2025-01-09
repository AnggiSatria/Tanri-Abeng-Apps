import AsyncStorage from "@react-native-async-storage/async-storage";

const getItem = async (params: string) => {
    const getItems = await AsyncStorage.removeItem(params);  
    return getItems
};

export { getItem }