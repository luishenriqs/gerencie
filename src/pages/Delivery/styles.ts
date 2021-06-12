import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background: ${({ theme }) => theme.colors.background };
`;

export const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${RFPercentage(8)}px;
  padding: 5px 0;
  background: ${({ theme }) => theme.colors.background };
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text };
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold };
`;

export const ContentContainer = styled.View`
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background };
`;