import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { IDataListProps } from '.';

export const Container = styled.View`
    flex: 1;
    background: ${({ theme }) => theme.colors.background };
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    color: ${({ theme }) => theme.colors.shape };
    font-family: ${({ theme }) => theme.fonts.regular };
    font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text`
    color: ${({ theme }) => theme.colors.shape };
    font-family: ${({ theme }) => theme.fonts.bold };
    font-size: ${RFValue(18)}px;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary };
    font-size: ${RFValue(24)}px;
`;

export const Cards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(14)}px;
`;

export const Transactions = styled.View`
flex: 1;
padding: 0 24px;
`;

export const TransactionList = styled(
    FlatList as new () => FlatList<IDataListProps>
    ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    },
})``;

export const Filters = styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding: 0 15px;
`;

export const FilterButton = styled.TouchableOpacity`
    margin-top: ${RFPercentage(12)}px;
    margin-bottom: ${RFPercentage(2)}px;
    font-family: ${({ theme }) => theme.fonts.regular };
    background-color: ${({ theme }) => theme.colors.primary };
    border-radius: 5px;
    padding: 4px 0;
    width: 80px;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: ${RFValue(13)}px;
    color: ${({ theme }) => theme.colors.text };
`;