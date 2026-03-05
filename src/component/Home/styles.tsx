import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 10,
        alignItems: 'center',
        shadowColor: '#00000080',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },

    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#232B42',
    },

    email: {
        color: '#121212',
        marginTop: 3,
    },

    job: {
        marginTop: 3,
        fontWeight: '600',
        color: '#121212'
    },

    location: {
        marginTop: 3,
        color: '#121212',
    },

    addButton: {
        position: 'absolute',
        right: 30,
        backgroundColor: '#232B42',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    addButtonText: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '300',
        lineHeight: 34,
    },
});
