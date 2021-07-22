import React from 'react';
import {Container, HeaderWrapper, Icon, Title, Empty} from './styles';

interface HeaderProps {
  title: string;
  headerSize: 'big' | 'small';
  onPress(): void;
}


const Header: React.FC<HeaderProps> = ({title, headerSize, onPress}) => {
  return (
    <Container>
      <HeaderWrapper headerSize={headerSize}>
        <Icon size={30} name="menu" onPress={onPress} />
        <Title>{title}</Title>
        <Empty/>
      </HeaderWrapper>
    </Container>
  );
};

export default Header;
