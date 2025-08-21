import React from "react";
import { View, Text, StyleSheet, Alert,TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { changeAppLanguage } from "../i18n/i18n"; 
import Ionicons from "react-native-vector-icons/Ionicons";
import { useAuth } from "../utils/context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
const{user,logout}=useAuth()
  const navigation = useNavigation();
  const switchLanguage = async (lang: "en" | "ar") => {
    changeAppLanguage(lang);

    Alert.alert(
      lang === "ar" ? "تم تغيير اللغة" : "Language Changed",
      lang === "ar"
        ? "أعد تشغيل التطبيق لرؤية التغييرات بالكامل."
        : "Restart the app to see full changes."
    );
  };
const _logout=()=>{
  logout();
  navigation.navigate('Login')
}
  return (
    <View style={styles.container}>
    {/* Profile Info */}
    <View style={styles.profileBox}>
      <Ionicons name="person-circle-outline" size={80} color="#4F8EF7" />
      <Text style={styles.email}>{user?.email}</Text>
    </View>

    {/* Language Section */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{t("profile")}</Text>
      <View style={styles.langRow}>
        <TouchableOpacity style={styles.langBtn} onPress={() => switchLanguage("en")}>
          <Text style={styles.langText}>English</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langBtn} onPress={() => switchLanguage("ar")}>
          <Text style={styles.langText}>العربية</Text>
        </TouchableOpacity>
      </View>
    </View>

    {/* Logout */}
    <TouchableOpacity onPress={()=>_logout()} style={styles.logoutBtn}>
      <Ionicons name="log-out-outline" size={22} color="white" />
      <Text style={styles.logoutText}>{t("logout")}</Text>
    </TouchableOpacity>
  </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  profileBox: {
    alignItems: "center",
    marginVertical: 30,
  },
  email: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
    color: "#333",
  },
  section: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  langRow: { flexDirection: "row", justifyContent: "space-around" },
  langBtn: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  langText: { fontSize: 14, fontWeight: "500" },
  logoutBtn: {
    marginTop: "auto",
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
