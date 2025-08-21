import React, { createContext, useContext, useState, useEffect } from "react";
import { getFavorites, saveFavorites, clearFavorites as clearAll } from "../../utils/favorites";

const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const addFavorite = async (item) => {
    const newFavs = [...favorites, item];
    setFavorites(newFavs);
    await saveFavorites(newFavs);
  };

  const removeFavorite = async (id) => {
    const newFavs = favorites.filter(f => f.id !== id);
    setFavorites(newFavs);
    await saveFavorites(newFavs);
  };

  const clearFavorites = async () => {
    setFavorites([]);
    await clearAll();
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
