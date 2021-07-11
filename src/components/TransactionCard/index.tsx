import React from 'react';
import {
    Container,
    Header,
    Category,
    Icon,
    CategoryName,
    Date,
    Description,
    Amount,
} from './styles';

interface ICategory {
    name: string;
    icon: string;
}

export interface ITransactionCardProps {
    type: 'positive' | 'negative';
    title: string;
    amount: string;
    category: ICategory;
    date: string;
}

interface IProps {
    data: ITransactionCardProps;
}

export const TransactionCard = ({ data }: IProps) => {
    return (
        <Container>
            <Header>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Header>
            <Description>{data.title}</Description>
            <Amount type={data.type}>
                {data.type === 'negative' && '- '}
                {data.amount}
            </Amount>
        </Container>
    )
}