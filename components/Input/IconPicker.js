import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { SIZES, FONTS } from "../../constants/theme";
export default function IconPicker({ label, icons, selectedIcon, color }) {
  const navigation = useNavigation();

  return (
    <View style={styles.sessionContainer}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={styles.iconSelectedContainer}
        onPress={() =>
          navigation.navigate("SelectIcon", {
            icons: icons,
          })
        }
      >
        <Ionicons name={selectedIcon} size={24} color={color} />
        <View style={styles.detailContainer}>
          <Ionicons name="chevron-forward" size={24} color="black" />
        </View>
      </Pressable>
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

  iconSelectedContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: SIZES.radius,
    padding: SIZES.padding2,
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
