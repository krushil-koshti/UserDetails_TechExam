import React, { useEffect, useState } from 'react';
import AddUser from '../../component/AddUser';
import {
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useUserStore } from '../../store/userStore';

const AddUserContainer = (props: any) => {
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
          ]}
        >
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.6}
            hitSlop={10}
          >
            <Text style={{ fontSize: 24, color: '#232B42' }}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {isEdit ? 'Edit User' : 'Add New User'}
          </Text>
          <View style={{ width: 40 }} />
        </View>
      ),
    });
  }

  // Edit Mode Initialization
  const isEdit = props.route?.params?.isEdit || false;
  const editUser = props.route?.params?.user || null;
  const { addUser, editUser: updateGlobalUser } = useUserStore();

  // states
  const [userImage, setUserImage] = useState(editUser?.image || '');
  const [firstName, setFirstName] = useState(editUser?.firstName || '');
  const [lastName, setLastName] = useState(editUser?.lastName || '');
  const [email, setEmail] = useState(editUser?.email || '');
  const [gender, setGender] = useState(editUser?.gender || '');
  const [age, setAge] = useState(editUser?.age ? String(editUser.age) : '');
  const [bloodGroup, setBloodGroup] = useState(editUser?.bloodGroup || '');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (loading) return;
    setLoading(true);

    const newUser = {
      image: userImage,
      firstName,
      lastName,
      email,
      gender,
      age: Number(age),
      bloodGroup,
    };

    try {
      const url = isEdit
        ? `https://dummyjson.com/users/${editUser.id}`
        : 'https://dummyjson.com/users/add';

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      console.log(`User ${isEdit ? 'updated' : 'created'} via API:`, data);

      const payloadData = {
        ...newUser,
        id: data.id || (isEdit ? editUser.id : Date.now()),
      };

      if (isEdit) {
        updateGlobalUser(payloadData);
      } else {
        addUser(payloadData);
      }

      props.navigation.goBack();
    } catch (error) {
      console.error(`Error ${isEdit ? 'updating' : 'adding'} user:`, error);
    } finally {
      setLoading(false);
    }
  };

  // handleCamera
  const handleCamera = async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA;
    const result = await request(permission);

    if (result === RESULTS.GRANTED) {
      const response = await launchCamera({
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: true,
      });
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setUserImage(asset.base64 as any);
      }
    } else {
      Alert.alert(
        'Permission Denied',
        'Camera permission is required to take photos.',
      );
    }
  };

  // handleGallery
  const handleGallery = async () => {
    let permission;
    if (Platform.OS === 'ios') {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    } else {
      permission =
        Number(Platform.Version) >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    }

    const result = await request(permission);
    if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) {
      const response = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
        includeBase64: true,
      });
      if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setUserImage(asset.base64 as any);
      }
    } else {
      Alert.alert(
        'Permission Denied',
        'Gallery permission is required to choose photos.',
      );
    }
  };

  // onImagePick
  const onImagePick = () => {
    Alert.alert(
      'Choose Image',
      'Select an option to add an image',
      [
        { text: 'Camera', onPress: handleCamera },
        { text: 'Gallery', onPress: handleGallery },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true },
    );
  };

  useEffect(() => {
    Header();
  }, []);

  return (
    <AddUser
      userImage={userImage}
      onImagePick={onImagePick}
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      email={email}
      setEmail={setEmail}
      gender={gender}
      setGender={setGender}
      age={age}
      setAge={setAge}
      bloodGroup={bloodGroup}
      setBloodGroup={setBloodGroup}
      onSubmit={onSubmit}
      isEdit={isEdit}
      loading={loading}
    />
  );
};

export default AddUserContainer;
