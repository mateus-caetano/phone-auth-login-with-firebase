import React from "react";
import { Alert } from "react-native";

import * as firebase from "firebase";

const checkVerificationCode = async (verificationId, verificationCode) => {
  try {
        const credential = firebase.auth.PhoneAuthProvider.credential(
          verificationId,
          verificationCode
        )
        await firebase.auth().signInWithCredential(credential);
        
        Alert.alert(
            'Success',
            'You are logged in',
            [
                { text: 'Ok', },
            ]
        )

      } catch (err) {
        console.error(err);
        Alert.alert(
            'Error',
            'Invalid verification code',
            [
                { text: 'Send new verification code', onPress: () => verificationId = null},
                { text: 'Try again', },
            ]
        )
      }
}

export default checkVerificationCode