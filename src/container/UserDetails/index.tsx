import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import UserDetails from '../../component/UserDetails';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useUserStore } from '../../store/userStore';

interface PropsType {
  navigation: any;
  route: any;
}

const UserDetailsContainer = (props: PropsType) => {
  const { user } = props.route.params;
  const { editedUsers } = useUserStore();

  // Directly observe global store for updates to this user
  const currentUser = editedUsers[user.id] || user;

  const insets = useSafeAreaInsets();

  // Header
  function Header() {
    props.navigation.setOptions({
      header: () => (
        <View
          style={[
            {
              paddingTop: insets.top + (StatusBar.currentHeight || 0),
            },
            styles.header,
            { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }
          ]}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => props.navigation.goBack()}
              style={{ marginRight: 15, paddingVertical: 5, paddingRight: 10 }}
            >
              <Text style={{ fontSize: 24, color: '#232B42' }}>←</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#232B42' }}>
              {currentUser?.firstName} {currentUser?.lastName}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('AddUser', {
                user: currentUser,
                isEdit: true,
              });
            }}
            style={{ paddingVertical: 5, paddingHorizontal: 10 }}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#232B42' }}>Edit</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }

  useEffect(() => {
    Header();
  }, [currentUser]);

  return <UserDetails user={currentUser} />;
};

export default UserDetailsContainer;
