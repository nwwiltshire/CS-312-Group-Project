import React, { useState } from 'react';
import axios from 'axios';

const CreateExpense = ({ onExpenseAdded }) => {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Groceries');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const expense = {
            amount,
            category,
            date,
            description,
        };

        try {
            await axios.post('http://localhost:5001/expenses/add', expense);
            onExpenseAdded();
            setAmount('');
            setCategory('Groceries');
            setDate('');
            setDescription('');
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="Groceries">Groceries</option>
                <option value="Utilities">Utilities</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
            </select>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <button type="submit">Add Expense</button>
        </form>
    );
};

export default CreateExpense;
