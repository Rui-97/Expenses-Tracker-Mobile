import React from "react";
import { render } from "react-native-testing-library";

import Categories from "../screens/Categories";

// Mocking the CategoriesContext
jest.mock("../store/categories-context", () => ({
  CategoriesContext: {
    Consumer: ({ children }) =>
      children({
        categories: [
          { id: "1", name: "Category 1", color: "#ed9cd3", icon: "shirt" },
          { id: "2", name: "Category 2", color: "#eabc02", icon: "home" },
        ],
      }),
  },
}));

describe("Categories", () => {
  test("renders category items correctly", () => {
    const { getByText } = render(<Categories />);

    // Check if category items are rendered
    expect(getByText("Category 1")).toBeDefined();
    expect(getByText("Category 2")).toBeDefined();

    // You can add more assertions to test other properties of category items
  });

  // Add more tests as needed
});
