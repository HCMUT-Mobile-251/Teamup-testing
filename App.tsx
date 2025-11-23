import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import UserDashboard from './src/screens/user/UserDashboard';
import MoodCheckInScreen from './src/screens/user/MoodCheckInScreen';
import ChatScreen from './src/screens/user/ChatScreen';
import AppointmentScreen from './src/screens/user/AppointmentScreen';
import MentalHealthTestScreen from './src/screens/user/MentalHealthTestScreen';
import FAQScreen from './src/screens/user/FAQScreen';
import AllDoctorsScreen from './src/screens/user/AllDoctorsScreen';
import ProfileScreen from './src/screens/user/ProfileScreen';
import AppointmentHistoryScreen from './src/screens/user/AppointmentHistoryScreen';
import MoodHistoryScreen from './src/screens/user/MoodHistoryScreen';
import DoctorDashboard from './src/screens/doctor/DoctorDashboard';
import ExpertDashboard from './src/screens/doctor/ExpertDashboard';
import DetailAppointmentScreen from './src/screens/doctor/DetailAppointmentScreen';
import NotificationScreen from './src/screens/NotificationScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="UserDashboard" component={UserDashboard} />
          <Stack.Screen name="MoodCheckIn" component={MoodCheckInScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Appointment" component={AppointmentScreen} />
          <Stack.Screen name="MentalHealthTest" component={MentalHealthTestScreen} />
          <Stack.Screen name="FAQ" component={FAQScreen} />
          <Stack.Screen name="AllDoctors" component={AllDoctorsScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="AppointmentHistory" component={AppointmentHistoryScreen} />
          <Stack.Screen name="MoodHistory" component={MoodHistoryScreen} />
          <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
          <Stack.Screen name="ExpertDashboard" component={ExpertDashboard} />
          <Stack.Screen name="DetailAppointment" component={DetailAppointmentScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

