import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableOpacity,
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

const AddAsset = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://latest-stock-price.p.rapidapi.com/price",
          params: {
            Indices: "NIFTY METAL",
          },
          headers: {
            "X-RapidAPI-Key":
              "17e5e451bdmshd00d8606aa55f97p1d410ajsn73edc050cfe7",
            "X-RapidAPI-Host": "latest-stock-price.p.rapidapi.com",
          },
        };

        const response = await axios.request(options);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        // console.log(data);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text
          style={{
            color: colors.primary,
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 30,
          }}
        >
          Monthly Analysis
        </Text>
        <LineChart
          data={{
            labels: ["Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"],
            datasets: [
              {
                data: [
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                  Math.random() * 100,
                ],
              },
            ],
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: colors.row1,
            backgroundGradientFrom: colors.row1,
            backgroundGradientTo: colors.green,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 10,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "1",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 4,
            borderRadius: 10,
          }}
        />
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "bold",
              fontSize: 16,
              marginVertical: 20,
            }}
          >
            Select an asset
          </Text>
          <FlatList
            horizontal={true}
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.assetHolder}>
                <Text style={styles.symbol}>{item.symbol}</Text>
                <Text style={styles.identifier}>{item.identifier}</Text>
                <Text style={styles.open}>open: {item.open}</Text>
                <Text style={styles.dayHigh}>Day High: {item.dayHigh}</Text>
                <Text style={styles.dayLow}>Day Low: {item.dayLow}</Text>
                <Text style={styles.lastPrice}>
                  Last price: {item.lastPrice}
                </Text>
                <Text style={styles.previousClose}>
                  Prev Close: {item.previousClose}
                </Text>
              </TouchableOpacity>
            )}
          />

          <View>
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
                marginVertical: 20,
              }}
            >
              Added Assets
            </Text>
            <FlatList
              horizontal={true}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View
                  style={[styles.assetHolder, { backgroundColor: colors.row1 }]}
                >
                  <Text style={[styles.symbol, { color: colors.light }]}>
                    {item.symbol}
                  </Text>
                  <Text style={styles.identifier}>{item.identifier}</Text>
                  <Text style={styles.open}>open: {item.open}</Text>
                  <Text style={styles.dayHigh}>Day High: {item.dayHigh}</Text>
                  <Text style={styles.dayLow}>Day Low: {item.dayLow}</Text>
                  <Text style={styles.lastPrice}>
                    Last price: {item.lastPrice}
                  </Text>
                  <Text style={styles.previousClose}>
                    Prev Close: {item.previousClose}
                  </Text>
                </View>
              )}
            />
          </View>

          {/* <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 50,
            }}
            onPress={() => fetchData()}
          >
            <AntDesign name="reload1" size={24} color="black" />
            <Text>Refresh</Text>
          </TouchableOpacity> */}
        </View>
      )}
    </ScrollView>
  );
};

export default AddAsset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingHorizontal: 7,
  },
  assetHolder: {
    backgroundColor: colors.row3,
    marginEnd: 5,
    borderRadius: 5,
    elevation: 7,
    padding: 10,
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
