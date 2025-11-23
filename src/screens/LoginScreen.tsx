import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { CustomButton } from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleHCMUTLogin = () => {
    // TODO: Implement HCMUT authentication
    // For now, navigate to user dashboard
    navigation.navigate('UserDashboard' as never);
  };

  const handleAdminLogin = () => {
    // TODO: Implement admin authentication
    navigation.navigate('DoctorDashboard' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.illustration}>
          <View style={styles.circle} />
          <View style={styles.circle} />
          <View style={styles.line} />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Ready? Log in using account on:</Text>

        <TouchableOpacity
          style={styles.accountButton}
          onPress={handleHCMUTLogin}
          activeOpacity={0.7}
        >
          <View style={styles.accountButtonContent}>
            <View style={styles.accountIcon}>
              <Ionicons name="person" size={24} color={Colors.primary} />
              <Ionicons name="settings" size={16} color={Colors.primary} style={styles.settingsIcon} />
            </View>
            <Text style={styles.accountButtonText}>HCMUT account</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.adminButton}
          onPress={handleAdminLogin}
          activeOpacity={0.7}
        >
          <Text style={styles.adminButtonText}>Admin</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Find help on common issues or need to create a new account? Log in here you need help?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    height: 200,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  illustration: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.blueLight,
    opacity: 0.5,
  },
  line: {
    position: 'absolute',
    width: 2,
    height: 150,
    backgroundColor: Colors.primary,
    opacity: 0.3,
    left: '50%',
    top: '25%',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  accountButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  accountButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    position: 'relative',
  },
  settingsIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  accountButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.background,
  },
  adminButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 24,
    alignItems: 'center',
  },
  adminButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
  },
  helpText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LoginScreen;

