import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTodoStore } from '@/store/todoStore';
import { Trash } from 'lucide-react-native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { loadTodos } = useTodoStore();

  const handleClearAll = async () => {
    await AsyncStorage.removeItem('todos');
    loadTodos();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Management</Text>
        <TouchableOpacity style={styles.button} onPress={handleClearAll}>
          <Trash size={20} color="#FF3B30" />
          <Text style={styles.buttonText}>Clear All Tasks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  section: {
    marginTop: 20,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 16,
    color: '#000000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#FF3B30',
  },
});