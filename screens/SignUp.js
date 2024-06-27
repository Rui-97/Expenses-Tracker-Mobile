import { View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

import AuthContent from "../components/Auth/AuthContent";
import { signUp } from "../util/auth";
import Throbber from "../components/UI/Throbber";

export default function SignUp() {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const navigation = useNavigation();

  const signUpHandler = async ({ email, password }) => {
    setIsSigningUp(true);
    //Send credentials to the backend and create a new user
    await signUp(email, password);
    setIsSigningUp(false);
    //Navigate to Login screen and display success message
    navigation.navigate("Login");
    showMessage({
      message: "Success!",
      description: "User has been successfully created.",
      type: "success",
      duration: 4000,
    });
  };

  //Display spinner if it is in the process of creating a user
  if (isSigningUp) {
    return <Throbber message="Creating User..." />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.massageContainer}>
        <Text style={styles.messageTitle}>Let's Get Started!</Text>
        <Text style={styles.messageDescription}>
          Create an account to get all features
        </Text>
      </View>
      <AuthContent onAuthenticate={signUpHandler} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { backgroundColor: "white", height: "100%" },
  massageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 160,
    marginBottom: 20,
  },
  messageTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  messageDescription: {
    color: "#898888",
  },
});
