import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Button, Icon, Title } from './styles';

const icons =  {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
}

interface IProps extends RectButtonProps {
    type: 'up' | 'down';
    title: String;
    isActive: boolean;
}

export function TransactionTypeButton({type, title, isActive, ...rest}: IProps) {
    return (
        <Container type={type} isActive={isActive}>
            <Button {...rest}>
                <Icon
                    name={icons[type]}
                    type={type}
                    isActive={isActive}
                />
                <Title
                    type={type}
                    isActive={isActive}
                >
                    {title}
                </Title>
            </Button>
        </Container>
    )
}