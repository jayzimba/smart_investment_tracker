import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import colors from "../assets/Theme.js/colors";
import { List, Modal, Portal, Button, TextInput } from "react-native-paper";
import { Alert } from "react-native";

const Portfolio = () => {
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loadingInvest, setLoadingInvestment] = useState(false);
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState([]);

  // api data will be assigned to this data object
  const [apiData, setApiData] = useState(null);

  const showModal = (item) => {
    setVisible(true);
    console.log(item);
    setAsset(item);
  };

  const hideModal = () => setVisible(false);

  const storeInvestment = () => {
    if (amount == 0) {
      Alert.alert(
        "Invalid Amount",
        "Enter Investment Amount for you to invest in " + asset.ticker
      );
    } else {
      setLoadingInvestment(true);
    }
  };

  const gainers = [
    {
      ticker: "SHAP+",
      price: "0.025",
      change_amount: "0.01",
      change_percentage: "66.6667%",
      volume: "189756",
    },
    {
      ticker: "CTOS+",
      price: "0.0263",
      change_amount: "0.0103",
      change_percentage: "64.375%",
      volume: "4950",
    },
    {
      ticker: "TGAAW",
      price: "0.05",
      change_amount: "0.0195",
      change_percentage: "63.9344%",
      volume: "500",
    },
  ];

  const loosers = [
    {
      ticker: "GMBLW",
      price: "0.0121",
      change_amount: "-0.0174",
      change_percentage: "-58.9831%",
      volume: "800",
    },
    {
      ticker: "AGBAW",
      price: "0.0112",
      change_amount: "-0.0136",
      change_percentage: "-54.8387%",
      volume: "13479",
    },
    {
      ticker: "ALTUW",
      price: "0.0251",
      change_amount: "-0.0249",
      change_percentage: "-49.8%",
      volume: "53400",
    },
    {
      ticker: "HHLA+",
      price: "0.025",
      change_amount: "-0.015",
      change_percentage: "-37.5%",
      volume: "1084",
    },
  ];

  const most_actively_traded = [
    {
      ticker: "SQQQ",
      price: "18.82",
      change_amount: "-0.68",
      change_percentage: "-3.4872%",
      volume: "141489404",
    },
    {
      ticker: "TSLA",
      price: "219.96",
      change_amount: "1.45",
      change_percentage: "0.6636%",
      volume: "118579793",
    },
    {
      ticker: "TQQQ",
      price: "37.58",
      change_amount: "1.28",
      change_percentage: "3.5262%",
      volume: "113598709",
    },
    {
      ticker: "PLTR",
      price: "18.895",
      change_amount: "0.925",
      change_percentage: "5.1475%",
      volume: "107445205",
    },
    {
      ticker: "SPY",
      price: "434.68",
      change_amount: "3.92",
      change_percentage: "0.91%",
      volume: "98428631",
    },
    {
      ticker: "NVOS",
      price: "0.298",
      change_amount: "0.0395",
      change_percentage: "15.2805%",
      volume: "93370309",
    },
  ];

  const containerStyle = {
    backgroundColor: "white",
    padding: 20,
    alignItems: "top",
    marginHorizontal: 20,
    height: "50%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
  };

  const apiKey = "17e5e451bdmshd00d8606aa55f97p1d410ajsn73edc050cfe7"; // Replace with your Alpha Vantage API key
  const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${apiKey}`; // only 25 requests a day because the API is free

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        if (response.status === 200) {
          // Data is successfully fetched as a JSON object:
          console.log(response);
          setApiData(response);
          const { top_gainers, top_losers, most_actively_traded } = apiData;
        } else {
          console.log("Status:", response.status);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   var requestOptions = {
  //     method: "GET",
  //     redirect: "follow",
  //   };

  //   fetch(
  //     "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=17e5e451bdmshd00d8606aa55f97p1d410ajsn73edc050cfe7",
  //     requestOptions
  //   )
  //     .then((response) => response.json())
  //     .then((result) => {
  //       setApiData(result);
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerView}>
        <Text style={styles.textTop}>Type: {"Share"}</Text>
        <Text style={styles.textTop}>Amount: ZMW {0}</Text>
        <Text style={styles.textTop}>Total Returns: ZMW {0}</Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          Most Actively Traded ( {most_actively_traded.length} )
        </Text>
        <View style={{ marginBottom: 20 }}>
          <FlatList
            horizontal={true}
            data={most_actively_traded}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.assetHolder}
                onPress={() => showModal(item)}
              >
                <View>
                  <Text style={styles.symbol}>{item.ticker}</Text>
                  <Text style={styles.identifier}>{item.price}</Text>
                  <Text style={styles.open}>
                    Change amount: {item.change_amount}
                  </Text>
                  <Text style={styles.dayHigh}>
                    Change percentage: {item.change_percentage}
                  </Text>
                  <Text style={styles.dayLow}>Volume: {item.volume}</Text>
                </View>
                <View style={styles.most_actively_tradedOrange}></View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          Top Gainers ( {top_gainers.length} )
        </Text>
        <FlatList
          horizontal={false}
          data={top_gainers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.assetHolder}
              onPress={() => showModal(item)}
            >
              <View>
                <Text style={styles.symbol}>{item.ticker}</Text>
                <Text style={styles.identifier}>{item.price}</Text>
                <Text style={styles.open}>
                  Change amount: {item.change_amount}
                </Text>
                <Text style={styles.dayHigh}>
                  Change percentage: {item.change_percentage}
                </Text>
                <Text style={styles.dayLow}>Volume: {item.volume}</Text>
              </View>
              <View style={styles.gainerGreen}></View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 22,
            marginBottom: 10,
          }}
        >
          Top Loosers ( {loosers.length} )
        </Text>
        <FlatList
          horizontal={false}
          data={top_losers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.assetHolder}
              onPress={() => showModal(item)}
            >
              <View>
                <Text style={styles.symbol}>{item.ticker}</Text>
                <Text style={styles.identifier}>{item.price}</Text>
                <Text style={styles.open}>
                  Change amount: {item.change_amount}
                </Text>
                <Text style={styles.dayHigh}>
                  Change percentage: {item.change_percentage}
                </Text>
                <Text style={styles.dayLow}>Volume: {item.volume}</Text>
              </View>
              <View style={styles.loosersRed}></View>
            </TouchableOpacity>
          )}
        />
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          {asset.change_amount < 0 ? (
            <Text
              style={{ color: colors.danger, fontSize: 18, fontWeight: "bold" }}
            >
              likely to loose {asset.change_percentage}
            </Text>
          ) : (
            <Text
              style={{
                color: colors.success,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              like to profit upto {asset.change_percentage}
            </Text>
          )}
          <Text style={{ marginBottom: 20, fontSize: 28, fontWeight: "800" }}>
            Enter the amount you want to invest
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: "bold", marginEnd: 10 }}>
              ZMW{" "}
            </Text>
            <TextInput
              value={amount}
              placeholder="Enter Investment Amount"
              fontSize={22}
              keyboardType="numeric"
              onChangeText={(text) => setAmount(text)}
            />
          </View>

          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: colors.primary,
              width: "30%",
              borderRadius: 10,
              marginVertical: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => storeInvestment()}
          >
            <Text style={{ color: "white", fontWeight: "500", fontSize: 18 }}>
              Invest
            </Text>
          </TouchableOpacity>

          <View>
            {loadingInvest && <ActivityIndicator color={colors.info} />}
          </View>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
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
    marginVertical: 20,
  },
  assetHolder: {
    backgroundColor: colors.row3,
    marginEnd: 5,
    borderRadius: 5,
    elevation: 7,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  gainerGreen: {
    width: 3,
    height: "100%",
    position: "relative",
    backgroundColor: "green",
  },
  most_actively_tradedOrange: {
    width: 3,
    height: "100%",
    position: "relative",
    backgroundColor: "orange",
  },
  loosersRed: {
    width: 3,
    height: "100%",
    position: "relative",
    backgroundColor: "red",
  },
  symbol: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  identifier: {
    color: colors.warning,
    fontWeight: "400",
    fontSize: 10,
  },
  open: {
    color: colors.light,
    fontSize: 12,
    fontWeight: "200",
    marginBottom: 5,
    marginEnd: 30,
  },
  dayHigh: {
    color: colors.light,
    fontSize: 12,
    fontWeight: "200",
    marginBottom: 5,
    marginEnd: 30,
  },
  dayLow: {
    color: colors.light,
    fontSize: 12,
    fontWeight: "200",
    marginBottom: 5,
    marginEnd: 30,
  },
  lastPrice: {
    color: colors.light,
    fontSize: 12,
    fontWeight: "200",
    marginBottom: 5,
    marginEnd: 30,
  },
  previousClose: {
    color: colors.light,
    fontSize: 12,
    fontWeight: "200",
    marginBottom: 5,
    marginEnd: 30,
  },
});
