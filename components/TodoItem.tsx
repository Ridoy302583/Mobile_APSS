import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Check, Trash2 } from 'lucide-react-native';
import type { Todo } from '@/store/todoStore';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.checkbox}>
        {todo.completed && <Check size={18} color="#007AFF" />}
      </TouchableOpacity>
      <Text style={[styles.title, todo.completed && styles.completedTitle]}>
        {todo.title}
      </Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Trash2 size={20} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  deleteButton: {
    padding: 4,
  },
});