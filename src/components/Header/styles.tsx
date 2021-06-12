import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-top: 15px;
  padding: 25px;
  background: ${({ theme }) => theme.colors.attention_light };
`;

export const Icon = styled(MaterialCommunityIcons)`

`;

