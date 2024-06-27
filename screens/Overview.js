import { View, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { PieChart } from "react-native-gifted-charts";

import ExpensesSummary from "../components/Overview/ExpensesSummary";
import { CategoriesContext } from "../store/categories-context";
import { ExpensesContext } from "../store/expenses-context";
import { fetchExpenses, fetchCategories } from "../util/http";
import { AuthContext } from "../store/auth-context";
import Throbber from "../components/UI/Throbber";

const radius = 120;

export default function Overview() {
  const categoriesCtx = useContext(CategoriesContext);
  const expensesCtx = useContext(ExpensesContext);
  const categoriesOverviews = categoriesCtx.getCategoriesOverviews();
  const authCtx = useContext(AuthContext);
  const [isFetching, setIsFetching] = useState(true);

  //Fetch data from backend=======================
  useEffect(() => {
    //Fetch expenses data from backend and set the data in expenseContext
    async function getExpenses() {
      //Fetch expenses from backend
      const expenses = await fetchExpenses(token);
      //Set expenses state to the fetched data
      expensesCtx.setExpenses(expenses.reverse());
    }

    //Fetch categoies data from backend and set the data in categoriesContext
    async function getCategories() {
      //Fetch categories from backend
      const categoies = await fetchCategories(token);
      //Set categories state to the fetched data
      categoriesCtx.setCategories(categoies.reverse());
    }

    setIsFetching(true);
    const token = authCtx.token;
    getExpenses(token);
    getCategories(token);
    setIsFetching(false);
  }, []);
  //================================================

  const data = categoriesOverviews.map((categoryOverview) => ({
    value: categoryOverview.percentage,
    color: categoryOverview.color,
    text: `${categoryOverview.percentage}%`,
  }));

  if (isFetching) {
    return <Throbber message="Fetching data..." />;
  }

  return (
    <View>
      <View style={styles.chartContainer}>
        <PieChart
          data={data}
          donut
          radius={radius}
          innerRadius={radius / 2}
          showText
          textColor="white"
          textSize={16}
          fontWeight="bold"
          focusOnPress={true}
          toggleFocusOnPress={true}
        />
      </View>
      <ExpensesSummary />
    </View>
  );
}
const styles = StyleSheet.create({
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
