import React, { useState, useEffect } from 'react';

function Expense({ onAdd, expenseToEdit, onUpdate, onDelete }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (expenseToEdit) {
      setAmount(expenseToEdit.amount);
      setCategory(expenseToEdit.category);
      setDate(expenseToEdit.date);
      setDescription(expenseToEdit.description);
    }
  }, [expenseToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expense = { amount, category, date, description };
    if (expenseToEdit) {
      onUpdate({ ...expense, _id: expenseToEdit._id });
    } else {
      onAdd(expense);
    }
    setAmount('');
    setCategory('');
    setDate('');
    setDescription('');
  };

  const handleDelete = () => {
    if (expenseToEdit) {
      onDelete(expenseToEdit._id);
    }
  };

  return (
    <section>
      <h2>{expenseToEdit ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">{expenseToEdit ? 'Update' : 'Add'}</button>
        {expenseToEdit && (
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        )}
      </form>
    </section>
  );
}

export default Expense;
