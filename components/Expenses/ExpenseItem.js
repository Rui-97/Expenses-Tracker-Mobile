import { Pressable, Text, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";

import { SIZES, FONTS } from "../../constants/theme";
import { getFormattedDate } from "../../util/util";
import { CategoriesContext } from "../../store/categories-context";

export default function ExpenseItem({
  id,
  amount,
  date,
  description,
  categoryId,
}) {
  const navigation = useNavigation();
  const categoryCtx = useContext(CategoriesContext);
  const category = categoryCtx.categories.find(
    (category) => category.id === categoryId
  );

  //Navigate to the corresponding expense detail screen
  const expenseDetailHandler = () => {
    navigation.navigate("ManageExpense", { status: "updating", id: id });
  };

  return (
    <Pressable style={styles.expenseContainer} onPress={expenseDetailHandler}>
      <View style={styles.categoryContainer}>
        <Ionicons name={category.icon} size={28} color={category.color} />
      </View>
      <View style={styles.divider} />

      <View style={styles.descriptionContainer}>
        <Text style={styles.boldText}>{description}</Text>
        <Text>{getFormattedDate(date)}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.boldText}>${amount.toFixed(2)}</Text>
      </View>
      <View style={styles.detailContainer}>
        <Ionicons name="chevron-forward" size={24} color="black" />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  expenseContainer: {
    marginHorizontal: SIZES.margin,
    marginBottom: SIZES.margin,
    padding: SIZES.padding1,
    borderRadius: SIZES.radius,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boldText: {
    fontSize: SIZES.h2,
    marginBottom: 4,
    fontWeight: "bold",
  },
  categoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    borderRightWidth: 2,
    marginVertical: 2,
    marginHorizontal: 5,
    borderColor: "#D3D3D3",
  },
  descriptionContainer: {
    flex: 4,
  },
  amountContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  detailContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
