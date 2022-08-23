import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

const CategoryHelp = () => {

    const mappings = [
        {
            name: 'Housing',
            description: 'Rent or mortgage payments, property taxes, HOA dues, home maintenance costs.'
        },
        {
            name: 'Transportation',
            description: 'Car payments, registration and DMV fees, fuel, maintenance, parking, tolls, and public transit.'
        },
        {
            name: 'Food',
            description: 'Groceries, restaurant meals, work lunches, food delivery.'
        },
        {
            name: 'Bills',
            description: 'Gas, electricity, water, and sewage bills'
        },
        {
            name: 'healthcare',
            description: 'Out-of-pocket costs for primary care, specialty care (dermatologists, psychologists, etc.), dental care, urgent care, prescriptions, medical devices and supplies.'
        },
        {
            name: 'Retail and Shopping',
            description: 'Shopping'
        },
        {
            name: 'Insurance',
            description: "Health insurance, homeowner’s or renter’s insurance, home warranties or protection plans, auto insurance, life insurance, disability insurance."
        },
        {
            name: 'Other',
            description: "Anything other than the above mentioned categories."
        }

    ]

  return (
    <View style={styles.categoryHelp}>
      <Text style={styles.categoryHelpText1}>Category TLDR</Text>
      <View style={styles.categoryHelpContainer}>
        {
            mappings.map((category, idx) => {
                return (
                    <View key={idx}>
                    <View style={styles.categoryExplained}>
                        <Text style={styles.categoryHelpName}>{category.name}</Text>
                        <Text style={styles.categoryHelpDescription}>{category.description}</Text>
                    </View>
                    <View style={styles.horizontalLine}></View>
                    </View>
                )
            })
        }
      </View>
    </View>
  )
}

let styles = StyleSheet.create({
    categoryHelp: {
        backgroundColor: 'rgba(255, 255, 255, 0.07)',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20
    },
    horizontalLine: {
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 5,
        marginBottom: 15
    },  
    categoryExplained: {
        marginBottom: 10,
    },
    categoryHelpText1: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20
    },
    categoryHelpContainer: {
        marginBottom: 10
    },
    categoryHelpName: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 22
    },
    categoryHelpDescription: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 16,
    }
});

export default CategoryHelp