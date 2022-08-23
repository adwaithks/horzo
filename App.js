import * as React from 'react';
import { MaterialIcons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import InsightsScreen from './src/screens/InsightsScreen/InsightsScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import NewExpenseScreen from './src/screens/NewExpenseScreen/NewExpenseScreen';
import { ExpenseContext, ExpenseProvider } from './src/contexts/ExpenseContext';
import AllExpensesScreen from './src/screens/AllExpensesScreen/AllExpensesScreen';
import AuthScreen from './src/screens/AuthScreen/AuthScreen';
import {UserContext, UserProvider} from './src/contexts/UserContext';
import * as SplashScreen from 'expo-splash-screen';
import { getToken } from './src/utils/tokenStore';
import * as NavigationBar from 'expo-navigation-bar';
import { replaceAll } from './src/utils/replaceAllPolyfill';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const options = ({ route }) => {
  return {
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      switch (route.name) {
        case 'Home':
          iconName = 'home-filled';
          break;
    
        case 'Insights':
          iconName = 'insights';
          break;

        case 'Account':
          iconName = 'person';
          break;

        default:
          break;
      }
      return <MaterialIcons name={iconName} size={32} color={focused ? 'white' : 'gray'} />;
    },
    tabBarStyle: {
      backgroundColor: 'rgba(0, 0, 0, 1)',
      padding: 5,
      height: 60,
      borderTopWidth: 1,
      paddingBottom: 10,
      borderTopColor: 'rgba(255, 255, 255, 0.05)',
    },
    gestureEnabled: true,
    gestureDirection: 'horizontal',
    tabBarActiveTintColor: 'white',
  }
}

function Landing() {
  return ( 
      <Tab.Navigator screenOptions={options}>
        <Tab.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
        <Tab.Screen options={{headerShown: false}} name="Insights" component={InsightsScreen} />
        <Tab.Screen options={{headerShown: false}} name="Account" component={ProfileScreen} />
      </Tab.Navigator>
  );
}

function Stacks() {
    const {accessToken} = React.useContext(UserContext);

  return (
    <NavigationContainer>
        <Stack.Navigator>
          {
            accessToken ? null : <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{
              headerShown: false,
              presentation: 'modal',
            }}
          />
          }
          
          <Stack.Screen
            name="Home"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="NewExpense" component={NewExpenseScreen} />
          <Stack.Screen name="AllExpenses" options={{
            presentation: 'modal',
            title: 'Expenses Today',
            headerTintColor: 'white',
            headerStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.98)',
              borderBottomWidth: 0.5,
              borderBottomColor: 'rgba(0, 0, 0, 0.2)'
            }
          }} component={AllExpensesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

function Splash() {
  const {setExpensesList, setTotalExpense} = React.useContext(ExpenseContext);
  
  SplashScreen.preventAutoHideAsync();

  React.useEffect(() => {
    function setBackgroundColor() {
      if (Platform.OS === 'android') {
        NavigationBar.setBackgroundColorAsync("rgba(0, 0, 0, 1)");
      }
    }

    function getTodaysExpenses(token) {
      fetch('https://horzo-backend.herokuapp.com/api/expenses/today', {
        method: 'GET',
        headers: {
          'Access-Token': `Bearer ${token}`
        }
      })
      .then((res) => res.json())
      .then((res) => {
          if (res.status != 200) {
            console.log('not 200');
          }
          setExpensesList(res.data);
          getTotalExpense(res.data);
          SplashScreen.hideAsync();
      }).catch(err => console.log(err))
    }

    setBackgroundColor();

    getToken('Access-Token').then((accessToken) => {
      getTodaysExpenses(accessToken);
    });

    function getTotalExpense(expensesList) {
      let total = 0;
      total = expensesList?.reduce((acc, item) => {
          acc += +replaceAll(item['amount'], ',', '');
          return acc;
      }, 0);
      setTotalExpense(total);
    }

  }, []);
  return (
    <></>
  )
}

function Main() {
  return (
    <Splash />
  )
}

function App() {
  return (
    <UserProvider>
      <ExpenseProvider>
        <Main />
        <Stacks />
      </ExpenseProvider>
    </UserProvider>
  );
}

export default App;