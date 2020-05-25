import React from "react";
import { TouchableOpacity, Text } from "react-native";

import styles from "../styles";
async function resendVerificationCode(){
    const resend = false
    const renderResendButton = (time, canResendVerificationCode) => (
        <TouchableOpacity 
            style={[styles.button, styles.resendButton]}
            disabled={!canResendVerificationCode}
            onPress={() => true}
        >
            <Text style={{ textAlign: 'left', color: '#5C73F2', fontWeight: '700', }}>
            {
                !canResendVerificationCode ?
                `You can resend verification code in ${time} seconds` :
                'Resend verification code'
            }
            </Text>
        </TouchableOpacity>
    )

    const countSeconds = function() {
        for(let time = 20; time >= 1; --time){
            setTimeout(() => {
                renderResendButton(time, false)
            }, 1000)
        }
        return renderResendButton(0, true)
    }

    return await countSeconds()
}
export default resendVerificationCode