import React, { createContext, useEffect, useState } from 'react'
import { getToken } from '../utils/tokenStore';

export const UserContext = createContext();


export const UserProvider = ({children}) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
      getToken('Access-Token').then((data) => {
        setAccessToken(data);
      });
      getToken('email').then((data) => {
        setEmail(data);
      })
    }, []);

  return (
    <UserContext.Provider value={{accessToken, setAccessToken, email, setEmail, isLoggedIn, setIsLoggedIn}}>
        {children}
    </UserContext.Provider>
  )
}
