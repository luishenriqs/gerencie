import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 60px;
  margin-top: 20px;
  padding: 30px;
  background: ${({ theme }) => theme.colors.primary };
`;

export const Icon = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.secondary };
`;

export const TitleContainer = styled.View`
  align-items: center;
  margin-left: ${RFPercentage(-9)}px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.secondary };
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold };
`;

