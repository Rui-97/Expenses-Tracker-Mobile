import { SafeAreaView, View, Image, StyleSheet } from "react-native";
import { useState, useContext } from "react";

import AuthContent from "../components/Auth/AuthContent";
import { login } from "../util/auth";
import { AuthContext } from "../store/auth-context";
import Throbber from "../components/UI/Throbber";

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const authCtx = useContext(AuthContext);

  const loginHandler = async ({ email, password }) => {
    setIsLoggingIn(true);
    //Send credentials to the backend and login
    const token = await login(email, password);
    setIsLoggingIn(false);
    authCtx.authenticate(token);
  };

  //Display message and loading indicator if it is in the process of login
  if (isLoggingIn) {
    return <Throbber message="Logging in..." />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/images/login.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.formContainer}>
        <AuthContent isLoginScreen onAuthenticate={loginHandler} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
    paddingTop: 100,
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "70%",
    height: "90%",
  },
  formContainer: {
    flex: 3,
  },
});
