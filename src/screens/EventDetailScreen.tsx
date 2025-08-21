import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Platform } from "react-native";
import MapView, { Marker ,PROVIDER_GOOGLE} from "react-native-maps";
import { RouteProp, useRoute } from "@react-navigation/native";
import { getEventById,  } from "../services/ticketmaster";

export default function EventDetailsScreen() {
  const route = useRoute<RouteProp<any>>();
  const { eventId } = route.params as { eventId: string };
  const [event, setEvent] = useState<any>(null);
  useEffect(() => {
    const fetchEvent = async () => {
      const res = await getEventById(eventId);
      console.log("==>", res);
      setEvent(res);
    };
    fetchEvent();
  }, [eventId]);

  if (!event) {
    return (
      <View style={styles.center}>
        <Text>Loading event...</Text>
      </View>
    );
  }

  const venue = event._embedded?.venues?.[0];
  const latitude = parseFloat(venue?.location?.latitude || "25.276987"); // fallback Dubai
  const longitude = parseFloat(venue?.location?.longitude || "55.296249");

  return (
    <ScrollView style={styles.container}>
      {/* Event Image */}
      {event.images?.length > 0 && (
        <Image source={{ uri: event.images[0].url }} style={styles.image} />
      )}

      {/* Event Info */}
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.date}>{event.dates?.start?.localDate}</Text>
      <Text style={styles.venue}>
        {venue?.name}, {venue?.city?.name}
      </Text>

      {/* Map Preview */}
      <Text style={styles.mapLabel}>Event Location</Text>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title={venue?.name} />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 200 },
  title: { fontSize: 20, fontWeight: "bold", margin: 10 },
  date: { fontSize: 16, marginHorizontal: 10, color: "#555" },
  venue: { fontSize: 14, marginHorizontal: 10, marginBottom: 10, color: "#777" },
  mapLabel: { fontSize: 16, fontWeight: "600", margin: 10 },
  map: { width: Dimensions.get("window").width - 20, height: 250, margin: 10, borderRadius: 12 },
});
