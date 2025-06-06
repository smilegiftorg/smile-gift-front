import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card } from './ui/Card';
import { IArticle } from '../types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

const { width } = Dimensions.get('window');

interface ArticleCardProps {
  article: IArticle;
  onPress: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <FastImage source={{ uri: article.image }} style={styles.image} />
      
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{article.category}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.meta}>
          {new Date(article.publishedAt).toLocaleDateString('vi-VN')} • {article.author}
        </Text>
        <Text style={styles.title} numberOfLines={2}>{article.title}</Text>
        <Text style={styles.description} numberOfLines={3}>{article.description}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: (width - Spacing.xl - Spacing.md) / 2,
    marginBottom: Spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
  },
  categoryBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
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
  content: {
    padding: Spacing.md,
  },
  meta: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[500],
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.neutral[900],
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[600],
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.sm,
  },
});