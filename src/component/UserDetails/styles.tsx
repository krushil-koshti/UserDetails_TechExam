import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 35,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E2E6EE',
        borderWidth: 4,
        borderColor: '#121212',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#232B42',
        marginTop: 16,
    },
    username: {
        fontSize: 16,
        color: '#121212',
        marginTop: 4,
        fontWeight: '500',
    },
    infoSection: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#232B42',
        marginBottom: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 5,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.05,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: '#F0F4FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    icon: {
        fontSize: 20,
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    infoLabel: {
        fontSize: 14,
        color: '#121212',
        fontWeight: '500',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        color: '#232B42',
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: '#F0F1F5',
        marginLeft: 74, // icon container width (44) + marginRight (15) + padding (15)
    },
});