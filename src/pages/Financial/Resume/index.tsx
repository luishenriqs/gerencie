import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
/* Install: yarn add victory-native */
/* Install: expo install react-native-svg */
import { VictoryPie } from 'victory-native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { HistoryCard } from '../../../components/HistoryCard';
import { categories } from '../../../utils/categories';
import {
    Container,
    Header,
    Title,
    ChartContainer,
    CategoryList,
} from './styles';

interface ITransactionProps {
    transactionType: 'up' | 'down';
    description: string;
    value: string;
    category: string;
    date: string;
}

export interface ICategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    color: string;
    percent: string;
}

function formattedAmount(amountToFormat: number) {
    const amount = amountToFormat
    .toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
    return amount;
};

export function Resume() {
    const [totalByCategory, setTotalByCategory] = useState<ICategoryData[]>([]);

    const theme = useTheme();

    async function request() {
        const dataKey = '@gerencie:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        /* ***************[ONLY EXPENSIVES TRANSACTIONS]********************* */
        const expensives = responseFormatted.filter(
            (transactions: ITransactionProps) => transactions.transactionType === 'down'
        );

        // Sum of expenses for all categories;
        const expensivesTotal = expensives
        .reduce((acumullator: number, expensives: ITransactionProps) => {
            return acumullator + Number(expensives.value);
        }, 0)

        const totalCategory: ICategoryData[] = [];
        
        categories.forEach(category => {
            
            // Sum of the value of each category;
            let categorySum = 0;
            expensives.forEach((expensives: ITransactionProps) => {
                if (expensives.category === category.key) {
                    categorySum += Number(expensives.value)
                }
            })

            // Percentage of each category in relation to total expenses;
            const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;
            
            if (categorySum > 0) {
                totalCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted: formattedAmount(categorySum),
                    color: category.color,
                    percent,
                })    
            }

        });
        /* ***************** [ORDERING TOTAL CATEGORY] ********************** */
        // First: ordering the values;
        const disordered:number[] = [];
        for (var i = 0; i < totalCategory.length; i++) {
            disordered.push(totalCategory[i].total)
        }
        const orderedValue = disordered.sort(order);
        function order(a: number, b: number) {
            return b - a;
        };
        
        // Second: ordering totalCategory array;
        const orderedCategories: ICategoryData[] = [] 
        for (var i = 0; i < totalCategory.length; i++) {
            const ordered = totalCategory.filter(
                (category: ICategoryData) => Number(
                    category.total) === orderedValue[i]
                );
                orderedCategories.push(ordered[0]);
            }
            
        /* ********************************************************************/

        setTotalByCategory(orderedCategories);
    }

    useEffect(() => {
        request();
    },[]);

    useFocusEffect(useCallback(() => {
        request();
    }, []));

    return (
        <Container>
            <Header>
                <Title>Despesas por categoria</Title>
            </Header>
            <ChartContainer>
                <VictoryPie 
                    data={totalByCategory}
                    x='percent'
                    y='total'
                    height={280}
                    padding={{ top: 15, bottom: 20 }}
                    colorScale={totalByCategory.map(category => category.color)}
                    style={{
                        labels: {
                            fontSize: RFValue(18),
                            fontWeight: 'bold',
                            fill: theme.colors.shape
                        }
                    }}
                    labelRadius={70}
                />
            </ChartContainer>
            <CategoryList 
                data={totalByCategory}
                keyExtractor={item => item.key}
                renderItem={({ item }) => 
                <HistoryCard 
                    title={item.name}
                    amount={item.totalFormatted}
                    color={item.color}
                />}
            />
        </Container>
    )
};