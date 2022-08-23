import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import MostExpenseCard from '../../components/MostExpenseCard/MostExpenseCard'
import { ExpenseContext } from '../../contexts/ExpenseContext';
import { replaceAll } from '../../utils/replaceAllPolyfill';
import CategoricalExpenses from '../../components/CategoricalExpenses/CategoricalExpenses';
import { UserContext } from '../../contexts/UserContext';

const InsightsScreen = ({navigation}) => {

  const {expensesList} = React.useContext(ExpenseContext);
  const {accessToken} = React.useContext(UserContext);
  const [todaysExpenseInfo, setTodaysExpenseInfo] = useState({
    expensiveCategory: '',
    highestExpense: '',
    categoricalExpenses: {}
  });

  useEffect(() => {
    if (accessToken?.length == 0) {
      navigation.replace("Auth");
      return;
    }

      function getCategoricalExpense() {
          let categories = {
              'housing': 0,
              'bills': 0,
              'retail_and_shopping': 0, 
              'food': 0,
              'healthcare': 0, 
              'transportation': 0, 
              'insurance': 0, 
              'housing': 0, 
              'bills': 0, 
              'other_expense': 0
          }
          let expensiveCategory = null;
          let highestExpense = -1;
          expensesList.forEach((purchase, idx) => {
              let category = purchase['category'];
              let amount = +replaceAll(purchase['amount'], ',', '');
              categories[category] += amount;
              if (categories[category] > highestExpense) {
                  highestExpense = categories[category];
                  expensiveCategory = category;
              }
          });
          return {categories, expensiveCategory, highestExpense};
      }
      if (expensesList.length == 0) return;
      const {categories, expensiveCategory, highestExpense} = getCategoricalExpense();
      setTodaysExpenseInfo({
        expensiveCategory: expensiveCategory,
        highestExpense: highestExpense.toLocaleString(),
        categoricalExpenses: categories
      });
  }, [expensesList])

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <ScrollView contentContainerStyle={expensesList.length == 0 ? {flex: 1, justifyContent: 'center', alignItems: 'center'} : null} style={styles.insightsScreen}>
      <View style={styles.todaysInsightsContainer}>
        <Text style={styles.todaysInsightsText1}>Today's Insights</Text>
        <Text style={styles.todaysInsightsText2}>detailed insight into your expenses today!</Text>
      </View>
        {
          expensesList.length == 0 ? (
            <Text style={styles.noInsightsText}>No Insights</Text>
          ) : (
            <>
              <MostExpenseCard amount={todaysExpenseInfo.highestExpense} category={todaysExpenseInfo.expensiveCategory} />
              <CategoricalExpenses categories={todaysExpenseInfo.categoricalExpenses} />
            </>
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}


let styles = StyleSheet.create({
  insightsScreen: {
    width: '100%',
    padding: 15
  },
  todaysInsightsContainer: {
    marginBottom: 30
  },
  todaysInsightsText1: {
    color: 'white',
    fontSize: 35
  },
  todaysInsightsText2: {
    color: 'gray',
    fontSize: 15
  },
  noInsightsText: {
    color: 'gray',
    fontSize: 25
  }

});


export default InsightsScreen