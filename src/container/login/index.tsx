import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Login from '../../component/login';
import { screenNames } from '../../routers';

const LoginContainer = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isSecure, setIsSecure] = useState<boolean>(true);

    const handleSignIn = () => {
        const emailRegex = /^[a-z._][a-z0-9._]+@[a-z0-9.]+\.[a-z]{2,5}$/;

        if (!email.trim()) {
            return Alert.alert('Error', 'Please enter your email address');
        } else if (!emailRegex.test(email.toLowerCase())) {
            return Alert.alert('Error', 'Please enter valid email address');
        } else if (!password) {
            return Alert.alert('Error', 'Please enter your password');
        } else if (password.length < 8) {
            return Alert.alert('Error', 'Password must be at least 8 characters long');
        } else {
            // All validations passed
            navigation.navigate(screenNames.home);
        }
    };

    return (
        <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isSecure={isSecure}
            setIsSecure={setIsSecure}
            onSignIn={handleSignIn}
        />
    );
};

export default LoginContainer;
