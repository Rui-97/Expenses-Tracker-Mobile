import { createContext, useState, useContext } from "react";
import { ExpensesContext } from "./expenses-context";

const DUMMY_CATEGORIES = [
  {
    id: "c1",
    name: "clothes",
    color: "#e01249",
    icon: "accessibility-sharp",
  },
  {
    id: "c2",
    name: "grocery",
    color: "#32a852",
    icon: "cart",
  },
  {
    id: "c3",
    name: "gifts",
    color: "#eb34c0",
    icon: "home",
  },
];

export const CategoriesContext = createContext({
  categories: [],
  setCategories: () => {},
  deleteCategory: () => {},
  addCategory: () => {},
  updateCategory: () => {},
  getCategoriesOverviews: () => {},
});

export default function CategoriesContextProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const expensesCtx = useContext(ExpensesContext);

  const deleteCategory = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id != id)
    );
  };

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [newCategory, ...prevCategories]);
  };

  const updateCategory = (id, updatedData) => {
    setCategories((prevCategories) => {
      // Find the index of the category that is about to be updated in the categories array
      const categoryTOBeUpdatedIndex = prevCategories.findIndex(
        (category) => category.id === id
      );
      const categoryToBeUpdated = prevCategories[categoryTOBeUpdatedIndex];
      //Update the category with updatedData
      const updatedCategory = { ...categoryToBeUpdated, ...updatedData };
      const updatedCategories = [...prevCategories];
      // Update the categories array
      updatedCategories[categoryTOBeUpdatedIndex] = updatedCategory;
      // Return the updated categories array
      return updatedCategories;
    });
  };

  const getCategoriesOverviews = () => {
    const expenses = expensesCtx.expenses;

    //Calculte the total amount of the category and the amount of the category as a percentage of the amount of all expenses
    const calculateCategoryAmountNPercentage = (categoryId) => {
      //Filter out all expenses that belong to the category
      const expensesByCategory = expenses.filter(
        (expense) => expense.categoryId === categoryId
      );
      //Calculte the total amount of the category
      const totalAmountByCategory = expensesByCategory.reduce(
        (totalAmount, expense) => totalAmount + expense.amount,
        0
      );

      const totalAmount = expenses.reduce(
        (totalAmount, expense) => totalAmount + expense.amount,
        0
      );
      //Calculate the amount of the category as a percentage of the amount of all expenses
      const categoryPercentage = Math.round(
        (totalAmountByCategory / totalAmount).toFixed(4) * 100
      );

      return { totalAmountByCategory, categoryPercentage };
    };

    //Create a categoriesOverviews array based on the existing categories array
    const categoriesOverviews = categories.map((category) => {
      const { totalAmountByCategory, categoryPercentage } =
        calculateCategoryAmountNPercentage(category.id);

      //Create a new category object that inculde the amount and percentage properties
      const categoryOverview = {
        id: category.id,
        name: category.name,
        color: category.color,
        amount: totalAmountByCategory,
        percentage: categoryPercentage,
      };
      return categoryOverview;
    });

    return categoriesOverviews;
  };

  const value = {
    categories,
    setCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoriesOverviews,
  };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
}
