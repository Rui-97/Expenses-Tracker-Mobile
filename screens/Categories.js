import { View, FlatList, StyleSheet } from "react-native";
import { useContext } from "react";

import { CategoriesContext } from "../store/categories-context";
import CategoryItem from "../components/Categories/CategoryItem";

export default function Categories() {
  const categoryCtx = useContext(CategoriesContext);
  return (
    <View style={styles.container}>
      <FlatList
        data={categoryCtx.categories}
        renderItem={({ item }) => (
          <CategoryItem
            name={item.name}
            color={item.color}
            icon={item.icon}
            id={item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
});
