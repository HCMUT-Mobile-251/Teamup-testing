import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { EmotionalTendenciesChart } from '../../components/EmotionalTendenciesChart';

const DoctorDashboard = () => {
  const navigation = useNavigation();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const chartData = [
    { label: 'Happy', value: 45, color: Colors.yellow },
    { label: 'Calm', value: 30, color: Colors.blue },
    { label: 'Anxious', value: 15, color: Colors.orange },
    { label: 'Stressed', value: 8, color: Colors.purple },
    { label: 'Sad', value: 2, color: Colors.error },
  ];

  const todayAppointments = [
    { id: '1', time: '09:00', patient: 'Thuc Quynh', type: 'offline', duration: '30 minutes' },
    { id: '2', time: '14:00', patient: 'Thuy Vi', type: 'offline', duration: '30 minutes' },
  ];

  const reviews = [
    {
      id: '1',
      patient: 'Truc Quynh',
      rating: 5,
      comment: 'He is very dedicated and understands my problem. After the consultation sessions, I feel much more comfortable.',
    },
    {
      id: '2',
      patient: 'Thuy Vi',
      rating: 5,
      comment: "The doctor's methods are very useful. I have applied them and found them to be effective!",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}, Doctor!</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Notification' as never)}>
            <Ionicons name="notifications" size={28} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* Doctor Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.doctorAvatar}>
            <Ionicons name="person" size={40} color={Colors.primary} />
          </View>
          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>Hoang Le Hai Thanh</Text>
            <Text style={styles.doctorSpecialty}>Psychologist</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Ionicons key={i} name="star" size={16} color={Colors.warning} />
              ))}
            </View>
          </View>
        </View>

        {/* Key Metrics */}
        <View style={styles.metricsSection}>
          <View style={[styles.metricCard, { backgroundColor: Colors.purpleLight }]}>
            <Ionicons name="people" size={32} color={Colors.purple} />
            <Text style={styles.metricNumber}>248</Text>
            <Text style={styles.metricLabel}>patient</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: Colors.greenLight }]}>
            <Ionicons name="calendar" size={32} color={Colors.success} />
            <Text style={styles.metricNumber}>32</Text>
            <Text style={styles.metricLabel}>appointment</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: Colors.purpleLight }]}>
            <Ionicons name="chatbubbles" size={32} color={Colors.purple} />
            <Text style={styles.metricNumber}>18</Text>
            <Text style={styles.metricLabel}>message</Text>
          </View>
          <View style={[styles.metricCard, { backgroundColor: Colors.blueLight }]}>
            <Ionicons name="star" size={32} color={Colors.warning} />
            <Text style={styles.metricNumber}>5.0</Text>
            <Text style={styles.metricLabel}>rating</Text>
          </View>
        </View>

        {/* Today's Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's appointment</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all →</Text>
            </TouchableOpacity>
          </View>
          {todayAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.appointmentCard}
              onPress={() => navigation.navigate('DetailAppointment' as never)}
            >
              <Text style={styles.appointmentTime}>{appointment.time}</Text>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentPatient}>{appointment.patient}</Text>
                <Text style={styles.appointmentDetail}>
                  {appointment.type}, {appointment.duration}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Students' Emotional Tendencies */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Students' emotional tendencies</Text>
          <EmotionalTendenciesChart
            data={chartData}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
          />
        </View>

        {/* Rating Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rating</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View all →</Text>
            </TouchableOpacity>
          </View>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewAvatar}>
                  <Ionicons name="person" size={20} color={Colors.primary} />
                </View>
                <View style={styles.reviewInfo}>
                  <Text style={styles.reviewPatient}>{review.patient}</Text>
                  <View style={styles.reviewStars}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Ionicons key={i} name="star" size={14} color={Colors.warning} />
                    ))}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color={Colors.success} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubbles" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color={Colors.textSecondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
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
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 24,
  },
  doctorAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  metricsSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    paddingTop: 0,
  },
  metricCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    marginHorizontal: '1%',
  },
  metricNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    textTransform: 'capitalize',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  viewAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  appointmentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  appointmentTime: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginRight: 16,
    minWidth: 60,
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentPatient: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  appointmentDetail: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  reviewCard: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewPatient: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewComment: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
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

export default DoctorDashboard;
