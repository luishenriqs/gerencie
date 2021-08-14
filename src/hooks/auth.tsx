import React, { useContext } from 'react';
import { createContext, ReactNode } from 'react';

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
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
    const user = {
        id: '123456',
        name: 'Luís Henrique',
        email: 'lh.p@hotmail.com'
    }
    return (
        <AuthContext.Provider value={{ user }}>
            { children }
        </AuthContext.Provider>
    )
};

function useAuth() {
    const context = useContext(AuthContext);
    return context;
};

export { AuthProvider, useAuth };
