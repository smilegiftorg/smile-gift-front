import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ArticleCard } from '../components/ArticleCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { IArticle } from '../types';

// Mock data
const mockArticles: IArticle[] = [
  {
    id: 1,
    title: 'Hành trình thiện nguyện đầy ý nghĩa',
    description: 'Chia sẻ về những trải nghiệm đáng nhớ trong các chuyến thiện nguyện của CLB',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
    publishedAt: '2025-01-10',
    author: 'Smile Gift',
    category: 'Chia sẻ',
    slug: 'hanh-trinh-thien-nguyen',
  },
  {
    id: 2,
    title: 'Kết quả chương trình tháng 12',
    description: 'Tổng kết những hoạt động thiện nguyện trong tháng 12/2024',
    image: 'https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg',
    publishedAt: '2025-01-05',
    author: 'Ban tổ chức',
    category: 'Báo cáo',
    slug: 'ket-qua-thang-12',
  },
  {
    id: 3,
    title: 'Câu chuyện từ tình nguyện viên',
    description: 'Những chia sẻ chân thành từ các tình nguyện viên tham gia hoạt động',
    image: 'https://images.pexels.com/photos/8942991/pexels-photo-8942991.jpeg',
    publishedAt: '2025-01-01',
    author: 'Nguyễn Văn A',
    category: 'Chia sẻ',
    slug: 'cau-chuyen-tinh-nguyen-vien',
  },
  {
    id: 4,
    title: 'Hoạt động gây quỹ thành công',
    description: 'Chương trình gây quỹ vừa qua đã đạt được những kết quả tích cực',
    image: 'https://images.pexels.com/photos/3184433/pexels-photo-3184433.jpeg',
    publishedAt: '2024-12-28',
    author: 'Smile Gift',
    category: 'Tin tức',
    slug: 'gay-quy-thanh-cong',
  },
];

const categories = ['Tất cả', 'Tin tức', 'Chia sẻ', 'Báo cáo', 'Sự kiện'];

export const NewsScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [loading, setLoading] = useState(false);

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tin tức & Chia sẻ</Text>
        <Text style={styles.subtitle}>
          Cập nhật những hoạt động mới nhất của CLB
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm bài viết..."
          value={searchText}
          onChangeText={setSearchText}
        />
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text
                style={[
                  styles.filterChipText,
                  selectedCategory === category && styles.filterChipTextActive,
                ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Articles List */}
      <ScrollView style={styles.articlesList} showsVerticalScrollIndicator={false}>
        <View style={styles.articlesGrid}>
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onPress={() => {}}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateTitle}>Không tìm thấy bài viết</Text>
              <Text style={styles.emptyStateDescription}>
                Thử thay đổi từ khóa tìm kiếm hoặc danh mục
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
    backgroundColor: Colors.primary[700],
  },
  title: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: Typography.fontSizes.lg,
    color: Colors.white,
    opacity: 0.9,
  },
  filtersContainer: {
    padding: Spacing.lg,
    backgroundColor: Colors.neutral[50],
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontSize: Typography.fontSizes.base,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  filterRow: {
    marginBottom: Spacing.sm,
  },
  filterChip: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    marginRight: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.neutral[200],
  },
  filterChipActive: {
    backgroundColor: Colors.primary[700],
    borderColor: Colors.primary[700],
  },
  filterChipText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[700],
  },
  filterChipTextActive: {
    color: Colors.white,
  },
  articlesList: {
    flex: 1,
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  emptyState: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['3xl'],
  },
  emptyStateTitle: {
    fontSize: Typography.fontSizes.xl,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.neutral[900],
    marginBottom: Spacing.sm,
  },
  emptyStateDescription: {
    fontSize: Typography.fontSizes.base,
    color: Colors.neutral[600],
    textAlign: 'center',
  },
});