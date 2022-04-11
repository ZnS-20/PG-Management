import { SafeAreaView, View, StyleSheet, TextInput, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

const Login = ({ navigation }) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const doLogin = () => {
        setLoading(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(`http://13.127.27.128:8080/login?username=${username}&password=${password}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                navigation.navigate({
                    name: 'SmartXLiving',
                    params: { userData: data },
                    merge: true
                });
            })
            .catch(error => {
                setLoading(false);
                alert("Invalid Credentials");
                clearInputs;
            })
    }

    const clearInputs = () => {
        setPassword('');
        setUserName('');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> SmartXLiving</Text>
            <View style={styles.login}>
                {loading ? (
                    <ActivityIndicator
                        //visibility of Overlay Loading Spinner
                        visible={loading}
                        //Text with the Spinner
                        textContent={'Loading...'}
                        //Text style of the Spinner Text
                        textStyle={styles.spinnerTextStyle}
                    />
                ) : (
                    <>
                        <Text style={styles.titleLogin}> Login </Text>
                        <View style={styles.form}>
                            <TextInput placeholder='Email or Phone' value={username} onChangeText={(text) => setUserName(text)} style={styles.textInputs} />
                            <TextInput placeholder='Password' secureTextEntry={true} value={password} onChangeText={(text) => setPassword(text)} style={styles.textInputs} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={styles.button} onPress={doLogin}>
                                    <Text style={styles.textButtom}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => clearInputs()}>
                                    <Text style={styles.textButtom}>Reset</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D6D6D6'
    },
    login: {
        height: 280,
        width: '90%',
        margin: 10,
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    title: {
        fontSize: 30,
        textAlign: 'center',
        fontStyle: 'normal',
        fontWeight: 'bold',
        alignItems: 'flex-start'
    },
    form: {
        height: 250,
        width: '90%',
        marginTop: 20,
    },
    textInputs: {
        borderRadius: 20,
        borderColor: 'black',
        height: 40,
        borderWidth: 1,
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 10
    },
    textButtom: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    titleLogin: {
        fontSize: 30,
        textAlign: 'left',
        fontStyle: 'normal',
        fontWeight: 'bold',
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
})