import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { ImageConst } from '../../assets/images';

interface LoginProps {
    email: string;
    setEmail: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    isSecure: boolean;
    setIsSecure: (val: boolean) => void;
    onSignIn: () => void;
}

const Login = ({
    email,
    setEmail,
    password,
    setPassword,
    isSecure,
    setIsSecure,
    onSignIn,
}: LoginProps) => {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            contentContainerStyle={[
                { paddingTop: insets.top + 50 },
                styles.mainContainer,
            ]}
            style={{ flex: 1, backgroundColor: '#FFFFFF' }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode='interactive'
        >
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>
                        Welcome to App <Text style={styles.emoji}>👋</Text>
                    </Text>
                    <Text style={styles.subtitle}>Please sign in to continue.</Text>
                </View>

                {/* Email Input */}
                <View style={styles.inputSection}>
                    <Text style={styles.label}>Email Address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="#A0A0A0"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputSection}>
                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="#A0A0A0"
                            secureTextEntry={isSecure}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            activeOpacity={0.6}
                            hitSlop={10}
                            style={styles.eyeIconContainer}
                            onPress={() => setIsSecure(!isSecure)}
                        >
                            <Image
                                source={isSecure ? ImageConst.eyeOff : ImageConst.eyeOn}
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity activeOpacity={0.6} hitSlop={10}>
                    <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity
                    style={styles.signInButton}
                    onPress={onSignIn}
                    activeOpacity={0.6}
                    hitSlop={10}
                >
                    <Text style={styles.signInButtonText}>Sign In</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>New here? </Text>
                    <TouchableOpacity activeOpacity={0.6} hitSlop={10}>
                        <Text style={styles.createAccountText}>Create an Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default Login;
