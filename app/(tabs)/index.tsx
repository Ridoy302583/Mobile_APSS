import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { useTodoStore } from '@/store/todoStore';
import { TodoItem } from '@/components/TodoItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TodoScreen() {
  const [newTodo, setNewTodo] = useState('');
  const { todos, addTodo, toggleTodo, deleteTodo, loadTodos } = useTodoStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new task..."
          returnKeyType="done"
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity
          style={[styles.addButton, !newTodo.trim() && styles.addButtonDisabled]}
          onPress={handleAddTodo}
          disabled={!newTodo.trim()}
        >
          <Plus size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={todos.filter(todo => !todo.completed)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem
            todo={item}
            onToggle={() => toggleTodo(item.id)}
            onDelete={() => deleteTodo(item.id)}
          />
        )}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  addButton: {
    width: 48,
    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});