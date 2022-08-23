import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import React from 'react';
import { replaceAll } from '../../utils/replaceAllPolyfill';



const ExpenseCard = ({idx, amount, note, category, alternateColors = false}) => {
    
    const nameToStyleMap = {
        'food': styles.categoryContainer.food,
        'healthcare': styles.categoryContainer.healthcare,
        'retailandshopping': styles.categoryContainer.retailandshopping,
        'transportation': styles.categoryContainer.transportation,
        'housing': styles.categoryContainer.housing,
        'bills': styles.categoryContainer.bills,
        'insurance': styles.categoryContainer.insurance,
        'otherexpense': styles.categoryContainer.otherexpense
    }


let categoryStyles = {
    retailandshopping: {
        borderColor: 'rgb(89, 0, 255)',
        backgroundColor: 'rgba(89, 0, 255, 0.4)',
    }, food: {
        borderColor: 'rgb(235, 0, 0)',
        backgroundColor: 'rgba(235, 0, 0, 0.4)',
    }, transportation: {
        borderColor: 'rgb(255, 84, 84)',
        backgroundColor: 'rgba(255, 84, 84, 0.4)',
    }, healthcare: {
        borderColor: 'rgb(0, 213, 255)',
        backgroundColor: 'rgba(0, 213, 255, 0.4)',
    },
    insurance: {
        backgroundColor: 'rgba(213, 171, 0, 0.359)',
        borderColor: 'rgb(213, 171, 0)'
    },
    housing: {
        backgroundColor: 'rgba(88, 170, 0, 0.4)',
        borderColor: 'rgb(88, 170, 0)'
    },
    bills: {
        backgroundColor: 'rgba(187, 72, 0, 0.4)',
        borderColor: 'rgb(187, 72, 0)'
    },
    otherexpense: {
        backgroundColor: 'rgba(17, 0, 171, 0.4)',
        borderColor: 'rgb(17, 0, 171)'
    }
}

    return (
    <View style={alternateColors === true ? idx % 2 !== 0 ? styles.evenCard : styles.expenseCard : styles.expenseCard}>
        <View style={styles.amountCategoryContainer}>
            <Text style={styles.amount}><FontAwesome style={styles.rupeeIcon} name="rupee" size={30} color="white" /> {amount}</Text>
            <View style={StyleSheet.compose(categoryStyles[replaceAll(category, '_', '')], nameToStyleMap[replaceAll(category, '_', '')])}>
                <Text style={styles.category}>{replaceAll(category, '_', ' ')}</Text>
            </View>
        </View>
        <Text style={styles.note}>
            {
                note ? note : category.charAt(0).toUpperCase() + category.slice(1)
            }
        </Text>
    </View>
  )
}

let commonStyles = {
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 3,
    paddingBottom: 3,
    marginBottom: 8,
    marginRight: 10,
}

const styles = StyleSheet.create({
    expenseCard: {
        width: '100%',
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
    },
    evenCard: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.08)'
    },
    note: {
        color: 'rgba(255, 255, 255, 0.5)',
        fontSize: 15
    },
    amountCategoryContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    amount: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 40,
    },
    categoryContainer : {
        retailandshopping: {
            ...commonStyles     
        }, food: {
            ...commonStyles  
        }, transportation: {
            ...commonStyles  
        }, healthcare: {
            ...commonStyles  
        },
        insurance: {
            ...commonStyles
        },
        housing: {
            ...commonStyles
        },
        bills: {
            ...commonStyles
        },
        otherexpense: {
            ...commonStyles
        }
    },
    category: {
        color: 'white',
        fontSize: 15
    }
});

export default ExpenseCard