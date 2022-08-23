import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import React, { useEffect } from 'react';
import { ExpenseContext } from '../../contexts/ExpenseContext';
import { replaceAll } from '../../utils/replaceAllPolyfill';

const amountToNumber = (amount) => {
    return +replaceAll(amount, ',', '');
}

const expenseMeter = (amount_) => {
    let amount = amountToNumber(amount_);
    if (amount < 500) {
        return 'lightgreen';
    }
    if (amount >= 500 && amount <= 2000) {
        return 'orange';
    } else {
        return 'rgb(255, 68, 89)';
    }
}

const spendingMeter = (amount_) => {
    let amount = amountToNumber(amount_);
    if (amount < 500) {
        return 'Below average spending today. (In India)'
    } 
    if (amount >= 500 && amount <= 2000) {
        return 'Average spending today. (In India)';
    } else {
        return 'Above average spending today! (In India)';
    }
}

const TodaysExpenseCard = () => {

    const {totalExpense, setTotalExpense, expensesList} = React.useContext(ExpenseContext);

    useEffect(() => {
        function getTotalExpense() {
            let total = 0;
            total = expensesList?.reduce((acc, item) => {
                acc += +replaceAll(item['amount'], ',', '');
                return acc;
            }, 0);
            if (total == totalExpense) return;
            setTotalExpense(total);
        }
        getTotalExpense()
    }, [expensesList]);

  return (
        <View style={styles.todaysExpenseCard}>
            <Text style={styles.title}>Total expense today</Text>
            <Text style={{
                color: expenseMeter(totalExpense),
                fontSize: 70,
            }}><FontAwesome style={styles.rupeeIcon} color={expenseMeter(totalExpense)} name="rupee" /> {totalExpense}</Text>
            {
                amountToNumber(totalExpense) > 0 ? <Text style={{
                    color: expenseMeter(totalExpense),
                    fontSize: 15,
                    marginBottom: 15
                }}>{spendingMeter(totalExpense)}</Text> : (<Text style={{color: 'lightgreen'}}>No expenses today!</Text>)
            }
            {
               // parseInt(amount) > 0 ? <Text style={styles.gst}>Aprox. <FontAwesome color={'gray'} size={15} name="rupee" /> 256 in GST</Text> : null
            }
        </View>
    )
}


const styles = StyleSheet.create({
    rupeeIcon: {
        fontSize: 60
    },
    todaysExpenseCardSkeleton: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 30
    },
    todaysExpenseCard: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        paddingLeft: 20,
        paddingTop: 30,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 30
    },
    title: {
        color: 'gray',
        fontSize: 20
    },
    amount: {
        fontSize: 70,
    },
    gst: {
        color: 'gray',
        fontSize: 15,
    },
    noExpense: {
        color: 'lightgreen',
        fontSize: 40,
        paddingBottom: 30
    }
});

export default TodaysExpenseCard