import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { mockDoctors, mockAppointments } from '../../constants/data';
import { MoodSelector } from '../../components/MoodSelector';
import { MoodType } from '../../types';

const UserDashboard = () => {
  const navigation = useNavigation();
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>();

  const handleMoodSelect = (mood: MoodType) => {
    setSelectedMood(mood);
    navigation.navigate('MoodCheckIn' as never);
  };

  const upcomingAppointment = mockAppointments[0];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu" size={28} color={Colors.text} />
          </TouchableOpacity>
          <View style={styles.profileContainer}>
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={24} color={Colors.primary} />
            </View>
          </View>
        </View>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back, Candy</Text>
          <Text style={styles.questionText}>How's your mental state at the moment?</Text>
        </View>

        {/* Mood Tracker */}
        <View style={styles.moodSection}>
          <MoodSelector selectedMood={selectedMood} onSelectMood={handleMoodSelect} />
        </View>

        {/* Upcoming Appointments */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming appointments</Text>
          {upcomingAppointment && (
            <TouchableOpacity
              style={styles.appointmentCard}
              onPress={() => navigation.navigate('Appointment' as never)}
            >
              <View style={styles.appointmentContent}>
                <View style={styles.appointmentLeft}>
                  <Text style={styles.appointmentDoctor}>{upcomingAppointment.doctorName}</Text>
                  <Text style={styles.appointmentDate}>{upcomingAppointment.date}</Text>
                  <Text style={styles.appointmentDetail}>
                    {upcomingAppointment.type === 'video-call' ? '15 min video chat' : '15 min'} • {upcomingAppointment.location}
                  </Text>
                  <View style={styles.appointmentTime}>
                    <Text style={styles.appointmentTimeText}>{upcomingAppointment.time}</Text>
                    <View style={styles.greenDot} />
                  </View>
                </View>
                <View style={styles.appointmentIcon}>
                  <Ionicons name="people" size={40} color={Colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Available Doctors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllDoctors' as never)}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.doctorsGrid}>
            {mockDoctors.slice(0, 4).map((doctor) => (
              <TouchableOpacity
                key={doctor.id}
                style={styles.doctorCard}
                onPress={() => navigation.navigate('Appointment' as never)}
              >
                <View style={styles.doctorAvatar}>
                  <Ionicons name="person" size={32} color={Colors.primary} />
                </View>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color={Colors.warning} />
                  <Text style={styles.rating}>{doctor.rating}</Text>
                </View>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialization}</Text>
                <TouchableOpacity style={styles.doctorButton}>
                  <Ionicons name="chevron-up" size={16} color={Colors.teal} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Services */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Services</Text>
          {[
            { name: 'Appointments', route: 'Appointment' },
            { name: 'Mental Health Test', route: 'MentalHealthTest' },
            { name: 'FAQ', route: 'FAQ' },
            { name: 'Support chat', route: 'Chat' },
          ].map((service) => (
            <TouchableOpacity
              key={service.name}
              style={styles.serviceItem}
              onPress={() => navigation.navigate(service.route as never)}
            >
              <Text style={styles.serviceText}>{service.name}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={Colors.teal} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Chat' as never)}
        >
          <Ionicons name="people" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="ellipse" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Profile' as never)}
        >
          <Ionicons name="person" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  questionText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  moodSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  appointmentCard: {
    backgroundColor: Colors.lightGreen,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  appointmentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  appointmentLeft: {
    flex: 1,
  },
  appointmentDoctor: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  appointmentDetail: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  appointmentTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentTimeText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
    marginRight: 8,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  appointmentIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  doctorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  doctorCard: {
    width: '48%',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    position: 'relative',
  },
  doctorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: Colors.text,
    marginLeft: 4,
    fontWeight: '600',
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  doctorSpecialty: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  doctorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.tealLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
    right: 8,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  serviceText: {
    fontSize: 16,
    color: Colors.text,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: Colors.lightGreen,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    padding: 8,
  },
});

export default UserDashboard;
