import React, { useContext, useState } from 'react';
import { createContext, ReactNode } from 'react';
//==> expo install expo-auth-session expo-random;
/* IMPORTANTE: Necessário estar logado no expo:
Digite "expo login" no terminal, daí preencha seu login e senha da conta expo.io; */
import * as AuthSession from 'expo-auth-session';
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface IAuthProviderProps {
    children: ReactNode;
};

interface IUser {
    id: string;
    name: string;
    email: string;
    photo?: string;
};

interface IAuthContextData {
    user: IUser;
    signInWithGoogle(): Promise<void>;
}

interface IAuthorizationResponse {
    params: {
        access_token: string;
    },
    type: string;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
    const [user, setUser] = useState<IUser>({} as IUser)

    // Google Identity Platform ==> https://developers.google.com/identity
    async function signInWithGoogle() {
      try {
          const RESPONSE_TYPE = 'token'
          const SCOPE = encodeURI('profile email')

          const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

          const { type, params } = await AuthSession
          .startAsync({ authUrl }) as IAuthorizationResponse;
          
          if(type === 'success') {
            const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
            const userInfo = await response.json();
            
            setUser({
                id: userInfo.id,
                email: userInfo.email,
                name: userInfo.given_name,
                photo: userInfo.picture
            })
          };


      } catch (error) {
          throw new Error(error);
      }  
    };

    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle    
        }}>
            { children }
        </AuthContext.Provider>
    )
};

function useAuth() {
    const context = useContext(AuthContext);
    return context;
};

export { AuthProvider, useAuth };
