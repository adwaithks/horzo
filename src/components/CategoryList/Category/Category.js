import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import {ExpenseContext} from '../../../contexts/ExpenseContext.js'
import { replaceAll } from '../../../utils/replaceAllPolyfill.js'

// name - food_and_bevarage
const Category = ({name, noPointers = false}) => {

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

    const {selectedCategory, setSelectedCategory} = useContext(ExpenseContext);

    const clickHandler = () => {
        setSelectedCategory(name);
    }

  return (
    <TouchableOpacity activeOpacity={1} onPress={clickHandler} 
        style={noPointers ? StyleSheet.compose(nameToStyleMap[replaceAll(name, '_', '')], inactiveStyles[replaceAll(name, '_', '')]) : selectedCategory == name ? 
                StyleSheet.compose(nameToStyleMap[replaceAll(name, '_', '')], activeStyles[replaceAll(name, '_', '')]) 
                : StyleSheet.compose(nameToStyleMap[replaceAll(name, '_', '')], inactiveStyles[replaceAll(name, '_', '')])}>
      <Text style={styles.category}>{replaceAll(name, '_', ' ')}</Text>
    </TouchableOpacity>
  )
}

let commonStyles = {
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 8,
    marginRight: 10,
}

let inactiveStyles = {
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
        backgroundColor: 'rgba(17, 0, 251, 0.4)',
        borderColor: 'rgb(17, 0, 171)'
    }
}


let activeStyles = {
    retailandshopping: {
        borderColor: 'rgb(89, 0, 255)',
        backgroundColor: 'rgb(89, 0, 255)',
    }, food: {
        borderColor: 'rgb(235, 0, 0)',
        backgroundColor: 'rgb(235, 0, 0)',
    }, transportation: {
        borderColor: 'rgb(255, 84, 84)',
        backgroundColor: 'rgb(255, 84, 84)',
    }, healthcare: {
        borderColor: 'rgb(0, 213, 255)',
        backgroundColor: 'rgb(0, 213, 255)',
    },
    insurance: {
        backgroundColor: 'rgb(213, 171, 0)',
        borderColor: 'rgb(213, 171, 0)'
    },
    housing: {
        backgroundColor: 'rgb(88, 170, 0)',
        borderColor: 'rgb(88, 170, 0)'
    },
    bills: {
        backgroundColor: 'rgb(187, 72, 0)',
        borderColor: 'rgb(187, 72, 0)'
    },
    otherexpense: {
        backgroundColor: 'rgb(17, 0, 171)',
        borderColor: 'rgb(17, 0, 171)'
    }
}

let styles = StyleSheet.create({
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
        fontSize: 15,
        color: 'white',
    }
})
export default Category