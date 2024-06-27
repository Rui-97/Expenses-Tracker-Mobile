import { useState } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../UI/Button";
import AuthInput from "./AuthInput";

function AuthForm({ isLoginScreen, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <View style={styles.form}>
      <View>
        <AuthInput
          label="Email Address"
          //   onUpdateValue={updateInputValueHandler.bind(this, "email")}
          onUpdateValue={(value) => updateInputValueHandler("email", value)}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
        />
        {!isLoginScreen && (
          <AuthInput
            label="Confirm Email Address"
            // onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            onUpdateValue={(value) =>
              updateInputValueHandler("confirmEmail", value)
            }
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <AuthInput
          label="Password"
          //   onUpdateValue={updateInputValueHandler.bind(this, "password")}
          onUpdateValue={(value) => updateInputValueHandler("password", value)}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLoginScreen && (
          <AuthInput
            label="Confirm Password"
            // onUpdateValue={updateInputValueHandler.bind(
            //   this,
            //   "confirmPassword"
            // )}
            onUpdateValue={(value) =>
              updateInputValueHandler("confirmPassword", value)
            }
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLoginScreen ? "Log In" : "Sign Up"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20,
  },
});
