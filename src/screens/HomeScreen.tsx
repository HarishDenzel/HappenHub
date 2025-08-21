import React, { useCallback, useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity,Alert } from "react-native";
import { searchEvents } from "../services/ticketmaster";
import EventCard from "../components/EventCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFavorites } from "../utils/context/FavoritesContext";
import { useTranslation } from "react-i18next";



export default function HomeScreen() {
  const [city, setCity] = useState("Dubai");
  const [keyword, setKeyword] = useState("music");
  const [events, setEvents] = useState<any[]>([]);
  const navigation = useNavigation();
  const { favorites } = useFavorites();
  const { t } = useTranslation();  
  const fetchEvents = async () => {
    const res = await searchEvents(keyword, city);
    setEvents(res._embedded?.events || []);
  };
  useEffect(()=>{

  },[])

  useFocusEffect(
    useCallback(() => {
      fetchEvents(); // Refresh events when returning
    }, [favorites]) // re-run whenever favorites changes
  );
console.log("h==>",favorites)
  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Search Filters */}
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Keyword"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 8,
          padding: 8,
          borderRadius: 6,
        }}
      />
      <TextInput
        value={city}
        onChangeText={setCity}
        placeholder="City"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          marginBottom: 8,
          padding: 8,
          borderRadius: 6,
        }}
      />
      <TouchableOpacity  style={{height:35,width:'100%',backgroundColor:'#1688fa',alignItems:'center',justifyContent:'center',borderRadius:8}} onPress={fetchEvents} >
     <Text>{t(`search_placeholder`)}</Text>
        </TouchableOpacity>

      {/* Event List */}
      <FlatList
        data={events}
        extraData={favorites}
        keyExtractor={(item) => item.id}
       
        renderItem={({ item }) => (
          <EventCard
            event={item}
            isFavorite={favorites.some(f => f.id === item.id)}
            onPress={() =>
              navigation.navigate("EventDetails", { eventId: item.id })
            }
          />
        )}
      />
    </View>
  );
}
