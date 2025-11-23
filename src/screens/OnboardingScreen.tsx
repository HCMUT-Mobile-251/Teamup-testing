import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../constants/colors';
import { CustomButton } from '../components/CustomButton';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const pages = [
    {
      title: 'Welcome to BKMindCare',
      description: 'Stress is part of the Bach\'s health journey — but you don\'t have to face it alone. Our mental health experts are ready to help you find your balance.',
      illustration: '🧘',
    },
    {
      title: 'Features & How it Works',
      features: [
        {
          title: '1-on-1 Counseling with Experts',
          description: 'Schedule sessions with professionals, 24/7 availability',
          color: Colors.purple,
          icon: 'people',
        },
        {
          title: 'Mental Health Assessment Tests',
          description: 'Tests to understand mental health and track progress',
          color: Colors.green,
          icon: 'analytics',
        },
        {
          title: 'Self Care Resources',
          description: 'Resources for daily well-being',
          color: Colors.green,
          icon: 'leaf',
        },
      ],
      steps: [
        { number: 1, title: 'Sign Up', description: 'Create your free account to connect with a mental health expert.', color: Colors.orange, icon: 'person-add' },
        { number: 2, title: 'Book Session', description: 'Choose your suitable professional, time that suits, and schedule your session.', color: Colors.yellow, icon: 'calendar' },
        { number: 3, title: 'Get Support', description: 'Receive professional support through text, video, or in-person sessions.', color: Colors.success, icon: 'chatbubbles' },
      ],
    },
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      scrollViewRef.current?.scrollTo({ x: nextPage * width, animated: true });
    } else {
      navigation.navigate('Login' as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login' as never);
  };

  const renderPage = (page: any, index: number) => {
    if (index === 0) {
      return (
        <View key={index} style={styles.page}>
          <View style={styles.illustrationContainer}>
            <Text style={styles.illustrationEmoji}>🧘</Text>
          </View>
          <Text style={styles.title}>{page.title}</Text>
          <Text style={styles.description}>{page.description}</Text>
        </View>
      );
    }

    return (
      <View key={index} style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.featuresContainer}>
            {page.features?.map((feature: any, idx: number) => (
              <View key={idx} style={[styles.featureCard, { backgroundColor: `${feature.color}20` }]}>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <Ionicons name={feature.icon as any} size={32} color={feature.color} />
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>How it works</Text>
          {page.steps?.map((step: any, idx: number) => (
            <View key={idx} style={styles.stepContainer}>
              <View style={[styles.stepNumber, { backgroundColor: step.color }]}>
                <Text style={styles.stepNumberText}>{step.number}</Text>
              </View>
              <View style={styles.stepContent}>
                <View style={styles.stepHeader}>
                  <Ionicons name={step.icon as any} size={20} color={step.color} />
                  <Text style={styles.stepTitle}>{step.title}</Text>
                </View>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
      >
        {pages.map((page, index) => renderPage(page, index))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentPage === index && styles.activeDot,
              ]}
            />
          ))}
        </View>
        <View style={styles.buttons}>
          <CustomButton
            title="Skip"
            onPress={handleSkip}
            variant="outline"
            style={styles.skipButton}
          />
          <CustomButton
            title={currentPage === pages.length - 1 ? 'Get Started' : 'Next'}
            onPress={handleNext}
            style={styles.nextButton}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  page: {
    width,
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  illustrationEmoji: {
    fontSize: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  featureContent: {
    flex: 1,
    marginRight: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
    marginTop: 8,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginLeft: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 4,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    flex: 0.45,
  },
  nextButton: {
    flex: 0.45,
  },
});

export default OnboardingScreen;

