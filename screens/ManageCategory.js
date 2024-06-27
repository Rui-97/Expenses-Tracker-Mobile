import { View, Button, StyleSheet } from "react-native";
import { useState, useContext, useEffect } from "react";
import { showMessage } from "react-native-flash-message";

import { ICONS } from "../constants/icons";
import TxtInput from "../components/Input/TxtInput";
import CPicker from "../components/Input/CPicker";
import IconPicker from "../components/Input/IconPicker";

import { CategoriesContext } from "../store/categories-context";
import { addCategoryOnBackend, updateCategoryOnBackend } from "../util/http";
import { AuthContext } from "../store/auth-context";

export default function ManageCategory({ navigation, route }) {
  const status = route.params.status;
  const categoryId = route.params.id;
  const selectedIcon = route.params.selectedIcon;
  const categoryCtx = useContext(CategoriesContext);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //Set navigation title for ManageCategory screen based on the status
  if (status === "adding") {
    navigation.setOptions({
      title: "Add Category",
    });
  } else if (status === "updating") {
    navigation.setOptions({
      title: "Update Category",
    });
  }

  //Set initial category value based on the status
  let initialCategory;
  if (status === "adding") {
    initialCategory = {
      name: "",
      icon: "",
      color: "#000000",
    };
  } else if (status === "updating") {
    const selectedCategory = categoryCtx.categories.find(
      (category) => category.id === categoryId
    );

    initialCategory = {
      name: selectedCategory.name,
      icon: selectedCategory.icon,
      color: selectedCategory.color,
    };
  }
  const [enteredCategory, setEnteredCategory] = useState(initialCategory);

  //A general handler function that update the enteredCategory object based on the valueIdentifer
  const inputChangeHandler = (valueIdentifer, enteredValue) => {
    setEnteredCategory((prevEnteredCategory) => ({
      ...prevEnteredCategory,
      // dynamic object key based on the valueIdentifer
      [valueIdentifer]: enteredValue,
    }));
  };

  //set icon when the selectedIcon changes
  useEffect(() => {
    if (selectedIcon) {
      inputChangeHandler("icon", selectedIcon);
    }
  }, [selectedIcon]);

  const addCategoryHandler = async () => {
    const id = await addCategoryOnBackend(enteredCategory, token);
    categoryCtx.addCategory({ ...enteredCategory, id: id });
    navigation.goBack();
    showMessage({
      message: "Success!",
      description: "The category has been successfully added.",
      type: "success",
      duration: 2000,
    });
  };

  const updateCategoryHandler = () => {
    updateCategoryOnBackend(categoryId, enteredCategory, token);
    categoryCtx.updateCategory(categoryId, enteredCategory);
    navigation.goBack();
    showMessage({
      message: "Success!",
      description: "The category has been successfully updated.",
      type: "success",
      duration: 2000,
    });
  };

  return (
    <View style={styles.container}>
      <TxtInput
        label="Name"
        textInputConfig={{
          onChangeText: (value) => inputChangeHandler("name", value),
          value: enteredCategory.name,
        }}
      />
      <IconPicker
        label="Icon"
        icons={ICONS}
        selectedIcon={enteredCategory.icon}
        color={enteredCategory.color}
      />
      <CPicker
        label="Color"
        onColorValueChange={(value) => inputChangeHandler("color", value)}
        color={enteredCategory.color}
      />

      {/* Set button based on the status */}
      {status === "adding" ? (
        <Button title="Add" onPress={addCategoryHandler} />
      ) : (
        <Button title="Update" onPress={updateCategoryHandler} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
