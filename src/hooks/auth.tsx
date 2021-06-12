import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  // Estado onde estão contidos dados do login ou dados do AsyncStorage se houver;
  const [data, setData] = useState<AuthState>({} as AuthState);

  // Estado de load;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@Application:token',
        '@Application:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({token: token[1], user: JSON.parse(user[1])});
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  /* ******************************[SIGNIN]********************************** */
  // Fazendo login na aplicação;
  const signIn = useCallback(async ({email, password}) => {
    const response = await api.post('sessions', {email, password});
    const {token, user} = response.data;

    await AsyncStorage.multiSet([
      ['@Application:token', token],
      ['@Application:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    // Salvando dados de login no estado;
    setData({token, user});
  }, []);
  /* ************************************************************************ */

  /* *****************************[SIGNOUT]********************************** */
  // Fazendo logout na aplicação;
  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@Application:token', '@Application:user']);

    setData({} as AuthState);
  }, []);
  /* ************************************************************************ */

  /* ****************************[UPDATE]************************************ */
  // Atualizando informacões do perfil;
  const updateUser = useCallback(
    async (user: User) => {
      await AsyncStorage.setItem('@Application:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );
  /* ************************************************************************ */

  return (
    <AuthContext.Provider
      value={{user: data.user, loading, signIn, signOut, updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export {AuthProvider, useAuth};
