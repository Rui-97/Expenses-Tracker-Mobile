import { View, Text, Pressable, StyleSheet } from "react-native";

import { SIZES, FONTS } from "../../constants/theme";
import { capitalizeFirstLetter } from "../../util/util";

export default function ExpensesSummaryItem({
  categoryName,
  amount,
  percentage,
  color,
}) {
  return (
    <View>
      <Pressable
        style={styles.row}
        // onPress={() => {
        //   let categoryName = item.name;
        //   setSelectCategoryByName(categoryName);
        // }}
      >
        {/* Name/Category */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={[styles.colorBox, { backgroundColor: color }]} />
          <Text style={{ fontSize: SIZES.h2 }}>
            {capitalizeFirstLetter(categoryName)}
          </Text>
        </View>

        {/* Expenses */}
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: SIZES.h2 }}>
            ${amount} - {percentage}%
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginHorizontal: SIZES.margin,
    marginBottom: SIZES.margin,
    paddingHorizontal: SIZES.padding1,
    paddingBottom: SIZES.padding1,
    borderRadius: SIZES.radius,

    //     backgroundColor:
    //       selectedCategory && selectedCategory.name == item.name
    //         ? item.color
    //         : COLORS.white,
  },
  colorBox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    marginRight: 5,
    // backgroundColor:
    //   selectedCategory && selectedCategory.name == item.name
    //     ? COLORS.white
    //     : item.color,
  },
});
