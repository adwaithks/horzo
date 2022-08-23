import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useContext, useState } from 'react';
import {setToken} from '../../utils/tokenStore';
import { UserContext } from '../../contexts/UserContext';

const AuthScreen = ({ navigation }) => {

    const [newUser, setNewUser] = useState(null);
    const [btnText, setBtnText] = useState('NEXT');
    const [userData, setUserData] = useState({
        password: '',
        confirmPassword: '',
        email: ''
    });

    const {setIsLoggedIn, setEmail, setAccessToken} = useContext(UserContext);

    const userExists = () => {
        if (userData.email.length === 0) return;
        setBtnText('Please Wait');
        fetch('https://horzo-backend.herokuapp.com/api/auth/exists', {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: userData.email})
        })
        .then(res => res.json())
        .then((data) => {
            if (data.status === 200) {
                setNewUser(false);
            } else {
                setNewUser(true);
            }
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setBtnText('NEXT');
        })
    }

    const loginUser = () => {
        if (userData.email.length === 0 || userData.password.length === 0) return;
        let dataObj = {
            email: userData.email,
            password: userData.password
        }
        setBtnText('Please Wait');
        fetch('https://horzo-backend.herokuapp.com/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataObj)
        }).then(res => res.json())
        .then(res => {
            setToken('email', res.data.email).then().catch();
            setToken('Access-Token', res.data.accessToken).then((data) => {
                setIsLoggedIn(true);
                setAccessToken(res.data.accessToken);
                setEmail(res.data.email);
                navigation.navigate('Home');
            }).catch();
        }).finally(() => {
            setBtnText('NEXT');
        })
    }

    const registerUser = async () => {
        if (userData.email.length == 0 || userData.password.length == 0 || userData.confirmPassword.length == 0) {
            return;
        }
        if (userData.password != userData.confirmPassword) {
            return;
        };
        setBtnText('Please Wait');
        const dataObj = {
            'email': userData.email,
            'password': userData.password
        }
        fetch('https://horzo-backend.herokuapp.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataObj)
        })
        .then(res => res.json())
        .then(res => {
            setToken('email', res.data.email).then().catch();
            setToken('Access-Token', res.data.accessToken).then((data) => {
                setAccessToken(res.data.accessToken);
                setEmail(res.data.email);
                setIsLoggedIn(true);
                navigation.navigate('Home');
            }).catch();
        }).finally(() => {
            setBtnText('NEXT');
        })
    }

    const clickHandler = async () => {
        switch(newUser) {
            case null: // check user exists ? login : register
                if (userData.email.length !== 0) {
                    userExists();
                }
                break;
            case true: // register
                registerUser();
                break;
            case false: // login
                loginUser();
                break;
            default:
                break;
        }
    }

    const confirmPasswordHandler = (text) => {
        setUserData((prev) => ({...prev, confirmPassword: text}));
    }

    const emailHandler = (text) => {
        setUserData((prev) => ({...prev, email: text}));
    }


  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={{flex: 1}}
        keyboardVerticalOffset={0}
    >
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{justifyContent: 'center', alignItems: 'center', flexGrow: 1  }} style={styles.authScreen}> 
            <View style={styles.authContainer}>
            <View style={styles.appNameContainer}>
                <Text style={styles.appName}>horzo.</Text>
                <Text style={styles.label}>Plan Better . Save Better</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.subLabel}>eg: me@gmail.com</Text>
                <TextInput value={userData.email} onChangeText={emailHandler} placeholder='Email' style={styles.inputTxt} />
            </View>
            {
                newUser === null ?  null : newUser == true ? (
                <>

                    <View style={styles.container}>
                        <Text style={styles.label}>Password</Text>
                        <Text style={styles.subLabel}>
                            {
                                userData.password.length === 0 ? 
                                    <Text>Must have atleast 6 characters</Text>
                                    : userData.password.length < 6 ? 
                                    <Text style={styles.red}>Must have atleast 6 characters!</Text>
                                    : <Text style={styles.green}>Good Password!</Text>
                            }
                        </Text>
                        <TextInput 
                            onChangeText={(text) => setUserData((prev) => ({...prev, password: text}))} 
                            placeholder='Password' 
                            autoFocus={true}
                            secureTextEntry={true} 
                            style={styles.inputTxt} />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <Text style={styles.subLabel}>
                            {
                            userData.confirmPassword.length === 0 ? null  : userData.confirmPassword == userData.password ? 
                                <Text style={styles.green}>Passwords match!</Text> 
                                : <Text style={styles.red}>Passwords not match!</Text>
                            }
                        </Text>
                        <TextInput 
                            onChangeText={confirmPasswordHandler} 
                            placeholder='Confirm Password' 
                            secureTextEntry={true} 
                            style={styles.inputTxt} />
                    </View>
                </>
                ) : (
                    <View style={styles.container}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.inputTxt}
                            onChangeText={(text) => setUserData((prev) => ({...prev, password: text}))} 
                            placeholder='Password' 
                            secureTextEntry={true} 
                        />
                    </View>
                )
            }
            <TouchableOpacity onPress={clickHandler} activeOpacity={1} style={styles.authBtn}>
                <Text style={styles.authBtnText}>
                    {btnText}
                </Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

let styles = StyleSheet.create({
    appNameContainer: {
         width: '100%',
         justifyContent: 'center',
         alignItems: 'center',
         marginBottom: 30
    },
    authContainer: {
        width: '100%',
    },
    authScreen: {
        padding: 15,
        backgroundColor: 'black',
        flex: 1,
    },
    container: {
        
    },
    green: {
        color: 'lightgreen'
    },
    red: {
        color: 'red'
    },
    label: {
        color: 'white',
        marginBottom: 3
    },
    subLabel: {
        color: 'gray',
        marginBottom: 5
    },
    inputTxt: {
        color: 'white',
        fontSize: 22,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        padding: 15,
        color: 'white',
        marginBottom: 20,
        borderRadius: 10
    }, authBtn: {
        backgroundColor: 'white',
        padding: 15,
        justifyContent: 'center',
        width: '100%',
        alignItems: 'center',
        borderRadius: 10,
    },authBtnText: {
        color: 'black',
        fontSize: 20
    },
    appName: {
        color: 'lightgreen',
        fontSize: 55,
        fontWeight: 'bold',
    }
});

export default AuthScreen