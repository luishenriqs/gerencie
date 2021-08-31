import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../hooks/Auth';
//===> expo install expo-linear-gradient;
import { LinearGradient } from 'expo-linear-gradient';
import SignInSocialButton from '../../components/SignInSocialButton';
//==> yarn add --dev react-native-svg-transformer;
/* Obs: Importante fazer a tipagem dos arquivos 'svg' na pasta '@types' */
import LogoSvg from '../../assets/gofinances.svg';
import GoogleSvg from '../../assets/google.svg';
import AppleSvg from '../../assets/apple.svg';
import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper,
} from './styles';

const SignInSocial = () => {
    const { signInWithGoogle, signInWithApple } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Google');
        }
    };

    async function handleSignInWithApple() {
        try {
            await signInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Não foi possível conectar a conta Apple');
        }
    };

    return (
        <Container>
            <LinearGradient
                // colors={['#5C4D7D', '#723C70', '#892B64']}
                colors={['#455E89', '#5C4D7D', '#723C70']}
                // colors={['#2E6F95', '#455E89', '#5C4D7D']}
            >
                <Header>
                    <TitleWrapper>
                        {/* <LogoSvg 
                            width={RFValue(120)}
                            height={RFValue(68)}
                        /> */}
                        <Title>
                            Gerencie sua {'\n'} 
                            vida de forma {'\n'} 
                            muito simples
                        </Title>
                    </TitleWrapper>
                    <SignInTitle>
                        Faça o seu login {'\n'}
                        com uma das contas abaixo
                    </SignInTitle>
                </Header>
                <Footer>
                    <FooterWrapper>
                        <SignInSocialButton 
                            title='Entrar com Google'
                            svg={GoogleSvg}
                            onPress={handleSignInWithGoogle}
                        />
                        <SignInSocialButton 
                            title='Entrar com Apple'
                            svg={AppleSvg}
                            onPress={handleSignInWithApple}
                        />
                    </FooterWrapper>
                </Footer>
            </LinearGradient>
        </Container>
    );
}
export default SignInSocial;