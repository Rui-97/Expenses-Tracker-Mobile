import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FlashMessage from "react-native-flash-message";

import ManageExpense from "./screens/ManageExpense";
import Overview from "./screens/Overview";
import Expenses from "./screens/Expenses";
import Categories from "./screens/Categories";
import ManageCategory from "./screens/ManageCategory";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

import IconButton from "./components/UI/IconButton";
import SelectIcon from "./screens/SelectIcon";
import ExpensesContextProvider from "./store/expenses-context";
import CategoriesContextProvider from "./store/categories-context";
import { AuthContext } from "./store/auth-context";
import AuthContextProvider from "./store/auth-context";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Root() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Overview"
        component={Overview}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart" color={color} size={size} />
          ),
          headerRight: ({ color }) => (
            <IconButton
              icon="exit"
              color={color}
              size={30}
              onPress={authCtx.logout}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Expenses"
        component={Expenses}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cash" color={color} size={size} />
          ),
          headerRight: ({ color }) => (
            <IconButton
              icon="add"
              color={color}
              size={30}
              onPress={() =>
                navigation.navigate("ManageExpense", { status: "adding" })
              }
            />
          ),
        })}
      />
      <BottomTab.Screen
        name="Categories"
        component={Categories}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="file-tray-stacked-outline"
              color={color}
              size={size}
            />
          ),
          headerRight: ({ color }) => (
            <IconButton
              icon="add"
              color={color}
              size={30}
              onPress={() =>
                navigation.navigate("ManageCategory", { status: "adding" })
              }
            />
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <ExpensesContextProvider>
      <CategoriesContextProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Root"
            component={Root}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              presentation: "modal",
              headerRight: () => (
                <Button title="Cancel" onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen
            name="ManageCategory"
            component={ManageCategory}
            options={({ navigation }) => ({
              headerTitleAlign: "center",
              presentation: "modal",
              headerRight: () => (
                <Button title="Cancel" onPress={() => navigation.goBack()} />
              ),
            })}
          />
          <Stack.Screen
            name="SelectIcon"
            component={SelectIcon}
            options={{
              title: "Select an Icon",
              headerTitleAlign: "center",
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </CategoriesContextProvider>
    </ExpensesContextProvider>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {/* Display different navigation stack based on the authentiaction status */}
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>

      {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
      <FlashMessage position="top" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
