import React from "react";
import { 
    View,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Animated,
    Easing,
    UIManager,
    LayoutAnimation,
    Platform,
    Dimensions,
} from "react-native";
import * as firebase from "firebase";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import firebaseConfig from "../../services/";
import sendVerificationCode from "./functions/sendVerificationCode";
import checkVerificationCode from "./functions/checkVerificationCode";
import resendVerificationCode from "./functions/resendVerificationCode";

import styles from "./styles";

firebase.initializeApp(firebaseConfig)

if(Platform.OS === 'android')
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

export default function Login() {
    const welcomeHeight = new Animated.Value(SCREEN_HEIGHT)
    const recaptchaVerifier = React.useRef(null)
    const [ loginButtomIsClicked, setLoginButtomIsClicked ] = React.useState(false)
    const [ phoneNumber, setPhoneNumber ] = React.useState()
    const [ verificationCode, setVerificationCode ] = React.useState()
    const [ verificationId, setVerificationId ] = React.useState()
    const [ time, setTime ] = React.useState(20)
    
    const inputConfig = {
        placeholder: !verificationId ? 'Your phone number' : 'Verification code',
        autoCompleteType: !verificationId ? 'tel' : 'off',
        keyboardType: !verificationId ? 'phone-pad' : 'numeric',
        textContentType: !verificationId ? 'telephoneNumber' : 'none',
        dataDetectorTypes: !verificationId ? 'phoneNumber' : 'none',
        value: !verificationId ? phoneNumber : verificationCode,
        onChangeText: text => !verificationId ? setPhoneNumber(text) : setVerificationCode(text) ,
    }

    const showLoginFields = () => {
        Animated.timing(welcomeHeight,{
            toValue: SCREEN_HEIGHT * 0.3,
            duration: 250,
            easing: Easing.elastic(1),
            useNativeDriver: false
        }).start(() => {
            setLoginButtomIsClicked(true)
            LayoutAnimation.easeInEaseOut()
        })
    }

    const render = () => {
        
        if(verificationId) {
            setTimeout(() => setTime(time - 1), 1000)
            return (
                <TouchableOpacity 
                    style={[styles.button, styles.resendButton]}
                    disabled={time >= 1 ? true : false}
                    onPress={() => setVerificationId()}
                >
                    <Text style={{ textAlign: 'left', color: '#5C73F2', fontWeight: '700', }}>
                    {
                        (time >= 1) ?
                        `You can resend verification code in ${time} seconds` :
                        'Resend verification code'
                    }
                    </Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}} >
            <StatusBar barStyle='light-content' backgroundColor='#3E38F2' />
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />

            <Animated.View style={[ styles.welcomeContainer, { height: welcomeHeight, marginTop: - StatusBar.currentHeight }]}>
                <Text style={styles.welcomeTextTitle}>Welcome!</Text>
                <Text style={[ styles.welcomeTextTitle, styles.welcomeTextSubTitle ]}>To get started, login with your phone number</Text>
                {!loginButtomIsClicked ? (
                    <TouchableOpacity style={[styles.button, {width: SCREEN_WIDTH * 0.25}]} onPress={showLoginFields}>
                        <Text style={styles.textButton}>Login</Text>
                    </TouchableOpacity>
                ) : null}
            </Animated.View>

            {loginButtomIsClicked && (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={inputConfig.placeholder}
                        placeholderTextColor='#888'
                        autoCompleteType={inputConfig.autoCompleteType}
                        keyboardType={inputConfig.keyboardType}
                        textContentType={inputConfig.textContentType}
                        dataDetectorTypes={inputConfig.dataDetectorTypes}
                        value={inputConfig.value}
                        onChangeText={inputConfig.onChangeText}
                    />

                    <TouchableOpacity 
                        style={[styles.button,]}
                        onPress={!verificationId ?
                            async () => setVerificationId(await sendVerificationCode(phoneNumber, recaptchaVerifier)) :
                            () => checkVerificationCode(verificationId, verificationCode)
                        }
                        >
                        <Text style={styles.textButton}>
                            {!verificationId ? 
                                'Send verification code' : 
                                'Check verification code'
                            }
                        </Text>
                    </TouchableOpacity>

                    {render()}
                </View>
            )}
        </KeyboardAvoidingView>
    )
}