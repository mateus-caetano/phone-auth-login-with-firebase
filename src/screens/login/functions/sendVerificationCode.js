import React from "react";
import { Alert } from "react-native";

import * as firebase from "firebase";

const sendVerificationCode = async (phoneNumber, recaptchaVerifier) => {
    let verificationId
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
    ).then(res => {
        verificationId = res
        Alert.alert(
            'Success',
            'Check your messagebox',
            [
                { text: 'Ok', onPress: () => {} }
            ]
        
        )
    })
        .catch((err) => {
        Alert.alert(
            'Error',
            'You need to resolve recaptcha',
            [
                { text: 'Cancel', },
                { text: 'Ok', onPress: () => sendVerificationCode() },
            ]
        )
    })
    
    return verificationId
}

export default sendVerificationCode