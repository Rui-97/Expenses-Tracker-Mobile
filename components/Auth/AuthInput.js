import { View, Text, TextInput, StyleSheet } from "react-native";

export default function AuthInput({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={label}
        placeholderTextColor="#848383"
        style={styles.input}
        keyboardType={keyboardType}
        autoCapitalize="none"
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 12,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
  },
  labelInvalid: {
    color: "red",
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 8,
    backgroundColor: "#fefefe",
    fontSize: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});
