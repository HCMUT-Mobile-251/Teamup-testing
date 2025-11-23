import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { MoodSelector } from '../../components/MoodSelector';
import { CustomButton } from '../../components/CustomButton';
import { MoodType } from '../../types';
import { db } from '../../config/firebase';

const MoodCheckInScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>(
    (route.params as any)?.mood
  );
  const [loading, setLoading] = useState(false);

  const handleSaveMood = async () => {
    if (!selectedMood) {
      Alert.alert('Vui lòng chọn', 'Hãy chọn cảm xúc của bạn');
      return;
    }

    setLoading(true);
    try {
      // Save mood check-in to Firestore
      const moodCheckIn = {
        userId: 'user1', // TODO: Get from auth context
        mood: selectedMood,
        date: new Date().toISOString().split('T')[0],
        timestamp: Date.now(),
      };

      await db.collection('moodCheckIns').add(moodCheckIn);

      Alert.alert('Thành công', 'Cảm xúc của bạn đã được ghi nhận!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error saving mood:', error);
      Alert.alert('Lỗi', 'Không thể lưu cảm xúc. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Check-in cảm xúc</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Bạn cảm thấy thế nào hôm nay?</Text>
        <Text style={styles.subtitle}>
          Hãy chia sẻ cảm xúc của bạn để chúng tôi có thể hỗ trợ bạn tốt hơn
        </Text>

        <View style={styles.moodContainer}>
          <MoodSelector selectedMood={selectedMood} onSelectMood={setSelectedMood} />
        </View>

        {selectedMood && (
          <View style={styles.selectedMoodInfo}>
            <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
            <Text style={styles.selectedMoodText}>
              Bạn đã chọn: {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)}
            </Text>
          </View>
        )}

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Mẹo nhỏ:</Text>
          <Text style={styles.tipsText}>
            Check-in cảm xúc hàng ngày giúp bạn theo dõi sức khỏe tinh thần và nhận được
            hỗ trợ kịp thời từ các chuyên gia.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Lưu cảm xúc"
          onPress={handleSaveMood}
          disabled={!selectedMood}
          loading={loading}
        />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  moodContainer: {
    marginVertical: 20,
  },
  selectedMoodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.successLight,
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  selectedMoodText: {
    fontSize: 16,
    color: Colors.success,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipsContainer: {
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 12,
    marginTop: 32,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});

export default MoodCheckInScreen;

