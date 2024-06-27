import { View, StyleSheet } from "react-native";
import { useContext } from "react";

import ExpensesList from "../components/Expenses/ExpensesList";
import { ExpensesContext } from "../store/expenses-context";

export default function Expenses() {
  const expensesCtx = useContext(ExpensesContext);
  return (
    <View style={styles.container}>
      <ExpensesList expenses={expensesCtx.expenses} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
});
