import React from 'react';
import {Container, Icon, TitleContainer, Title} from './styles';

interface HeaderProps {
  title: string;
  onPress(): void;
}

const Header: React.FC<HeaderProps> = ({onPress, title}) => {
  return (
    <Container>
      <Icon size={30} name="menu" onPress={onPress} />
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>
    </Container>
  );
};

export default Header;
