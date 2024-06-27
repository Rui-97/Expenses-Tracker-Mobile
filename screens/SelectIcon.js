import { View, Button, StyleSheet, Text } from "react-native";
import { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

// import IconsCategory from "../components/Icons/IconsCategory";
import PressableIcon from "../components/Icons/PressableIcon";
import { SIZES } from "../constants/theme";

export default function SelectIcon({ navigation, route }) {
  const icons = route.params.icons;
  const [selectedIcon, setSelectedIcon] = useState();

  const changeSelectedIconHandler = (selectedIcon) => {
    setSelectedIcon(selectedIcon);
  };

  navigation.setOptions({
    headerRight: () => (
      <Button
        title="Save"
        //Navigate to the previous "ManageCategory" screen and pass the "selectedIcon" as parameter
        onPress={() =>
          navigation.navigate({
            name: "ManageCategory",
            params: { selectedIcon: selectedIcon },
            merge: true,
          })
        }
      />
    ),
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Selecting</Text>
      </View>
      <Ionicons name={selectedIcon} size={24} />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Icons</Text>
      </View>
      <View style={styles.iconsContainer}>
        {icons.map((iconName) => (
          <PressableIcon
            key={iconName}
            iconName={iconName}
            size={28}
            onIconChange={changeSelectedIconHandler}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  titleContainer: {
    borderRadius: SIZES.radius,
    backgroundColor: "#d6c3a4",
    marginVertical: SIZES.margin,
  },
  title: {
    padding: 5,
    fontSize: 18,
    fontWeight: "500",
  },
  iconsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
