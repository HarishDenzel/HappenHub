import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
};

type SplashScreenNavProp = StackNavigationProp<RootStackParamList, "Splash">;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavProp>();

  useEffect(() => {
    const checkAuth = async () => {
      const userToken = await AsyncStorage.getItem("userToken");
      setTimeout(() => {
        if (userToken) {
          navigation.replace("MainTabs");
        } else {
          navigation.replace("Login");
        }
      }, 1500); 
    };
    checkAuth();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CityPulse</Text>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
});

export default SplashScreen;
