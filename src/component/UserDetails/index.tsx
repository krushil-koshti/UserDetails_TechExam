import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { styles } from './styles';

interface PropsType {
  user: any;
}

const UserDetails = ({ user }: PropsType) => {
  return (
    <ScrollView contentContainerStyle={styles.container} bounces={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: user?.image && user.image.startsWith('http')
              ? user.image
              : `data:image/jpeg;base64,${user?.image}`
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.username}>@{user?.username || user?.firstName?.toLowerCase()}</Text>
      </View>

      {/* Info Cards */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.card}>
          <InfoRow icon="✉️" label="Email Address" value={user?.email} />
          <View style={styles.divider} />
          <InfoRow icon="👤" label="Gender" value={user?.gender} />
          <View style={styles.divider} />
          <InfoRow icon="🎂" label="Age" value={user?.age ? `${user.age} years old` : ''} />
          <View style={styles.divider} />
          <InfoRow icon="🩸" label="Blood Group" value={user?.bloodGroup} />
        </View>
      </View>
    </ScrollView>
  );
};

const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View style={styles.infoRow}>
    <View style={styles.iconContainer}>
      <Text style={styles.icon}>{icon}</Text>
    </View>
    <View style={styles.infoTextContainer}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || 'N/A'}</Text>
    </View>
  </View>
);

export default UserDetails;