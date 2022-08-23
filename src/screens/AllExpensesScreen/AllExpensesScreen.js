import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { ExpenseContext } from '../../contexts/ExpenseContext';
import ExpenseCard from '../../components/ExpenseCard/ExpenseCard';

const AllExpensesScreen = () => {

  const {expensesList} = React.useContext(ExpenseContext);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
    <ScrollView style={styles.expensesScreen}>
        <View style={styles.expensesScreenTextContainer}>
            <Text style={styles.expensesScreenText1}>Expenses Today</Text>
            <Text style={styles.expensesScreenText2}>All expenses that you noted today.</Text>
        </View>

        <View style={styles.expensesScreenListContainer}>
      {
        expensesList ? [...expensesList].reverse().map((expense, idx) => {
            return <ExpenseCard 
                alternateColors={true}
                key={idx} 
                idx={idx}
                amount={expense.amount} 
                note={expense.note} 
                category={expense.category} />
        }) : null
      }
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

let styles = StyleSheet.create({
    expensesScreen: {
        padding: 15,
        paddingTop: 25,
        width: '100%',
        height: '100%',
    },
    expensesScreenTextContainer: {
        marginBottom: 20
    },
    expensesScreenText1: {
        color: 'white',
        fontSize: 32
    },
    expensesScreenText2: {
        color: 'gray',
        fontSize: 15
    },
    expensesScreenListContainer: {
        marginBottom: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
    }
});

export default AllExpensesScreen