import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import colors from "../assets/Theme.js/colors";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Icon,
  Ionicons,
  FontAwesome5,
  Feather,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Home = ({ navigation }) => {
  const customerData = useSelector((state) => state.customer);
  const [userID, setUserID] = useState(customerData.user_id);
  const [investment, setInvestment] = useState([]);

  useEffect(() => {
    fetchInvestment();
    fetchInvestment();
    fetchInvestment();
  }, []);

  const fetchInvestment = async () => {
    var formdata = new FormData();

    formdata.append("userID", userID);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    // Fetch data from the API
    fetch("https://www.pezabond.com/kapeso/fetchInvestment.php", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setInvestment(result);
        console.log(investment);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>
      <View
        style={{ alignItems: "center", width: screenWidth, marginBottom: 20 }}
      >
        <Text style={styles.heading}>Investment Tracker</Text>
      </View>

      <View style={styles.containerView}>
        <Text style={styles.textTop}>
          Total Assets: {investment.total_records} Assets
        </Text>
        <Text style={styles.textTop}>
          Total Investment: ZMW {investment.total_investment}
        </Text>

        <Text style={styles.textTop}>
          Profit: ZMW {investment.total_profit}
        </Text>
        <Text style={styles.textTop}>
          ACCOUNTBALANCE: ZMW{" "}
          {parseFloat(investment.total_profit) +
            parseFloat(investment.total_investment)}
        </Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.square, { backgroundColor: colors.row1 }]}
            onPress={() => navigation.navigate("AddAsset")}
          >
            <FontAwesome name="th-list" size={55} color={colors.textColor} />
            <Text style={styles.squareText}>Analyse Assets</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.square, { backgroundColor: colors.row2 }]}
            onPress={() => navigation.navigate("Portfolio")}
          >
            <Entypo name="briefcase" size={55} color={colors.textColor} />
            <Text style={styles.squareText}>Portfolio</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.square, { backgroundColor: colors.row3 }]}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons name="person" size={55} color={colors.textColor} />
            <Text style={styles.squareText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.square, { backgroundColor: colors.green }]}
            onPress={() => navigation.replace("Login")}
          >
            <Entypo name="log-out" size={55} color={colors.textColor} />
            <Text style={styles.squareText}>Signout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  heading: {
    color: colors.lightgray,
    fontSize: 25,
    justifyContent: "center",
  },
  textTop: {
    color: colors.lightgray,
    fontSize: 18,
    marginBottom: 10,
  },
  containerView: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 7,
  },
  mainContainer: {
    marginVertical: 10,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },
  square: {
    borderRadius: 10,
    height: screenWidth / 2,
    width: screenWidth / 2 - 27,
    justifyContent: "center",
    alignItems: "center",
  },
  squareText: {
    color: colors.textColor,
    fontWeight: "500",
    fontSize: 25,
    marginTop: 10,
  },
});
