// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../../utils/context/AuthContext";

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  MainTabs: undefined;
};

type LoginScreenNavProp = StackNavigationProp<RootStackParamList, "Login">;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavProp>();
  const { login } = useAuth(); 

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      navigation.replace("MainTabs");
    } else {
      Alert.alert("Invalid Credentials", "Please sign up first or try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ marginTop: 10 }}>
        <Button title="Go to Signup" onPress={() => navigation.navigate("Signup")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
});

export default LoginScreen;
