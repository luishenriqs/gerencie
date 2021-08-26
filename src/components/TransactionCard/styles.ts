import styled from 'styled-components/native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ITransactionProps {
    type: 'up' | 'down';
}

export const Container = styled.View`
    background: ${({ theme }) => theme.colors.shape };
    border-radius: 5px;
    padding: 6px 24px;
    margin-bottom: 16px;
`;

export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
`;

export const Category = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Icon = styled(MaterialIcons)`
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.title };
`;

export const CategoryName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular };
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.title };
    margin-left: 8px;
`;

export const Date = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular };
    font-size: ${RFValue(12)}px;
    color: ${({ theme }) => theme.colors.title };
`;

export const Description = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular };
    font-size: ${RFValue(16)}px;
    color: ${({ theme }) => theme.colors.dark };
`;

export const Amount = styled.Text<ITransactionProps>`
    font-family: ${({ theme }) => theme.fonts.regular };
    font-size: ${RFValue(20)}px;
    color: ${({ theme, type }) =>
        type === 'up' ? theme.colors.success : theme.colors.attention
    };
    margin-top: 2px;
`;





