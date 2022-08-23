import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons';


const AddNewExpense = ({ isModalOpen, setIsModalOpen }) => {
  return (
        <TouchableOpacity activeOpacity={1} onPress={() => setIsModalOpen(true)} style={styles.addNewExpenseBtn}>
            <Text style={styles.addNewExpenseText}>Add new expense</Text>
            <Ionicons name="cash-outline" size={30} color="black" />
        </TouchableOpacity>
  )
}

let styles = StyleSheet.create({
    addNewExpenseBtn: {
        width: '100%',
        color: 'white',
        borderRadius: 10,
        padding: 15,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    addNewExpenseText: {
        fontSize: 20,
    }
});

export default AddNewExpense