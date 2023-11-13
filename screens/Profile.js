import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../assets/Theme.js/colors";
import { useSelector } from "react-redux";

const Profile = () => {
  const customerData = useSelector((state) => state.customer);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 0.5,
          padding: 15,
          borderColor: colors.white,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <AntDesign name="user" size={24} color="white" />
        <Text style={{ color: colors.white, marginStart: 5 }}>
          {customerData.user_name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 0.5,
          padding: 15,
          borderColor: colors.white,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Entypo name="email" size={24} color="white" />
        <Text style={{ color: colors.white, marginStart: 5 }}>
          {customerData.email}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 0.5,
          padding: 15,
          borderColor: colors.white,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Entypo name="phone" size={24} color="white" />
        <Text style={{ color: colors.white, marginStart: 5 }}>
          {customerData.contact}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 0.5,
          padding: 15,
          borderColor: colors.white,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <Entypo name="suitcase" size={24} color="white" />
        <Text style={{ color: colors.white, marginStart: 5 }}>
          {customerData.investment_type}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 0.5,
          padding: 15,
          borderColor: colors.white,
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <MaterialCommunityIcons
          name="gender-male-female"
          size={24}
          color="white"
        />
        <Text style={{ color: colors.white, marginStart: 5 }}>
          {customerData.gender}
        </Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 20,
    justifyContent: "center",
  },
});
