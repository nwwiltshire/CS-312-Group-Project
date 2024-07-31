import React, { useState } from "react";
import Header from "./components/Header.jsx";
import Budget from "./components/Budget.jsx";
import ExpensesList from "./components/ExpensesList.jsx";


function App() {
  const [exps, setExps] = useState([]);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  const addExpense = (newExp) => {
    setExps((prevExps) => [...prevExps, newExp]);
    setExpenseToEdit(null);
  };

  const updateExpense = (updatedExp) => {
    setExps((prevExps) =>
      prevExps.map((exp, index) =>
        index === expenseToEdit.index ? updatedExp : exp
      )
    );
    setExpenseToEdit(null);
  };

  const deleteExpense = (id) => {
    setExps((prevExps) => prevExps.filter((_, index) => index !== id));
  };

  const handleEdit = (index) => {
    setExpenseToEdit({
      ...exps[index],
      index
    });
  };

  return (
    <div className="container">
      <Header />
      <ExpensesList/>
      <Budget />
    </div>
  );
}

export default App;
