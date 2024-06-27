import { createContext, useState } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "shoes",
    amount: 159.99,
    date: new Date("2023-12-19"),
    categoryId: "c1",
  },
  {
    id: "e2",
    description: "trousers",
    amount: 189.29,
    date: new Date("2023-01-05"),
    categoryId: "c1",
  },
  {
    id: "e3",
    description: "bananas",
    amount: 5.99,
    date: new Date("2023-12-01"),
    categoryId: "c2",
  },
  {
    id: "e4",
    description: "book",
    amount: 14.99,
    date: new Date("2023-02-19"),
    categoryId: "c3",
  },
  {
    id: "e5",
    description: "gift card",
    amount: 18.59,
    date: new Date("2023-02-18"),
    categoryId: "c3",
  },
  {
    id: "e6",
    description: "apples",
    amount: 89.29,
    date: new Date("2023-01-05"),
    categoryId: "c2",
  },
  {
    id: "e7",
    description: "milk",
    amount: 5.99,
    date: new Date("2023-12-01"),
    categoryId: "c2",
  },
  {
    id: "e8",
    description: "jacket",
    amount: 214.99,
    date: new Date("2023-02-19"),
    categoryId: "c1",
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: () => {},
  deleteExpense: () => {},
  addExpense: () => {},
  updateExpense: () => {},
});

export default function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);

  const addExpense = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };

  const updateExpense = (id, updatedData) => {
    setExpenses((prevExpenses) => {
      // Find the index of the expense that is about to be updated in the expenses array
      const expenseTOBeUpdatedIndex = prevExpenses.findIndex(
        (expense) => expense.id === id
      );
      const expenseToBeUpdated = prevExpenses[expenseTOBeUpdatedIndex];
      //Update the expense with updatedData
      const updatedExpense = { ...expenseToBeUpdated, ...updatedData };
      const updatedExpenses = [...prevExpenses];
      // Update the expenses array
      updatedExpenses[expenseTOBeUpdatedIndex] = updatedExpense;
      // Return the updated expenses array
      return updatedExpenses;
    });
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id != id)
    );
  };

  const value = {
    expenses,
    setExpenses,
    deleteExpense,
    addExpense,
    updateExpense,
  };
  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
