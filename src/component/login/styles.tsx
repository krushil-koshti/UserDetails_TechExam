import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
    },
    headerContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#232B42',
        marginBottom: 8,
    },
    emoji: {
        fontSize: 28,
    },
    subtitle: {
        fontSize: 14,
        color: '#121212',
        fontWeight: '400',
    },
    inputSection: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#121212',
        marginBottom: 8,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 52,
        backgroundColor: '#FAFAFA',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#121212',
        height: '100%',
        fontWeight: '500',
    },
    eyeIconContainer: {
        padding: 8,
    },
    eyeIcon: {
        width: 24,
        height: 24,
        tintColor: '#121212',
        resizeMode: 'contain',
    },
    forgotPasswordText: {
        color: '#232B42',
        fontSize: 14,
        textAlign: 'right',
        marginTop: -5,
        marginBottom: 30,
        fontWeight: '500',
    },
    signInButton: {
        backgroundColor: '#232B42',
        borderRadius: 8,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    signInButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        marginBottom: 30,
    },
    footerText: {
        fontSize: 14,
        color: '#4A4A4A',
    },
    createAccountText: {
        fontSize: 14,
        color: '#232B42',
        fontWeight: 'bold',
    },
    mainContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});
