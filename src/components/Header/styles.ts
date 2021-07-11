import styled, { css } from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface IHeaderProps {
  headerSize: 'big' | 'small';
}

export const Container = styled.View`
  width: 100%;
`;

export const HeaderWrapper = styled.View<IHeaderProps>`
  background: ${({ theme }) => theme.colors.primary };
  width: 100%;
  flex-direction: row;

  ${({ headerSize }) => headerSize === 'small' && css`
    height: ${getStatusBarHeight() + RFPercentage(9)}px;
    align-items: flex-end;
    justify-content: space-between;
    padding: 0 15px 10px 15px;
  `};
  ${({ headerSize }) => headerSize === 'big' && css`
    height: ${getStatusBarHeight() + RFPercentage(28)}px;
    align-items: flex-start;
    justify-content: space-between;
    padding: 40px 15px 0 15px;
  `};
`;

export const Icon = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.colors.shape };
  padding-bottom: 5px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape };
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold };
`;

