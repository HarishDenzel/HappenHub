import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import EventCard from "../components/EventCard";
import { useFavorites } from "../utils/context/FavoritesContext";

export default function FavoritesScreen({ navigation }) {
   const [favorites1, setFavorites] = useState<any[]>([]);
   const { favorites,clearFavorites } = useFavorites();
  const load = async () => {
    
    setFavorites(favorites);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {favorites1.length === 0 ? (
        <Text style={styles.text}>No favorites yet ❤️</Text>
      ) : (
        <>
          <FlatList
            data={favorites1}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <EventCard
                event={item}
                onPress={() => navigation.navigate("EventDetails", { event: item })}
              />
            )}
          />
          <TouchableOpacity
            onPress={async () => {
              await clearFavorites();
              setFavorites([]);
            }}
            style={styles.clearBtn}
          >
            <Text style={{ color: "white" }}>Clear All</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  text: { fontSize: 16, color: "#555", textAlign: "center", marginTop: 50 },
  clearBtn: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "red",
    alignItems: "center",
    borderRadius: 6,
  },
});
