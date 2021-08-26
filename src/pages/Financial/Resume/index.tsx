import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
/* Install: yarn add victory-native */
/* Install: expo install react-native-svg */
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { HistoryCard } from '../../../components/HistoryCard';
import { categories } from '../../../utils/categories';
import {
    Container,
    Header,
    Content,
    Title,
    ChartContainer,
    CategoryList,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month,
    LoadingContainer,
} from './styles';

interface ITransactionProps {
    type: 'up' | 'down';
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
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [totalByCategory, setTotalByCategory] = useState<ICategoryData[]>([]);

    const theme = useTheme();

    // Filter to select date;
    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
                setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    };

    async function request() {
        const dataKey = '@gerencie:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        /* ***************[ONLY EXPENSIVES TRANSACTIONS]********************* */
        // 3 comparisons are made: same type, month, year;
        const expensives = responseFormatted.filter(
            (expensive: ITransactionProps) => 
            expensive.type === 'down' &&
            new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
            new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
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

    useFocusEffect(useCallback(() => {
        request();
    }, [selectedDate]));

    return (
        <Container>
            <Header>
                <Title>Despesas por mês</Title>
            </Header>
            {
                isLoading ?
                    <LoadingContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size='large'
                        />
                    </LoadingContainer> :
                    <Content
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: useBottomTabBarHeight(),
                        }}
                    >
        
                        <MonthSelect>
                            <MonthSelectButton onPress={() => handleDateChange('prev')}>
                                <MonthSelectIcon name='chevron-left'/>
                            </MonthSelectButton>
                            <Month>
                                { format(selectedDate, 'MMMM, yyyy', {locale: ptBR}) }
                            </Month>
                            <MonthSelectButton onPress={() => handleDateChange('next')}>
                                <MonthSelectIcon name='chevron-right'/>
                            </MonthSelectButton>
                        </MonthSelect>
        
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
                        {
                            totalByCategory.map(item => (
                                <HistoryCard 
                                    key={item.key}
                                    title={item.name}
                                    amount={item.totalFormatted}
                                    color={item.color}
                                />
                            ))

                        }
                    </ Content>
            }
        </Container>
    )
};