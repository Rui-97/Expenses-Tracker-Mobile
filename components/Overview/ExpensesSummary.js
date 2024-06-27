import { View, Text, StyleSheet, FlatList } from "react-native";
import { useContext } from "react";

import ExpensesSummaryItem from "./ExpensesSummaryItem";
import { CategoriesContext } from "../../store/categories-context";
import { SIZES, FONTS } from "../../constants/theme";

export default function ExpensesSummary() {
  const categoriesCtx = useContext(CategoriesContext);
  const categoriesOverviews = categoriesCtx.getCategoriesOverviews();
  const categoriesOverviewsSorted = categoriesOverviews.sort(
    (a, b) => b.amount - a.amount
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categoriesOverviewsSorted}
        renderItem={({ item }) => (
          <ExpensesSummaryItem
            id={item.id}
            categoryName={item.name}
            amount={item.amount}
            percentage={item.percentage}
            color={item.color}
          />
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    margin: SIZES.margin,
    paddingVertical: SIZES.padding1,
  },
});
