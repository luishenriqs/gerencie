import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../../components/Header';
import { HighlightCard } from '../../../components/HighlightCard';
import { 
    TransactionCard, ITransactionCardProps,
} from '../../../components/TransactionCard';
import {
    Container,
    LoadingContainer,
    Cards,
    Transactions,
    FilterButton,
    TransactionList,
    Filters,
    Title,
} from './styles';

export interface IDataListProps extends ITransactionCardProps {
    id: string;
}

interface IHighlightProps {
    amount: string;
}

interface IHighlightData {
    entries: IHighlightProps;
    expensives: IHighlightProps;
    total: IHighlightProps;
}

export function List({navigation}: {navigation: any}) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<IDataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<IHighlightData>(
        {} as IHighlightData
    );

    const theme = useTheme();

    async function request() {
        const dataKey = '@gerencie:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensiveTotal = 0;

        const transactionsFormatted: IDataListProps[] = transactions
        .map((item: IDataListProps) => {

            if (item.transactionType === 'up') {
                entriesTotal += Number(item.value);
            } else {
                expensiveTotal += Number(item.value);
            }
            const value = Number(item.value)
            .toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format(new Date(item.date));

            return {
                id: item.id,
                date,
                category: item.category,
                value,
                transactionType: item.transactionType,
                description: item.description,
            }
        });
        setData(transactionsFormatted);
        const total = entriesTotal - expensiveTotal;
        setHighlightData({
            entries: {
                amount: entriesTotal
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            expensives: {
                amount: expensiveTotal
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            },
            total: {
                amount: total
                .toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                })
            }
        });
        setIsLoading(false);
    }

    useEffect(() => {
        request();
    }, []);

    useFocusEffect(useCallback(() => {
        request();
    }, []));

    return (
        <Container>
            {
                isLoading ? 
                    <LoadingContainer>
                        <ActivityIndicator 
                            color={theme.colors.primary}
                            size='large'
                        />
                    </LoadingContainer> :
                <>
                    <Header 
                        title='Financeiro' 
                        headerSize='big'
                        onPress={() => navigation.openDrawer()}
                    />
                    <Cards>
                        <HighlightCard
                            title="Entradas"
                            amount={highlightData.entries.amount}
                            lastTransaction="Total de entradas no mês de julho"
                            type="up"
                        />
                        <HighlightCard
                            title="Despesas"
                            amount={highlightData.expensives.amount}
                            lastTransaction="Total de despesas no mês de julho"
                            type="down"
                        />
                        <HighlightCard
                            title="Balanço"
                            amount={highlightData.total.amount}
                            lastTransaction="Balanço do mês de julho"
                            type="total"
                        />
                    </Cards> 
                    
                    <Transactions>
                        <Filters>
                            <FilterButton>
                                <Title>Entradas</Title>
                            </FilterButton>
                            <FilterButton>
                                <Title>Despesas</Title>
                            </FilterButton>
                            <FilterButton>
                                <Title>Balanço</Title>
                            </FilterButton>
                        </Filters>
                        <TransactionList 
                            data={data}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <TransactionCard data={item} />}
                        />
                    </Transactions>
                </>
            }
        </Container>
    )
}
