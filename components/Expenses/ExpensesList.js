import { FlatList } from "react-native";

import ExpenseItem from "./ExpenseItem";

export default function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }) => (
        <ExpenseItem
          id={item.id}
          amount={item.amount}
          date={item.date}
          description={item.description}
          categoryId={item.categoryId}
        />
      )}
    />
  );
}
