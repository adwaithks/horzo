import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { eraseToken } from '../../utils/tokenStore';
import { UserContext } from '../../contexts/UserContext';

const ProfileScreen = ({navigation}) => {

  const {setAccessToken, email, setEmail} = React.useContext(UserContext);

  const logout = () => {
    eraseToken('Access-Token').then(() => {
      setAccessToken('');
    }).catch();
    eraseToken('email').then(() => {
      setEmail('');
      navigation.replace("Auth");
    });
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <View style={styles.profileScreen}>      
        <View style={styles.profileInfoContainer}>
          <View style={styles.imgSkeleton}>
          <Feather name="user" size={180} color="white" />
          </View>
          <Text style={styles.email}>{email}</Text>
          <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
            <MaterialIcons style={styles.logoutIcon} name="logout" size={24} color="black" />
            <Text style={styles.logoutBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

let styles = StyleSheet.create({
  profileScreen: {
    width: '100%',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  myProfileHeading: {
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: 35
  },  
  profileInfoContainer: {
    width: '100%',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
    paddingBottom: 40,
    paddingTop: 40
  },
  imgSkeleton: {
    height: 230,
    justifyContent: 'center',
    alignItems: 'center',
    width: 230,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    marginBottom: 10
  },
  email: {
    color: 'gray',
    marginTop: 5,
    fontSize: 25
  },
  logoutBtn: {
    backgroundColor: 'white',
    width: 230,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginTop: 40
  },
  logoutIcon: {
    marginRight: 10
  },
  logoutBtnText: {
    color: 'black',
    fontSize: 20
  }
});

export default ProfileScreen