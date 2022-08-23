import { View, StyleSheet } from 'react-native'
import React from 'react'
import Category from './Category/Category'

const CategoryList = () => {

    const categories = ['retail_and_shopping', 'food',
                        'healthcare', 'transportation', 
                        'insurance', 'housing', 'bills', 'other_expense']

  return (
    <View style={styles.categoryList}>
      {
        categories.map((category, idx) => {
            return (
                <Category key={idx} name={category} />
            )
        })
      }
    </View>
  )
}

let styles = StyleSheet.create({
    categoryList: {
        width: '100%',
        flexWrap: 'wrap',
        borderWidth: 1,
        flexDirection: 'row'
    }
});

export default CategoryList