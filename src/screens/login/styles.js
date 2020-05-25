import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
    welcomeContainer: {
        backgroundColor: '#3E38F2',
        width: SCREEN_WIDTH,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    welcomeTextTitle: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'left',
        fontWeight: 'bold',
    },

    welcomeTextSubTitle: {
        fontSize: 18,
        fontWeight:'500',
    },

    button: {
        backgroundColor:'#5C73F2',
        padding: 15,
        borderRadius: 10,
        marginTop: 15,
        width: SCREEN_WIDTH * 0.8,
        elevation: 10
    },

    textButton: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
    },

    inputContainer: {
        flex: 1,
        width: SCREEN_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },

    textInput: {
        width: SCREEN_WIDTH * 0.8,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderColor: '#5C73F2',
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 30,
        fontSize: 18
    },

    resendButton: {
        backgroundColor: '#fff',
        elevation: 0,
        alignSelf: 'flex-start',
        marginLeft: SCREEN_WIDTH * 0.07,
        marginTop: 0, 
    }
})

export default styles