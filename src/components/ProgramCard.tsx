import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { IProgram } from '../types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

const { width } = Dimensions.get('window');

interface ProgramCardProps {
  program: IProgram;
  onPress: () => void;
  onRegister?: () => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({
  program,
  onPress,
  onRegister,
}) => {
  const isUpcoming = program.status === 'upcoming';

  return (
    <Card style={styles.card} onPress={onPress}>
      <FastImage source={{ uri: program.image }} style={styles.image} />
      
      <View style={styles.badges}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{program.category}</Text>
        </View>
        <View style={[styles.statusBadge, isUpcoming ? styles.upcomingBadge : styles.completedBadge]}>
          <Text style={styles.statusText}>
            {isUpcoming ? 'Sắp diễn ra' : 'Đã hoàn thành'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.date}>{program.date} • {program.location}</Text>
        <Text style={styles.title} numberOfLines={2}>{program.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{program.description}</Text>

        {isUpcoming ? (
          <View style={styles.buttonContainer}>
            <Button
              title="Chi tiết"
              onPress={onPress}
              variant="outline"
              size="sm"
              style={styles.detailButton}
            />
            {onRegister && (
              <Button
                title="Đăng ký"
                onPress={onRegister}
                variant="primary"
                size="sm"
                style={styles.registerButton}
              />
            )}
          </View>
        ) : (
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{program.volunteersParticipated || 0}</Text>
              <Text style={styles.statLabel}>TNV tham gia</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{program.beneficiaries || 0}</Text>
              <Text style={styles.statLabel}>Người thụ hưởng</Text>
            </View>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width - Spacing.xl,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  badges: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  categoryBadge: {
    backgroundColor: Colors.primary[700],
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
  },
  categoryText: {
    color: Colors.white,
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 16,
  },
  upcomingBadge: {
    backgroundColor: Colors.success,
  },
  completedBadge: {
    backgroundColor: Colors.neutral[500],
  },
  statusText: {
    color: Colors.white,
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.medium,
  },
  content: {
    padding: Spacing.md,
  },
  date: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[500],
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.neutral[900],
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.fontSizes.base,
    color: Colors.neutral[600],
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.base,
    marginBottom: Spacing.md,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  detailButton: {
    flex: 1,
  },
  registerButton: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[100],
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary[600],
  },
  statLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[500],
  },
});