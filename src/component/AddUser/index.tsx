import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { styles } from './styles';
import { ImageConst } from '../../assets/images';

interface AddUserProps {
  userImage: string;
  onImagePick: () => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  gender: string;
  setGender: (val: string) => void;
  age: string;
  setAge: (val: string) => void;
  bloodGroup: string;
  setBloodGroup: (val: string) => void;
  onSubmit: () => void;
  isEdit?: boolean;
  loading: boolean;
}

const AddUser = (props: AddUserProps) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: '#FFFFFF' }}
    >
      <ScrollView
        contentContainerStyle={[styles.mainContainer]}
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          {/* User Image Picker */}
          <View style={styles.imagePickerContainer}>
            <View style={styles.imagePicker}>
              {props.userImage ? (
                <Image
                  source={{
                    uri: props.userImage.startsWith('http')
                      ? props.userImage
                      : `data:image/jpeg;base64,${props.userImage}`,
                  }}
                  style={styles.selectedImage}
                />
              ) : (
                <Image source={ImageConst.camera} style={styles.cameraIcon} />
              )}
              {/* Edit Icon Overlay */}
              <TouchableOpacity
                style={styles.editIconContainer}
                onPress={props.onImagePick}
                activeOpacity={0.7}
              >
                <Text style={styles.editIconText}>✎</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* First Name Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>First Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                placeholderTextColor="#A0A0A0"
                value={props.firstName}
                onChangeText={props.setFirstName}
              />
            </View>
          </View>

          {/* Last Name Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Last Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                placeholderTextColor="#A0A0A0"
                value={props.lastName}
                onChangeText={props.setLastName}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter email address"
                placeholderTextColor="#A0A0A0"
                keyboardType="email-address"
                autoCapitalize="none"
                value={props.email}
                onChangeText={props.setEmail}
              />
            </View>
          </View>

          {/* Gender Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderContainer}>
              {['Male', 'Female', 'Other'].map(option => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.genderOption,
                    props.gender?.toLowerCase() === option.toLowerCase() &&
                    styles.genderOptionSelected,
                  ]}
                  onPress={() => props.setGender(option.toLowerCase())}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.genderText,
                      props.gender?.toLowerCase() === option.toLowerCase() &&
                      styles.genderTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Age Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Age</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter age"
                placeholderTextColor="#A0A0A0"
                keyboardType="numeric"
                value={props.age}
                onChangeText={props.setAge}
                maxLength={3}
              />
            </View>
          </View>

          {/* Blood Group Input */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Blood Group</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter blood group (e.g., O+, A-)"
                placeholderTextColor="#A0A0A0"
                value={props.bloodGroup}
                onChangeText={props.setBloodGroup}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={props.onSubmit}
            activeOpacity={0.6}
            disabled={props.loading}
          >
            {props.loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>
                {props.isEdit ? 'Update User' : 'Add User'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddUser;
