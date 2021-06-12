import React from 'react';
import {KeyboardAvoidingView, Text, Pressable} from 'react-native';
import Header from '../../components/Header';
import {
  Container,
  TitleContainer,
  Title,
  ContentContainer,
} from './styles';

const Financial = ({navigation}: {navigation: any}) => {
  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} enabled>
        <Container>
          <Header onPress={() => navigation.openDrawer()} />
          <TitleContainer>
            <Title>Financeiro:</Title>
          </TitleContainer>
          <ContentContainer>
            <Pressable
              onPress={() => navigation.navigate('Appointments')}
              style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
              <Text>Navegue para Agendamentos</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate('Delivery')}
              style={{ padding: 10, marginBottom: 10, marginTop: 10 }}
            >
              <Text>Navegue para Entregas</Text>
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

export default Financial;
