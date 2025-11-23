import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    // Animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate after 2 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Onboarding' as never);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        {/* Logo placeholder - bạn có thể thay bằng hình ảnh thực tế */}
        <View style={styles.logo}>
          <View style={styles.face}>
            <View style={styles.leaf} />
            <View style={styles.stars}>
              <View style={styles.star} />
              <View style={styles.star} />
              <View style={styles.star} />
            </View>
            <View style={styles.sprout} />
          </View>
        </View>
        <Text style={styles.appName}>BKMindCare</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  face: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.background,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaf: {
    position: 'absolute',
    top: 10,
    width: 20,
    height: 20,
    backgroundColor: Colors.success,
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  stars: {
    position: 'absolute',
    top: -10,
    flexDirection: 'row',
  },
  star: {
    width: 8,
    height: 8,
    backgroundColor: Colors.warning,
    marginHorizontal: 2,
    borderRadius: 4,
  },
  sprout: {
    position: 'absolute',
    top: -15,
    width: 4,
    height: 15,
    backgroundColor: Colors.success,
    borderRadius: 2,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 20,
  },
});

export default SplashScreen;

