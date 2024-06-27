import { View, TextInput, Text, StyleSheet } from "react-native";

import { SIZES, FONTS } from "../../constants/theme";

export default function TxtInput({ label, textInputConfig, style }) {
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput {...textInputConfig} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: SIZES.margin,
    marginVertical: SIZES.margin,
  },
  label: {
    marginBottom: SIZES.base,
    fontSize: SIZES.label,
  },
  input: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    padding: SIZES.padding2,
    fontSize: SIZES.input,
  },
});
