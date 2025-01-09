import AsyncStorage from "@react-native-async-storage/async-storage";

const removeItem = async (params: string) => {
    const removeItems = await AsyncStorage.removeItem(params);  
    return removeItems
};

export { removeItem }