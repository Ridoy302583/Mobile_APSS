import React, { useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { useTodoStore } from '@/store/todoStore';
import { TodoItem } from '@/components/TodoItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CompletedScreen() {
  const { todos, toggleTodo, deleteTodo, loadTodos } = useTodoStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={todos.filter(todo => todo.completed)}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});