import { View, StyleSheet, Button, Alert, Platform } from "react-native";
import { useState, useContext } from "react";
import { showMessage } from "react-native-flash-message";

import TxtInput from "../components/Input/TxtInput";
import Dropdown from "../components/Input/Dropdown";
import ImagePicker from "../components/Input/ImagePicker";
import { ExpensesContext } from "../store/expenses-context";
import { CategoriesContext } from "../store/categories-context";
import { getFormattedDate } from "../util/util";
import { capitalizeFirstLetter } from "../util/util";
import {
  addExpenseOnBackend,
  updateExpenseOnBackend,
  deleteExpenseOnBackend,
} from "../util/http";
import { AuthContext } from "../store/auth-context";

// ManageExpense screen can add a new expense or update an existing expense
export default function ManageExpense({ navigation, route }) {
  const status = route.params.status;
  const expenseId = route.params.id;
  const expensesCtx = useContext(ExpensesContext);
  const categoriesCtx = useContext(CategoriesContext);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //Set initial expense value based on the status
  let initialExpense;
  if (status === "adding") {
    initialExpense = {
      description: "",
      categoryId: "",
      amount: "",
      date: "",
      image: null,
    };
  } else if (status === "updating") {
    const selectedExpense = expensesCtx.expenses.find(
      (expense) => expense.id === expenseId
    );
    const image = Platform.os === "android" ? selectedExpense.image : null;
    initialExpense = {
      description: selectedExpense.description,
      categoryId: selectedExpense.categoryId,
      amount: selectedExpense.amount.toString(),
      date: getFormattedDate(selectedExpense.date),
      image: image,
    };
  }
  const [enteredExpense, setEnteredExpense] = useState(initialExpense);

  // Set navigation title for ManageExpense screen based on the status
  if (status === "adding") {
    navigation.setOptions({
      title: "Add Expense",
    });
  } else if (status == "updating") {
    navigation.setOptions({
      title: "Update Expense",
    });
  }

  //A general handler function that update the enteredExpense object based on the valueIdentifer
  const inputChangeHandler = (valueIdentifer, enteredValue) => {
    setEnteredExpense((prevEnteredExpense) => ({
      ...prevEnteredExpense,
      // dynamic object key based on the valueIdentifer
      [valueIdentifer]: enteredValue,
    }));
  };

  // Helper function checks whether the input is valid
  const isInputsValid = (expense) => {
    const isDescriptionValid = expense.description.trim().length > 0;
    // amount is valid if it is a number and the value is greater than 0
    const isAmountValid = !isNaN(expense.amount) && expense.amount > 0;
    // if covert invalid date value toString, it will deisplay "Invalid Date". So we can use this feature to check whether a date is valid
    const isDateValid = expense.date.toString() !== "Invalid Date";

    return isDescriptionValid && isAmountValid && isDateValid ? true : false;
  };

  // Functions handel DELET, ADD and UPDATE actions==============================
  const deleteExpenseAlert = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this item?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            navigation.goBack();
            //Delete the expense on the backend
            deleteExpenseOnBackend(expenseId, token);
            //Delete the expense in the expenses state in expenseContext
            expensesCtx.deleteExpense(expenseId);
            showMessage({
              message: "Success!",
              description: "The expense has been successfully deleted.",
              type: "success",
              duration: 2000,
            });
          },
        },
      ]
    );
  };

  const addExpenseHandler = async () => {
    const newExpense = {
      description: enteredExpense.description,
      categoryId: enteredExpense.categoryId,
      amount: +enteredExpense.amount,
      date: new Date(enteredExpense.date),
      image: enteredExpense.image,
    };
    if (!isInputsValid(newExpense)) {
      alert("Invalid input. Please try again");
      return;
    }

    //Add the newExpense on the backend
    const id = await addExpenseOnBackend(newExpense, token);
    //Add the newExpense into the expenses state in expenseContext
    expensesCtx.addExpense({ ...newExpense, id: id });
    navigation.goBack();
    showMessage({
      message: "Success!",
      description: "The expense has been successfully added.",
      type: "success",
      duration: 2000,
    });
  };

  const updateExpenseHandler = () => {
    const updatedData = {
      description: enteredExpense.description,
      categoryId: enteredExpense.categoryId,
      amount: +enteredExpense.amount,
      date: new Date(enteredExpense.date),
      image: enteredExpense.image,
    };
    if (!isInputsValid(updatedData)) {
      alert("Invalid input. Please try again");
      return;
    }
    //Update the expense on the backend
    updateExpenseOnBackend(expenseId, updatedData, token);
    //Update the expense in the expenses state in expenseContext
    expensesCtx.updateExpense(expenseId, updatedData);
    // give an alert that you have saved an expense
    navigation.goBack();
    showMessage({
      message: "Success!",
      description: "The expense has been successfully updated.",
      type: "success",
      duration: 2000,
    });
  };
  //=============================================================================

  // Set buttons based on the status
  let buttons;
  if (status === "adding") {
    buttons = <Button title="Add" onPress={addExpenseHandler} />;
  } else if (status === "updating") {
    buttons = (
      <View style={styles.buttonsRow}>
        <View style={styles.buttonsRowItem}>
          <Button title="Delete" color={"red"} onPress={deleteExpenseAlert} />
        </View>
        <View style={styles.buttonsRowItem}>
          <Button title="Update" onPress={updateExpenseHandler} />
        </View>
      </View>
    );
  }

  const category = categoriesCtx.categories.find(
    (category) => category.id === enteredExpense.categoryId
  );
  const dropdownValue = category ? category.name : "";

  return (
    <View style={styles.container}>
      <Dropdown
        label="Category"
        placeholder={{ label: "Select a category", value: null }}
        options={categoriesCtx.categories.map((category) => ({
          label: capitalizeFirstLetter(category.name),
          value: category.name,
        }))}
        onDropdownValueChange={(value) => {
          const category = categoriesCtx.categories.find(
            (category) => category.name === value
          );
          inputChangeHandler("categoryId", category.id);
        }}
        value={dropdownValue}
      />
      <TxtInput
        label="Description"
        textInputConfig={{
          onChangeText: (value) => inputChangeHandler("description", value),
          value: enteredExpense.description,
        }}
      />
      <View style={styles.inputRow}>
        <TxtInput
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (value) => inputChangeHandler("amount", value),
            value: enteredExpense.amount,
          }}
          style={styles.inputRowItem}
        />
        <TxtInput
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangeHandler("date", value),
            value: enteredExpense.date,
          }}
          style={styles.inputRowItem}
        />
      </View>
      <ImagePicker
        label="Receipt"
        onImageTaken={(source) => inputChangeHandler("image", source)}
        source={enteredExpense.image}
      />
      {buttons}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputRowItem: {
    flex: 1,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonsRowItem: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});
