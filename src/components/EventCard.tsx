// src/components/EventCard.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useFavorites } from "../utils/context/FavoritesContext";

export default function EventCard({ event, onPress }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  // check if this event is in favorites
  const liked = favorites.some((e) => e.id === event.id);

  const handleLike = () => {
    if (liked) {
      removeFavorite(event.id);
    } else {
      addFavorite(event);
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {event.images?.length > 0 && (
        <Image
          source={{ uri: event.images[0].url }}
          style={styles.image}
          resizeMode="cover"
        />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.date}>{event.dates?.start?.localDate}</Text>
        <Text style={styles.venue}>
          {event._embedded?.venues?.[0]?.name} -{" "}
          {event._embedded?.venues?.[0]?.city?.name}
        </Text>

        {/* Like button */}
        <TouchableOpacity onPress={handleLike} style={styles.likeButton}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={24}
            color={liked ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    position: "relative",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  venue: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },
  likeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
