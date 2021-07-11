import React from 'react';
import Header from '../../../components/Header';
import { HighlightCard } from '../../../components/HighlightCard';
import { 
    TransactionCard, ITransactionCardProps,
} from '../../../components/TransactionCard';
import {
    Container,
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

export function List({navigation}: {navigation: any}) {
    const data: IDataListProps[] = [
        {
            id: "1",
            type: "positive",
            title: "Desenvolvimento de site",
            amount: "R$ 12.000,00",
            category: {
                name: 'Vendas',
                icon: 'dollar-sign',
            },
            date: "13/04/2021",
        },
        {
            id: "2",
            type: "negative",
            title: "Hamburgueria Pizzy",
            amount: "R$ 59,00",
            category: {
                name: 'Alimentação',
                icon: 'coffee',
            },
            date: "13/04/2021",
        },
        {
            id: "3",
            type: "negative",
            title: "Aluguel do apartamento",
            amount: "R$ 1.200,00",
            category: {
                name: 'Casa',
                icon: 'shopping-bag',
            },
            date: "13/04/2021",
        },
    ];

    return (
        <Container>
            <Header 
                title='Financeiro' 
                headerSize='big'
                onPress={() => navigation.openDrawer()}
            />
            <Cards>
                <HighlightCard
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransaction="Total de entradas no mês de julho"
                    type="up"
                />
                <HighlightCard
                    title="Despesas"
                    amount="R$ 1.259,00"
                    lastTransaction="Total de despesas no mês de julho"
                    type="down"
                />
                <HighlightCard
                    title="Balanço"
                    amount="R$ 16.141,00"
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
        </Container>
    )
}