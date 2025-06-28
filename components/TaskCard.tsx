import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CheckCircle, Clock, DollarSign, Target } from 'lucide-react-native';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    reward: string;
    deadline: string;
    progress: number;
    type: 'daily' | 'weekly' | 'special';
    completed: boolean;
  };
  onComplete?: () => void;
}

export default function TaskCard({ task, onComplete }: TaskCardProps) {
  const getTaskTypeColor = () => {
    switch (task.type) {
      case 'daily': return ['#3b82f6', '#60a5fa'];
      case 'weekly': return ['#059669', '#10b981'];
      case 'special': return ['#8b5cf6', '#a78bfa'];
      default: return ['#64748b', '#94a3b8'];
    }
  };

  const getTaskTypeLabel = () => {
    switch (task.type) {
      case 'daily': return 'مهمة يومية';
      case 'weekly': return 'مهمة أسبوعية';
      case 'special': return 'مهمة خاصة';
      default: return 'مهمة';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={task.completed ? ['#059669', '#10b981'] : getTaskTypeColor()}
        style={styles.taskCard}
      >
        <View style={styles.taskHeader}>
          <View style={styles.taskType}>
            <Text style={styles.taskTypeText}>{getTaskTypeLabel()}</Text>
          </View>
          {task.completed && (
            <View style={styles.completedBadge}>
              <CheckCircle size={16} color="#fff" />
              <Text style={styles.completedText}>مكتملة</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
        
        <View style={styles.taskDetails}>
          <View style={styles.rewardContainer}>
            <DollarSign size={16} color="#fff" />
            <Text style={styles.rewardText}>{task.reward}</Text>
          </View>
          
          <View style={styles.deadlineContainer}>
            <Clock size={16} color="#fff" />
            <Text style={styles.deadlineText}>{task.deadline}</Text>
          </View>
        </View>
        
        {!task.completed && (
          <>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${task.progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{task.progress}%</Text>
            </View>
            
            <TouchableOpacity style={styles.actionButton} onPress={onComplete}>
              <Target size={16} color="#fff" />
              <Text style={styles.actionButtonText}>
                {task.progress === 100 ? 'استلام المكافأة' : 'متابعة المهمة'}
              </Text>
            </TouchableOpacity>
          </>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  taskCard: {
    borderRadius: 16,
    padding: 20,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskType: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  taskTypeText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  completedText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 4,
  },
  taskTitle: {
    fontSize: 18,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'right',
  },
  taskDescription: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 16,
    textAlign: 'right',
    lineHeight: 20,
  },
  taskDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 4,
  },
  deadlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deadlineText: {
    fontSize: 14,
    fontFamily: 'Tajawal-Regular',
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: 4,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontFamily: 'Cairo-Bold',
    color: '#fff',
    marginLeft: 8,
  },
});