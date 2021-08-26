import React from 'react';
import { categories } from '../../utils/categories';
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

export interface ITransactionCardProps {
    id: string;
    type: 'up' | 'down';
    description: string;
    value: string;
    category: string;
    date: string;
}

interface IProps {
    data: ITransactionCardProps;
}

export const TransactionCard = ({ data }: IProps) => {
    const [category] = categories.filter(item => item.key === data.category);
    return (
        <Container>
            <Header>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Header>
            <Description>{data.description}</Description>
            <Amount type={data.type}>
                {data.type === 'down' && '- '}
                {data.value}
            </Amount>
        </Container>
    )
}