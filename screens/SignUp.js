import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/Theme.js/colors";
import { TextInput } from "react-native-gesture-handler";

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
  AntDesign,
  Entypo,
  Octicons,
} from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      contact: "",
      password: "",
      gender: "",
      loading: false,
    };
  }

  SignUpDB = () => {
    this.setState({ loading: true });

    var name = this.state.name;
    var email = this.state.email;
    var contact = this.state.contact;
    var gender = this.state.gender;
    var password = this.state.password;

    if (
      name.length == 0 ||
      email.length == 0 ||
      contact.length == 0 ||
      gender.length == 0 ||
      password.length == 0
    ) {
      alert("Required Field Is Missing!");
      this.setState({ loading: false });
    } else {
      var formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("contact", contact);
      formdata.append("gender", gender);
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

      fetch("https://www.pezabond.com/kapeso/signup.php", requestOptions)
        .then((Response) => Response.json())
        .then((Response) => {
          alert(Response[0].Message);
          if (Response[0].Message == "Registered successfuly!") {
            this.props.navigation.navigate("Login");
          }
        })
        .catch((error) => {
          console.error("ERROR:" + error);
        })
        .finally(() =>
          this.setState({
            name: "",
            email: "",
            contact: "",
            password: "",
            loading: false,
          })
        );
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ marginBottom: 30 }}>
          <Text style={styles.bigText}>Kapeso Smart Investment</Text>
          <Text style={styles.smallText}>
            we give you stock investment advice
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: "center", paddingBottom: 50 }}>
            <Text
              style={[
                styles.bigText,
                { fontSize: 25, marginBottom: 40, color: colors.gray },
              ]}
            >
              Register Now
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
                placeholder="Enter your full name"
                selectionColor={colors.primary}
                style={{ marginStart: 10 }}
                onChangeText={(name) => this.setState({ name })}
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
              <Entypo name="email" size={24} color="black" />
              <TextInput
                placeholder="Enter your email"
                selectionColor={colors.primary}
                style={{ marginStart: 10 }}
                keyboardType="email-address"
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
              <Entypo name="phone" size={24} color="black" />
              <TextInput
                placeholder="Contact"
                maxLength={10}
                keyboardType="number-pad"
                selectionColor={colors.primary}
                style={{ marginStart: 10 }}
                onChangeText={(contact) => this.setState({ contact })}
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
                name="gender-male-female"
                size={24}
                color="black"
              />
              <TextInput
                placeholder="gender"
                value={this.state.gender}
                maxLength={10}
                keyboardType="default"
                selectionColor={colors.primary}
                style={{ marginStart: 10 }}
                onChangeText={(gender) => this.setState({ gender })}
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
                placeholder="Password"
                selectionColor={colors.primary}
                style={{ marginStart: 10 }}
                placeholder="Password"
                fontSize={16}
                marginHorizontal={10}
                maxLength={12}
                returnKeyType="done"
                autoCapitalize="none"
                keyboardType="default"
                selectionColor={colors.primary}
                secureTextEntry={true}
                width={100}
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
              onPress={this.SignUpDB}
            >
              <Text
                style={{
                  color: colors.white,
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text>Proceed to Login</Text>
            </TouchableOpacity>
          </View>

          {this.state.loading ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : null}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    paddingBottom: 5,
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
