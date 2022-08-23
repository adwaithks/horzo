import { View, Text, TouchableOpacity, TextInput, StyleSheet, Platform } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ExpenseContext } from '../../contexts/ExpenseContext';
import CategoryList from '../CategoryList/CategoryList';
import { AntDesign } from '@expo/vector-icons';
import { replaceAll } from '../../utils/replaceAllPolyfill';
import { UserContext } from '../../contexts/UserContext';

const amountToString = (amount) => {
    if (typeof amount === 'number') {
        return amount.toLocaleString();
    } else {
        return +amount.toLocaleString();
    }
}

const NewExpense = ({ setIsModalOpen }) => {

    const [data, setData] = React.useState({
        amount: '',
        note: '',
        category: 'other'
    });
    const amountInputRef = useRef();
    const {selectedCategory, totalExpense, setTotalExpense, setExpensesList} = React.useContext(ExpenseContext);
    const {accessToken} = React.useContext(UserContext);

    const noteHandler = (text) => {
        setData((prev) => ({...prev, note: text}));
    }

    const amountHandler = (amount) => {
        setData((prev) => ({...prev, amount: amount}));
    }

    const createNewExpense = async () => {        
        if (+data.amount <= 0 || data.category === '' || !selectedCategory) return;
        let newTotalAmount = +replaceAll(totalExpense, ',', '') + +data.amount;
        let dataObj = {
            amount: amountToString(+data.amount),
            category: selectedCategory,
            note: data.note.length > 0 ? data.note : replaceAll(selectedCategory, '_', ' ')
        }
        setExpensesList((prev) => [...prev, dataObj]);
        setTotalExpense((prev) => amountToString(newTotalAmount));
        setIsModalOpen(false);
        let url = `https://horzo-backend.herokuapp.com/api/expenses/new`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': `Bearer ${accessToken}`
            },
            body: JSON.stringify(dataObj)
        })
        .then(res => {
            console.log('New expense created successfully!');
        })
        .catch(err => {
            console.log('Error in creating new expense!');
        });
    }

    useEffect(() => {
        Platform.OS === 'ios' ? (
            amountInputRef.current.focus()
        ) : (
            setTimeout(() => {
                amountInputRef.current.focus();
            }, 50)
        )
    }, [])

    
    return (
    <View style={styles.newExpense}>
        <TouchableOpacity activeOpacity={1} onPress={() => setIsModalOpen(false)} style={styles.closeBtnContainer}>
            <AntDesign name="closecircle" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.modalHeadingTextContainer}>
            <Text style={styles.modalHeadingText}>Create New Expense</Text>
        </View> 
        <View style={styles.container}>
            <Text style={styles.containerText}>Amount</Text>
            <View style={styles.amountContainer}>
                <FontAwesome name="rupee" style={styles.rupeeIcon} size={20} color="rgba(255, 255, 255, 0.7)" />
                <TextInput 
                value={data.amount}
                onChangeText={amountHandler}
                ref={amountInputRef}
                keyboardType='number-pad' 
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'} 
                placeholder='Rs.' 
                style={styles.amountInput}>
                </TextInput>
            </View>
        </View>
        <View style={styles.container}>
            <Text style={styles.containerText}>Select category</Text>
            <CategoryList />
        </View>
        <View style={styles.container}>
            <Text style={styles.containerText}>Note (optional)</Text>
            <TextInput 
            value={data.note}
            onChangeText={noteHandler}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'} 
            placeholder='Anything related to the purchase' 
            style={styles.input}></TextInput>
        </View>

        <TouchableOpacity activeOpacity={1} onPress={createNewExpense} style={styles.doneBtn}>
            <Text style={styles.doneBtnText}>Done</Text>
            <MaterialIcons name="done-all" size={24} color="black" />
        </TouchableOpacity>
    </View>
  )
}

let styles = StyleSheet.create({
    newExpense: {
        alignItems: 'center'
    },  
    closeBtnContainer: {
        width: '90%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    modalHeadingTextContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
        marginBottom: 20
    },
    modalHeadingText: {
        color: 'white',
        fontSize: 30,   
        fontWeight: '500',
    },
    containerText: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
        marginBottom: 5
    },
    container: {
        marginBottom: 15,
        width: '90%',
    },
    amountContainer: {
        borderWidth: 0.25,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    rupeeIcon: {
        marginLeft: 10,
    },
    amountInput: {
        width: '100%',
        marginLeft: 5,
        color: 'white',
        fontSize: 20,
    },
    input: {
        borderRadius: 10,
        borderWidth: 0.3,
        borderColor: 'rgba(255, 255, 255, 0.2)',        color: 'white',
        fontSize: 20,
        padding: 15,
        borderColor: 'gray'
    },
    doneBtn: {
        marginTop: 10,
        backgroundColor: 'white',
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    doneBtnText: {
        fontSize: 20,
        marginRight: 10
    }
});

export default NewExpense