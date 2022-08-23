import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import Category from '../CategoryList/Category/Category';

const CategoricalExpenses = ({categories}) => {

  return (
    <View style={styles.categoricalExpenses}>
      <Text style={styles.categoricalExpensesTitle1}>expenses in each category</Text>
      <View style={styles.categoricalExpensesContainer}>
        {
            Object.entries(categories).map((category, idx) => {
                return (
                    <View key={idx} style={styles.categoryInfo}>
                        <Category noPointers={true} name={category[0]} style={styles.category} />
                        <Text style={styles.amount}>{category[1] > 0 ?(<FontAwesome name="rupee" size={20} color="white" />) : null} {category[1] > 0 ? category[1].toLocaleString(): '---'}</Text>
                    </View>
                )
            })
        }
      </View>
    </View>
  )
}

let styles = StyleSheet.create({
 categoricalExpenses: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 50
  },
  categoricalExpensesTitle1: {
    fontSize: 20,
    marginBottom: 15,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  categoricalExpensesContainer: {
  },
  categoryInfo: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingBottom: 10,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)'
  },
  category: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white'
  },
  amount: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20
  }
});

export default CategoricalExpenses