import React from 'react';

const Detail = ({ expense, onEdit, onDelete }) => {
    return (
        <div className="expense-detail">
            <span>{expense.amount} - {expense.category} - {new Date(expense.date).toLocaleDateString()} - {expense.description}</span>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
};

export default Detail;
