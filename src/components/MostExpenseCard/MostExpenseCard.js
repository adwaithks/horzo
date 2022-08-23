import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { replaceAll } from '../../utils/replaceAllPolyfill';

const MostExpenseCard = ({amount, category}) => {

  return (
      <View style={styles.mostExpenseCard}>
        <Text style={styles.mostExpenseCardTitle1}>highest expense in</Text>
        <Text style={styles.mostExpenseCardTitle2}>{replaceAll(category, '_', ' ')}</Text>
        <Text style={styles.amount}><FontAwesome name="rupee" style={styles.rupeeIcon} color="white" /> {amount}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>you spent <FontAwesome name="rupee" size={13} color="black" />{amount} in {replaceAll(category, '_', ' ')} today!</Text>
        </View>
      </View>
  )
}

let styles = StyleSheet.create({
  mostExpenseCardSkeleton: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    backgroundColor: 'gray',
    padding: 15,
    marginBottom: 10
  },
  mostExpenseCard: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10
  },
  mostExpenseCardTitle1: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.7)'
  },
  mostExpenseCardTitle2: {
    fontSize: 33,
    color: 'white',
    fontWeight: 'bold'
  },
  amount: {
    fontSize: 75,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  rupeeIcon: {
    fontWeight: '100',
    fontSize: 40
  },
  categoryContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  category: {
    color: 'black'
  }
});

export default MostExpenseCard