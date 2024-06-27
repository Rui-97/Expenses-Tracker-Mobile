const BACKEND_URL = "https://expense-tracker-ac512-default-rtdb.firebaseio.com";

//Http requests related to EXPENSES===========================================================
export async function fetchExpenses(token) {
  const url = `${BACKEND_URL}/expenses.json?auth=${token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const expenses = [];

    for (const key in data) {
      const expenseObj = {
        id: key,
        description: data[key].description,
        categoryId: data[key].categoryId,
        amount: data[key].amount,
        date: new Date(data[key].date),
        image: data[key].image,
      };
      expenses.push(expenseObj);
    }
    return expenses;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function addExpenseOnBackend(expense, token) {
  const url = `${BACKEND_URL}/expenses.json?auth=${token}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });

    // Firebase returns the id of the newly added item
    const id = await response.json();
    return id;
  } catch (error) {
    console.error("Error:", error);
  }
}

export function updateExpenseOnBackend(id, expense, token) {
  const url = `${BACKEND_URL}/expenses/${id}.json?auth=${token}`;

  try {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

export function deleteExpenseOnBackend(id, token) {
  const url = `${BACKEND_URL}/expenses/${id}.json?auth=${token}`;

  try {
    fetch(url, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
//=============================================================================

//Http requests related to Categories============================================
export async function fetchCategories(token) {
  const url = `${BACKEND_URL}/categories.json?auth=${token}`;
  try {
    const response = await fetch(url);
    const data = await response.json();

    const categories = [];

    for (const key in data) {
      const categoryObj = {
        id: key,
        name: data[key].name,
        color: data[key].color,
        icon: data[key].icon,
      };
      categories.push(categoryObj);
    }
    return categories;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function addCategoryOnBackend(category, token) {
  const url = `${BACKEND_URL}/categories.json?auth=${token}`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });

    // Firebase returns the id of the newly added item
    const id = await response.json();
    return id;
  } catch (error) {
    console.error("Error:", error);
  }
}

export function updateCategoryOnBackend(id, category, token) {
  const url = `${BACKEND_URL}/categories/${id}.json?auth=${token}`;

  try {
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

export function deleteCategoryOnBackend(id, token) {
  const url = `${BACKEND_URL}/categories/${id}.json?auth=${token}`;

  try {
    fetch(url, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
