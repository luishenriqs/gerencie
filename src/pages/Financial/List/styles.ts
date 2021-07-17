import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { IDataListProps } from '.';

export const Container = styled.View`
    flex: 1;
    background: ${({ theme }) => theme.colors.background };
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
    margin-top: ${RFPercentage(9)}px;
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

export const LoadingContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;