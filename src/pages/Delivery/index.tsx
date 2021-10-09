import React from 'react';
import {KeyboardAvoidingView, Text, Pressable} from 'react-native';
import Header from '../../components/Header';
import {
  Container,
  ContentContainer,
  MainContent,
  Content
} from './styles';

export function Delivery({navigation}: {navigation: any}) {
  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} enabled>
      <Container>
          <Header
            title='Entregas'
            headerSize={'small'}
            onPress={() => navigation.openDrawer()}
          />
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};
