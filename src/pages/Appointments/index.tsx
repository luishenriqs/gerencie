import React, { useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {KeyboardAvoidingView, Text, Pressable} from 'react-native';
import Header from '../../components/Header';
import {
  Container,
  ContentContainer,
  MainContent,
  Content
} from './styles';

interface IInfo {
  id: string;
  info: string;
  informações: string;
};

interface IArray {
  guide_id: string;
  guide_info: string;
};

export function Appointments({navigation}: {navigation: any}) {

    const guide_info = [
      {
        id: '0001',
        info: 'info 1',
        informações: '3213213221',
      },
      {
        id: '0002',
        info: 'info 2',
        informações: 'pppppppppppp',
      },
      {
        id: '0003',
        info: 'info 3',
        informações: 'ttttttttttt',
      },
      {
        id: '0004',
        info: 'info 4',
        informações: 'gggggggggg',
      },
    ];

    const daily = [
      {
        name: 'daily',
        guide_id: '0003',
        guide_info: 'guide_info 303333',
      },
      {
        name: 'daily',
        guide_id: '0004',
        guide_info: 'guide_info 30111',
      },
      {
        name: 'daily',
        guide_id: '0001',
        guide_info: 'Achou o cara do id 1',
      },
      {
        name: 'daily',
        guide_id: '0004',
        guide_info: 'guide_info 40111',
      },
    ];

    const procedure = [
      {
        name: 'procedure',
        guide_id: '0001',
        guide_info: 'guide_info 4444',
      },
      {
        name: 'procedure',
        guide_id: '0004',
        guide_info: 'guide_info 2000',
      },
      {
        name: 'procedure',
        guide_id: '0004',
        guide_info: 'guide_info 3000',
      },
      {
        name: 'procedure',
        guide_id: '0004',
        guide_info: 'guide_info 4000',
      },
    ];

    const materials = [
      {
        name: 'materials',
        guide_id: '0002',
        guide_info: 'guide_info 8888',
      },
      {
        name: 'materials',
        guide_id: '0004',
        guide_info: 'guide_info 7777',
      },
      {
        name: 'materials',
        guide_id: '0003',
        guide_info: 'guide_info 3333',
      },
    ]

    const drugs = [
      {
        name: 'drugs',
        guide_id: '0001',
        guide_info: 'guide_info 5555',
      },
      {
        name: 'drugs',
        guide_id: '0003',
        guide_info: 'guide_info 6666',
      },
    ]

    function findArray(array: IArray[], id: string) {
      const arrayfinded = array.filter(
        (array: IArray) => array.guide_id === id
      );
      return arrayfinded;
    };

    function montaObjeto(
      infoArray: IInfo[], 
      array1: IArray[], 
      array2: IArray[], 
      array3: IArray[],
      array4: IArray[],
      ) {
      
      const guide = infoArray.map(item => {

        const daily = findArray(array1, item.id);
        const guide_daily = [...daily];

        const procedure = findArray(array2, item.id);
        const guide_procedure = [...procedure];

        const materials = findArray(array3, item.id);
        const guide_materials = [...materials];

        const drugs = findArray(array4, item.id);
        const guide_drugs = [...drugs];

        let guide = {
          id: item.id,
          info: item.info,
          informações: item.informações,
          guide_daily,
          guide_procedure,
          guide_materials,
          guide_drugs
        }

        return guide;
      });
      console.log('->>>>>>>>>>>', guide);
      return guide;
    };

  
    useFocusEffect(
      React.useCallback(() => {
        const response = montaObjeto(
          guide_info,
          daily,
          procedure,
          materials,
          drugs,
        );

        const guide: IInfo[] = [...response];
        console.log('$$$$$$$$----> ', guide);
      }, [])
    );



  return (
    <>
      <KeyboardAvoidingView style={{flex: 1}} enabled>
        <Container>
          <Header
            title='Agendamentos'
            headerSize={'small'}
            onPress={() => navigation.openDrawer()}
          />
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};
