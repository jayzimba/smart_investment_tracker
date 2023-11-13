import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/Theme.js/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert } from "react-native";

import { useDispatch } from "react-redux";
import { setCustomer } from "../Redux/customerSlice";
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loading: false,
      customer: [],
    };
  }

  setCustomerData = (customerData) => {
    const { dispatch } = this.props;
    // Dispatch the action to set 'customer' data in Redux
    dispatch(setCustomer(customerData));
  };

  LogDataInDB = () => {
    this.setState({ loading: true });

    var email = this.state.email;
    var password = this.state.password;

    if (email.length == 0 || password.length == 0) {
      alert("Required Field Is Missing!");
    } else {
      var formdata = new FormData();
      formdata.append("email", email);
      formdata.append("password", password);

      var headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      fetch("https://www.pezabond.com/kapeso/login.php", requestOptions)
        .then((Response) => Response.json())
        .then((Response) => {
          if (Response.success) {
            this.props.navigation.navigate("Home");
            this.setState({ customer: Response.customerDetails });
            this.setCustomerData(Response.customerDetails);
          } else if (!Response.success) {
            alert("Login Failed - Try Again");
          }
          console.log(this.state.customer);
        })
        .catch((error) => {
          console.error("ERROR:" + error);
        })
        .finally(() =>
          this.setState({
            email: "",
            password: "",
            loading: false,
          })
        );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.bigText}>Kapeso Smart Investment</Text>
          <Text style={styles.smallText}>
            we give you stock investment advice
          </Text>
        </View>

        <View style={{ marginTop: 130, alignItems: "center" }}>
          <Text
            style={[
              styles.bigText,
              { fontSize: 25, marginBottom: 40, color: colors.gray },
            ]}
          >
            Login
          </Text>

          <View
            style={{
              width: "90%",
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 5,
              marginBottom: 40,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons name="person" size={24} color="black" />
            <TextInput
              placeholder="Enter your email"
              selectionColor={colors.primary}
              style={{ marginStart: 10 }}
              onChangeText={(email) => this.setState({ email })}
            />
          </View>

          <View
            style={{
              width: "90%",
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 5,
              marginBottom: 40,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="form-textbox-password"
              size={24}
              color="black"
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Password"
              selectionColor={colors.primary}
              style={{ marginStart: 10 }}
              onChangeText={(password) => this.setState({ password })}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              padding: 10,
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              marginBottom: 30,
            }}
            onPress={this.LogDataInDB}
          >
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
              }}
            >
              Login in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Signup")}
            style={{ marginBottom: 30 }}
          >
            <Text>Register Here</Text>
          </TouchableOpacity>

          {this.state.loading ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

export default connect()(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  bigText: {
    fontWeight: "bold",
    fontSize: 33,
    color: colors.primary,
  },
  smallText: {
    color: colors.gray,
  },
});
