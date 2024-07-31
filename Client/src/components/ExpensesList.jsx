import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateExpense from './CreateExpense';
import Detail from './Detail';

const ExpensesList = () => {
    const [expenses, setExpenses] = useState([]);
    const [expenseToEdit, setExpenseToEdit] = useState(null);

    const fetchExpenses = async () => {
        try {
            console.log('Fetching expenses...');
            const res = await axios.get('http://localhost:5001/expenses/');
            console.log('Fetched expenses:', res.data);
            setExpenses(res.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleEdit = (index) => {
        setExpenseToEdit(expenses[index]);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5001/expenses/${id}`);
            fetchExpenses();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const handleExpenseAdded = () => {
        fetchExpenses();
    };

    return (
        <div>
            <CreateExpense onExpenseAdded={handleExpenseAdded} />
            <h2>Expenses List</h2>
            <ul>
                {expenses.length > 0 ? (
                    expenses.map((expense) => (
                        <li key={expense._id}>
                            <Detail
                                expense={expense}
                                onEdit={() => handleEdit(expense._id)}
                                onDelete={() => handleDelete(expense._id)}
                            />
                        </li>
                    ))
                ) : (
                    <li>No expenses found.</li>
                )}
            </ul>
        </div>
    );
};

export default ExpensesList;
