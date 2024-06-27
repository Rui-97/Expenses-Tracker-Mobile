import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { showMessage } from "react-native-flash-message";

import { SIZES, FONTS } from "../../constants/theme";
import { capitalizeFirstLetter } from "../../util/util";
import { CategoriesContext } from "../../store/categories-context";
import { deleteCategoryOnBackend } from "../../util/http";
import { AuthContext } from "../../store/auth-context";

export default function CategoryItem({ name, color, icon, id }) {
  const navigation = useNavigation();
  const categoryCtx = useContext(CategoriesContext);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  const deleteCategoryAlert = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this category?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            categoryCtx.deleteCategory(id);
            deleteCategoryOnBackend(id, token);
            showMessage({
              message: "Success!",
              description: "The category has been successfully deleted.",
              type: "success",
              duration: 2000,
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon} color={color} size={24} />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.categoryText}>{capitalizeFirstLetter(name)}</Text>
      </View>
      <Pressable
        style={styles.editBtn}
        onPress={() =>
          navigation.navigate("ManageCategory", {
            status: "updating",
            id: id,
          })
        }
      >
        <Ionicons name="pencil" size={24} color="black" />
      </Pressable>
      <Pressable style={styles.deleteBtn} onPress={deleteCategoryAlert}>
        <Ionicons name="trash" size={24} color="black" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryContainer: {
    marginHorizontal: SIZES.margin,
    marginBottom: SIZES.margin,
    padding: SIZES.padding1,
    borderRadius: SIZES.radius,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    flex: 1,
  },
  nameContainer: {
    flex: 6,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: SIZES.h2,
    fontWeight: "bold",
  },
  editBtn: {
    flex: 1,
    alignItems: "flex-end",
  },
  deleteBtn: {
    flex: 1,
    alignItems: "flex-end",
  },
});
