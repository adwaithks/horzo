import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableOpacity, SafeAreaView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import ExpenseCard from '../../components/ExpenseCard/ExpenseCard'
import TodaysExpenseCard from '../../components/TodaysExpenseCard/TodaysExpenseCard'
import AddNewExpense from '../../components/AddNewExpense/AddNewExpense';
import NewExpenseScreen from '../NewExpenseScreen/NewExpenseScreen';
import { ExpenseContext } from '../../contexts/ExpenseContext';
import { Feather } from '@expo/vector-icons';
import { UserContext } from '../../contexts/UserContext';

const HomeScreen = ({ navigation }) => {

  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const {expensesList, setExpensesList} = React.useContext(ExpenseContext);
  const {accessToken} = React.useContext(UserContext);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (accessToken.length == 0) navigation.replace("Auth");
    
    function getTodaysExpenses() {
      fetch('https://horzo-backend.herokuapp.com/api/expenses/today', {
        method: 'GET',
        headers: {
          'Access-Token': `Bearer ${accessToken}`
        }
      })
      .then((res) => res.json())
      .then((res) => {
          if (res.status != 200) {
            console.log('not 200');
          }
          setExpensesList(res.data);
      }).catch(err => console.log(err))
    }
    if (!expensesList) getTodaysExpenses();
    
    function greetingGenerator() {
      const date = new Date();
      const currentTime = date.getHours();
  
      let greeting;
  
      if (currentTime >= 0 && currentTime <= 12) {
        greeting = "Good Morning!";
      } else if (currentTime > 12 && currentTime <= 16) {
        greeting = "Good Afternoon!";
      } else {
        greeting = "Good Evening!";
      }
      return greeting;
    }
    setGreeting(greetingGenerator());
  }, []);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
    <ScrollView keyboardShouldPersistTaps='handled' style={styles.homeScreen}>
      <StatusBar barStyle={'light-content'} backgroundColor={'rgba(0, 0, 0, 0.98)'} />
      <View style={styles.header}>
        <Text style={styles.greeting}>{greeting}</Text>
        <View style={styles.userAvatar}>
          <Feather name="user" size={30} color="white" />
        </View>
      </View>
      <TodaysExpenseCard />

      <AddNewExpense isModalOpen={isAddExpenseModalOpen} setIsModalOpen={setIsAddExpenseModalOpen} />

      <View style={styles.expensesHeadingContainer}>
        <Text style={styles.expensesHeading}>Expenses</Text>
        <TouchableOpacity style={styles.expensesNavContainer} onPress={() => navigation.navigate('AllExpenses')}>
          <Text style={{color: 'white'}}>view all</Text>
          <FontAwesome style={{marginLeft: 10}} name="long-arrow-right" size={30} color="rgba(255, 255, 255, 0.9)" />
        </TouchableOpacity>
      </View>

      <NewExpenseScreen isModalOpen={isAddExpenseModalOpen} setIsModalOpen={setIsAddExpenseModalOpen} />
      <Text style={{
            color: 'gray',
            marginBottom: 10,
            fontSize: 15
          }}>Expenses Today</Text>
      <View style={styles.expensesContainer}>
          {
            !expensesList || expensesList?.length === 0 ? (
              <Text style={styles.noExpenseText}>No expenses today!</Text>
            ) : (
              [...expensesList?.slice(-2)].reverse().map((expense, idx) => {
                return <ExpenseCard alternateColors={true} idx={idx} key={idx} amount={expense.amount} note={expense.note} category={expense.category} />
              })
            )
          }
      </View>
    </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  greeting: {
    color: 'white',
    fontSize: 35,
  },
  userAvatar: {
    height: 45,
    width: 45,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },  
  header: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },  
  noExpenseText: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginBottom: 50,
    width: '100%',
    fontSize: 30,
    marginTop: 50,
    textAlign: 'center'
  },
  homeScreen: {
    flex: 1,
    padding: 15,
  },  
  expensesHeadingContainer: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expensesNavContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expensesHeading: {
    fontSize: 32,
    color: 'white',
  },  
  expensesContainer: {
    width: '100%',
    marginBottom: 50,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderRadius: 10,
  },
})

export default HomeScreen