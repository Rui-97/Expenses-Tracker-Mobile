import RNPickerSelect from "react-native-picker-select";
import { View, Text, StyleSheet } from "react-native";
import { SIZES } from "../../constants/theme";

export default function Dropdown({
  label,
  placeholder,
  options,
  onDropdownValueChange,
  value,
}) {
  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => {
          onDropdownValueChange(value);
        }}
        value={value}
        style={pickerSelectStyles}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    marginHorizontal: SIZES.margin,
    marginVertical: SIZES.margin,
  },
  label: {
    marginBottom: SIZES.base,
    fontSize: SIZES.label,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    padding: SIZES.padding1,
    fontSize: SIZES.input,
  },
  inputAndroid: {
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    padding: SIZES.padding1,
    fontSize: SIZES.input,
  },
});
