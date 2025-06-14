import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Rect } from 'react-native-svg';
import { TodoItem } from '../types';
import { getTodoItems, updateTodoItem } from '../utils/storage';

// SVG components for the progress bar
const FilledBar = ({ width }: { width: number }) => (
  <Svg width={width} height={13} viewBox={`0 0 ${width} 13`}>
    <Rect width={width} height={13} rx={6.5} fill="#77C69F" />
  </Svg>
);

const UnfilledBar = ({ width }: { width: number }) => (
  <Svg width={width} height={13} viewBox="0 0 335 13">
    <Rect width={335} height={13} rx={6.5} fill="#F1F8F4" />
  </Svg>
);

interface TodoListProps {
  tasks?: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks = [] }) => {
  // State to track todo items
  const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
  
  // Load todo items from storage
  useEffect(() => {
    const loadTodoItems = async () => {
      const items = await getTodoItems();
      setTodoItems(items);
    };
    
    loadTodoItems();
  }, []);

  // Calculate completion metrics
  const completedCount = todoItems.filter(item => item.completed).length;
  const totalCount = todoItems.length;
  const completionText = `${completedCount}/${totalCount} Completed`;
  const completionPercentage = (completedCount / totalCount) * 100;
  
  // Total width of the progress bar
  const TOTAL_WIDTH = 335;
  // Calculate filled bar width based on completion percentage
  const filledWidth = (completedCount / totalCount) * TOTAL_WIDTH;
  // Toggle task completion
  const toggleTaskCompletion = async (id: string) => {
    // Find the task to toggle
    const taskToToggle = todoItems.find(item => item.id === id);
    if (!taskToToggle) return;
    
    // Update in storage and state
    const updatedItems = await updateTodoItem(id, { completed: !taskToToggle.completed });
    setTodoItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's check off your to-dos</Text>
      
      {/* Progress bar */}
      <View style={styles.progressBarContainer}>
        <Text style={styles.completionText}>{completionText}</Text>
        <View style={styles.progressBar}>
          <View style={styles.unfilledBar}>
            <UnfilledBar width={TOTAL_WIDTH} />
          </View>
          <View style={styles.filledBarContainer}>
            <FilledBar width={filledWidth} />
          </View>
        </View>
      </View>
      
      {/* Todo items */}
      <ScrollView style={styles.taskList}>
        {todoItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.taskContainer}
            onPress={() => toggleTaskCompletion(item.id)}
          >
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                {item.completed && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
            </View>
            <View style={styles.taskContent}>
              <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
                {item.text}
              </Text>
              <Text style={styles.taskMeta}>
                {item.assignee} • {item.date}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    width: '100%',
    height:'100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  completionText: {
    color: '#AAAAAA',
    marginBottom: 8,
    fontSize: 13,
  },
  progressBar: {
    position: 'relative',
    height: 13,
  },
  unfilledBar: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  filledBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },  taskList: {
    maxHeight: 400,
  },
  taskContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  checkboxContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#77C69F',
    borderColor: '#77C69F',
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    marginBottom: 4,
  },
  taskTextCompleted: {
    color: '#777777',
  },
  taskMeta: {
    fontSize: 12,
    color: '#777777',
  },
});

export default TodoList;
