import React, { createContext, useState } from 'react'

export const ExpenseContext = createContext(null);


export const ExpenseProvider = ({children}) => {

    const [expensesList, setExpensesList] = useState([]);
    const [totalExpense, setTotalExpense] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('retail_and_shopping');

  return (
    <ExpenseContext.Provider value={{selectedCategory, setSelectedCategory, expensesList, setExpensesList, totalExpense, setTotalExpense}}>
        {children}
    </ExpenseContext.Provider>
  )
}
