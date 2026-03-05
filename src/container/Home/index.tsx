import React, { useEffect, useState } from 'react';
import Home from '../../component/Home';
import { StatusBar, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useUserStore } from '../../store/userStore';
import { useFocusEffect } from '@react-navigation/native';

interface PropsType {
    navigation: any;
    route: any;
}
const HomeContainer = (props: PropsType) => {
    const Insets = useSafeAreaInsets();

    // Header
    function Header() {
        props.navigation.setOptions({
            header: () => (
                <View
                    style={[
                        styles.headerContainer,
                        { paddingTop: Insets.top + (StatusBar.currentHeight || 0) },
                    ]}
                >
                    <Text style={styles.headerTitle}>Welcome! 👋</Text>

                    <Text style={styles.headerSubtitle}>
                        Manage and explore user profiles easily
                    </Text>
                </View>
            ),
        });
    }

    // states
    const [users, setUsers] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const loadingRef = React.useRef(false);

    const BASE_URL = 'https://dummyjson.com';

    //   getUsers
    const getUsers = async (currentPage = 1, limit = 10, isRefresh = false) => {
        if (loadingRef.current) return;

        try {
            loadingRef.current = true;
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const skip = (currentPage - 1) * limit;

            const response = await fetch(
                `${BASE_URL}/users?limit=${limit}&skip=${skip}`,
            );

            const data = await response.json();
            const newUsers = data?.users || [];

            if (newUsers.length === 0) {
                setHasMore(false);
            } else {
                setUsers((prev): any => {
                    if (isRefresh) return newUsers;
                    const existingIds = new Set(prev.map((u: any) => u.id));
                    const filteredNew = newUsers.filter((u: any) => !existingIds.has(u.id));
                    return [...prev, ...filteredNew];
                });
                setPage(currentPage + 1);
                setHasMore(newUsers.length === limit);
            }
        } catch (error) {
            console.log('User API Error:', error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
            setRefreshing(false);
        }
    };

    //   loadUsers
    const loadUsers = () => {
        if (loadingRef.current || !hasMore) return;
        getUsers(page, 10, false);
    };

    // onRefresh
    const onRefresh = () => {
        if (loadingRef.current) return;
        setHasMore(true);
        getUsers(1, 10, true);
    };

    // Zustand Global Store
    const { addedUsers, editedUsers } = useUserStore();

    // Combine added, edited, and API users
    const displayUsers = React.useMemo(() => {
        // Apply edits to existing users
        const apiUsersWithEdits = users.map((u: any) =>
            editedUsers[u.id] ? { ...u, ...editedUsers[u.id] } : u
        );

        // Remove any added users that might eventually come from the API to prevent dupes
        const addedIds = new Set(addedUsers.map((u: any) => u.id));
        const filteredApi = apiUsersWithEdits.filter((u: any) => !addedIds.has(u.id));

        return [...addedUsers, ...filteredApi];
    }, [users, addedUsers, editedUsers]);

    // onUserPress
    function onUserPress(user: any) {
        props.navigation.navigate('UserDetails', { user });
    }

    // onAddUserPress
    function onAddUserPress() {
        props.navigation.navigate('AddUser');
    }

    useEffect(() => {
        getUsers(1, 10, false);
    }, []);

    useEffect(() => {
        Header();
    }, []);
    return (
        <Home
            users={displayUsers}
            loadUsers={loadUsers}
            loading={loading}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onUserPress={onUserPress}
            onAddUserPress={onAddUserPress}
        />
    );
};

export default HomeContainer;
