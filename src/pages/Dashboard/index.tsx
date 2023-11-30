import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StyleSheet
} from 'react-native';

import { StackParamsList } from '../../routes/app.routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { useNavigation } from '@react-navigation/native'

import { api } from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard() {
    const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
    const { signOut } = useContext(AuthContext)

    const [number, setNumber] = useState('')
    async function openOrder() {
        if (number === '') {
            console.log('Preencha os campos');
            return;
        }

        const response = await api.post('/order', {
            table: Number(number)
        })

        navigation.navigate('Order', {
            number: number,
            order_id: response.data.id
        });

        setNumber('');
    }

    async function handleSignOut() {
        await signOut();
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.buttonSignOut}
                onPress={handleSignOut}
            >
                <Text style={styles.buttonTextSignOut}>Sair</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Novo pedido</Text>

            <TextInput
                placeholder='Numero da mesa'
                placeholderTextColor="#f0f0f0"
                style={styles.input}
                keyboardType='numeric'
                value={number}
                onChangeText={setNumber}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={openOrder}
            >
                <Text style={styles.buttonText}>Abrir mesa</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#1d1d2e'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 24
    },
    input: {
        width: '90%',
        height: 60,
        backgroundColor: '#101026',
        borderRadius: 4,
        paddingHorizontal: 8,
        textAlign: 'center',
        fontSize: 17,
        color: '#fff'
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: '#dd7b05',
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: '#101026',
        fontWeight: 'bold',
    },
    buttonSignOut: {
        position: 'absolute',
        top: 10,
        right: 20,
        width: '10%',
        height: 40,
        backgroundColor: 'transparent',
        borderColor: '#dd7b05',
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextSignOut: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
    }
})