import React from 'react';
import {KeyboardAvoidingView, Text, Pressable} from 'react-native';
import Header from '../../components/Header';
import {
  Container,
  ContentContainer,
  MainContent,
  Content
} from './styles';

const Appointments = ({navigation}: {navigation: any}) => {
  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} enabled>
        <Container>
          <Header title='Agendamentos' onPress={() => navigation.openDrawer()} />
          <ContentContainer>
            <MainContent>
              <Content>Agendamentos</Content>
            </MainContent>
            <Pressable
              onPress={() => navigation.navigate('Delivery')}
              style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
              <Text>Navegue para Entregas</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Financial')}
              style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
              <Text>Navegue para Financeiro</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Sales')}
              style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
              <Text>Navegue para Vendas</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.openDrawer()}
              style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
              <Text>Abra o menu</Text>
            </Pressable>
          </ContentContainer>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default Appointments;
