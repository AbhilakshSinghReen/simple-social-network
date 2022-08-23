import { StyleSheet, Text, View } from "react-native";

import UserProvider from "./app/Context/UserProvider";
import MainNavigator from "./app/navigators/MainNavigator";

export default function App() {
  return (
    <UserProvider>
      <MainNavigator />
    </UserProvider>
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
