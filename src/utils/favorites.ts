import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITES_KEY = "FAVORITES";

export const getFavorites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FAVORITES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Failed to load favorites", e);
    return [];
  }
};

export const saveFavorites = async (favorites: any[]) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
};

export const addFavorite = async (event: any) => {
  const favorites = await getFavorites();
  if (!favorites.find((e) => e.id === event.id)) {
    favorites.push(event);
    await saveFavorites(favorites);
  }
};

export const removeFavorite = async (eventId: string) => {
  const favorites = await getFavorites();
  const newFavorites = favorites.filter((e) => e.id !== eventId);
  await saveFavorites(newFavorites);
 
};

export const clearFavorites = async () => {
  try {
    await AsyncStorage.removeItem(FAVORITES_KEY);
  } catch (e) {
    console.error("Failed to clear favorites", e);
  }
};
