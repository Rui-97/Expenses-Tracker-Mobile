import { Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function PressableIcon({ iconName, size, onIconChange }) {
  return (
    <Pressable onPress={() => onIconChange(iconName)} style={styles.container}>
      <Ionicons name={iconName} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    margin: 4,
  },
});
