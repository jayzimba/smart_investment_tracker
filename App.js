import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import AddAsset from "./screens/AddAsset";
import Profile from "./screens/Profile";
import Portfolio from "./screens/Portfolio";
import { PaperProvider } from "react-native-paper";
import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import { Provider } from "react-redux";
import store from "./Redux/store";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddAsset" component={AddAsset} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Portfolio" component={Portfolio} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
