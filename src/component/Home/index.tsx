import {
    View,
    Text,
    Image,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PropsType {
    users: any;
    loadUsers: () => void;
    loading: boolean;
    refreshing: boolean;
    onRefresh: () => void;
    onUserPress: (user: any) => void;
    onAddUserPress: () => void;
}

const Home = (props: PropsType) => {
    const Insets = useSafeAreaInsets();

    // renderItemUserDetailsList
    const renderItemUserDetailsList = ({ item, index }: any) => {
        return (
            <TouchableOpacity
                key={index}
                style={styles.card}
                activeOpacity={0.7}
                onPress={() => props.onUserPress(item)}
            >
                <Image
                    source={{
                        uri:
                            item.image && item.image.startsWith('http')
                                ? item.image
                                : `data:image/jpeg;base64,${item.image}`,
                    }}
                    style={styles.avatar}
                />

                <View style={{ flex: 1 }}>
                    <Text style={styles.name} numberOfLines={2}>
                        {item.firstName} {item.lastName}
                    </Text>

                    <Text style={styles.email} numberOfLines={1}>
                        {item.email}
                    </Text>

                    <Text style={styles.job} numberOfLines={1}>
                        <Text style={{ fontWeight: '400' }}>Gender :- </Text>
                        {item.gender}
                    </Text>

                    <Text style={styles.job} numberOfLines={1}>
                        <Text style={{ fontWeight: '400' }}>Age :- </Text>
                        {item.age}
                    </Text>

                    <Text style={styles.location} numberOfLines={1}>
                        Blood Group :- {item.bloodGroup}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {props.loading && props.users?.length === 0 ? (
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                >
                    <ActivityIndicator size="large" color="#232B42" />
                </View>
            ) : (
                <>
                    <View style={styles.container}>
                        <FlatList
                            refreshControl={
                                <RefreshControl
                                    refreshing={props.refreshing}
                                    onRefresh={props.onRefresh}
                                    tintColor={'#232B42'}
                                />
                            }
                            contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
                            data={props.users}
                            keyExtractor={item => item.id.toString()}
                            renderItem={renderItemUserDetailsList}
                            onEndReached={props.loadUsers}
                            onEndReachedThreshold={0.4}
                            ListFooterComponent={
                                props.loading && props.users?.length > 0 ? (
                                    <ActivityIndicator size="large" color="#232B42" />
                                ) : null
                            }
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.addButton, { bottom: Insets.bottom + 50 }]}
                        onPress={props.onAddUserPress}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.addButtonText}>+</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default Home;
