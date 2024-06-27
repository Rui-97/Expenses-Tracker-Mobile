import { View, Text, StyleSheet } from "react-native";
import ColorPicker from "react-native-wheel-color-picker";

import { SIZES, FONTS } from "../../constants/theme";

export default function CPicker({ label, onColorValueChange, color }) {
  return (
    <View style={styles.sessionContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.colorSelectedContainer}>
        <Text style={styles.colorSelected}>{color}</Text>
        <View
          style={{
            backgroundColor: color,
            width: 25,
            height: 25,
          }}
        />
      </View>
      <View style={styles.pickerContainer}>
        <ColorPicker
          color={color}
          // onColorChange={(color) =>
          //   selectedIconCtx.changeSelectedIconColor(color)
          // }
          onColorChange={(color) => onColorValueChange(color)}
          thumbSize={20}
          sliderSize={20}
          noSnap={true}
          row={false}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  sessionContainer: {
    marginHorizontal: SIZES.margin,
    marginVertical: SIZES.margin,
  },
  label: {
    marginBottom: SIZES.base,
    fontSize: SIZES.label,
  },
  colorSelectedContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    padding: SIZES.padding2,
  },
  colorSelected: {
    paddingRight: 10,
    fontSize: SIZES.input,
  },
  pickerContainer: {
    width: "100%",
    height: "50%",
    marginTop: 20,
  },
});
