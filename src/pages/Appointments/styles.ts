import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.colors.background };
`;

export const ContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background };
`;

export const MainContent = styled.View`
  width: 250px;
  height: 380px;
  background: ${({ theme }) => theme.colors.shape };
  align-items: center;
  justify-content: center;
`;

export const Content = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold };
`;