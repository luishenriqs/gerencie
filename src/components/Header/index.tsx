import React from 'react';
import {Image} from 'react-native';
import {Container, Icon} from './styles';
import logoImg from '../../assets/blue-30.png';

interface HeaderProps {
  title?: string;
  onPress(): void;
}

const Header: React.FC<HeaderProps> = ({onPress}) => {
  return (
    <Container>
      <Icon size={30} name="menu" onPress={onPress} />
      <Image source={logoImg} />
    </Container>
  );
};

export default Header;
