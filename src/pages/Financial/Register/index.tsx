import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../hooks/Auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputForm } from '../../../components/Form/InputForm';
// import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '../../../components/Form/Button';
import { TransactionTypeButton } from '../../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import {
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
} from './styles';

interface IFormData {
    value: string;
    description: string;
}

const schema = Yup.object().shape({
    value: Yup
        .number()
        .required('O valor é obrigatório')
        .positive('O valor não pode ser negativo')
        .typeError('Informe um valor numérico'),
    description: Yup.string(),
});
  

export function Register() {
    const [type, setType] = useState('');
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'categoria',
    });

    const navigation = useNavigation();
    const { user } = useAuth();

    const { control, handleSubmit, reset, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    });

    const handleSelectTransactionsTypes = (type: 'up' | 'down') => {
        setType(type);
    }

    const handleOpenSelectCategoryModal = () => {
        setCategoryModalOpen(true);
    }

    const handleCloseSelectCategoryModal = () => {
        setCategoryModalOpen(false);
    }

    async function handleRegister(form: IFormData) {
        if (category.key === 'category')
            return Alert.alert('Selecione a categoria.')
        if (!type) 
            return Alert.alert('Selecione o tipo da transação.')

        const newTransaction = {
            id: String(uuid.v4()),
            date: new Date(),
            category: category.key,
            value: form.value,
            type,
            description: form.description
        }
        try {
            const dataKey = `@gerencie:transactions_user:${user.id}`;
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormated = [...currentData, newTransaction]
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

            reset();
            setType('');
            setCategory({
                key: 'category',
                name: 'categoria',
            });

            navigation.navigate('Lista');

        } catch (error) {
            Alert.alert('Não foi possível salvar os dados')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                    <Title>Cadastre uma movimentação</Title>
                </Header>
                <Form>
                    <Fields>
                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategoryModal}
                        />
                        <InputForm
                            name='value'
                            control={control}
                            placeholder='R$'
                            keyboardType='numeric'
                            error={errors.value && errors.value.message}
                        />
                        <TransactionsTypes>
                            <TransactionTypeButton
                                type='up'
                                title='Entrada'
                                onPress={() => handleSelectTransactionsTypes('up')}
                                isActive={type === 'up'}
                            />
                            <TransactionTypeButton
                                type='down'
                                title='Despesa'
                                onPress={() => handleSelectTransactionsTypes('down')}
                                isActive={type === 'down'}
                            />
                        </TransactionsTypes>

                        <InputForm
                            name='description'
                            control={control}
                            placeholder='Descrição'
                            multiline
                            numberOfLines={2}
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.description && errors.description.message}
                        />
                    </Fields>
                    <Button
                        title='Enviar'
                        onPress={handleSubmit(handleRegister)}
                    />
                </Form>
                <Modal visible={categoryModalOpen}>
                    <CategorySelect
                        category= {category}
                        setCategory= {setCategory}
                        closeSelectCategory= {handleCloseSelectCategoryModal}
                    />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    );
};