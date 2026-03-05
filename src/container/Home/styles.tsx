import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#232B42',
    },
    headerSubtitle: {
        color: '#121212',
        marginTop: 4,
        fontSize: 14,
        fontWeight: '500',
    },
});
