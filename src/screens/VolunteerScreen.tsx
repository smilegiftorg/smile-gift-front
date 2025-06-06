import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { IVolunteer } from '../types';

const { width } = Dimensions.get('window');

// Mock data
const mockVolunteers: IVolunteer[] = [
  {
    id: 1,
    title: 'Tuyển tình nguyện viên cho chương trình Tết 2025',
    description: 'Cần tuyển 20 tình nguyện viên tham gia phát quà Tết cho người nghèo',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
    deadline: '20/01/2025',
    location: 'TP.HCM',
    positions: 20,
    category: 'Tặng quà',
    slug: 'tuyen-tnv-tet-2025',
  },
  {
    id: 2,
    title: 'Tình nguyện viên hỗ trợ sự kiện gây quỹ',
    description: 'Tuyển TNV có kinh nghiệm tổ chức sự kiện để hỗ trợ chương trình gây quỹ',
    image: 'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg',
    deadline: '25/01/2025',
    location: 'Hà Nội',
    positions: 15,
    category: 'Gây quỹ',
    slug: 'tnv-ho-tro-su-kien',
  },
  {
    id: 3,
    title: 'Tình nguyện viên y tế cho chương trình khám bệnh',
    description: 'Cần tuyển bác sĩ, y tá tình nguyện cho chương trình khám bệnh miễn phí',
    image: 'https://images.pexels.com/photos/4226876/pexels-photo-4226876.jpeg',
    deadline: '30/01/2025',
    location: 'An Giang',
    positions: 10,
    category: 'Y tế',
    slug: 'tnv-y-te-kham-benh',
  },
];

const categories = ['Tất cả', 'Tặng quà', 'Gây quỹ', 'Y tế', 'Giáo dục', 'Công quả'];

const VolunteerCard: React.FC<{
  volunteer: IVolunteer;
  onPress: () => void;
}> = ({ volunteer, onPress }) => {
  return (
    <Card style={styles.volunteerCard} onPress={onPress}>
      <FastImage source={{ uri: volunteer.image }} style={styles.volunteerImage} />
      
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{volunteer.category}</Text>
      </View>

      <View style={styles.volunteerContent}>
        <Text style={styles.deadline}>Hạn đăng ký: {volunteer.deadline}</Text>
        <Text style={styles.volunteerTitle} numberOfLines={2}>{volunteer.title}</Text>
        <Text style={styles.volunteerDescription} numberOfLines={3}>
          {volunteer.description}
        </Text>
        
        <View style={styles.volunteerInfo}>
          <Text style={styles.infoText}>📍 {volunteer.location}</Text>
          <Text style={styles.infoText}>👥 Cần {volunteer.positions} TNV</Text>
        </View>

        <Button
          title="Xem chi tiết"
          onPress={onPress}
          variant="primary"
          size="sm"
          style={styles.detailButton}
        />
      </View>
    </Card>
  );
};

export const VolunteerScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [loading, setLoading] = useState(false);

  const filteredVolunteers = mockVolunteers.filter((volunteer) => {
    const matchesSearch = volunteer.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || volunteer.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tuyển tình nguyện viên</Text>
        <Text style={styles.subtitle}>
          Tham gia cùng chúng tôi để tạo ra những thay đổi tích cực
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm cơ hội tình nguyện..."
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

      {/* Volunteer Opportunities */}
      <ScrollView style={styles.volunteersList} showsVerticalScrollIndicator={false}>
        {filteredVolunteers.length > 0 ? (
          filteredVolunteers.map((volunteer) => (
            <VolunteerCard
              key={volunteer.id}
              volunteer={volunteer}
              onPress={() => {}}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>Không tìm thấy cơ hội tình nguyện</Text>
            <Text style={styles.emptyStateDescription}>
              Thử thay đổi bộ lọc để xem thêm cơ hội khác
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <Text style={styles.benefitsTitle}>Bạn sẽ nhận được gì?</Text>
        <View style={styles.benefitsList}>
          <Text style={styles.benefitItem}>🎓 Kinh nghiệm thực tế quý báu</Text>
          <Text style={styles.benefitItem}>🤝 Kết nối với cộng đồng</Text>
          <Text style={styles.benefitItem}>📜 Giấy chứng nhận tình nguyện</Text>
          <Text style={styles.benefitItem}>❤️ Cảm giác hạnh phúc khi giúp đỡ</Text>
        </View>
      </View>
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
  volunteersList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  volunteerCard: {
    marginBottom: Spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  volunteerImage: {
    width: '100%',
    height: 150,
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
  volunteerContent: {
    padding: Spacing.md,
  },
  deadline: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.accent[500],
    fontWeight: Typography.fontWeights.medium,
    marginBottom: Spacing.sm,
  },
  volunteerTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.neutral[900],
    marginBottom: Spacing.sm,
  },
  volunteerDescription: {
    fontSize: Typography.fontSizes.base,
    color: Colors.neutral[600],
    lineHeight: Typography.lineHeights.normal * Typography.fontSizes.base,
    marginBottom: Spacing.md,
  },
  volunteerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  infoText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[500],
  },
  detailButton: {
    marginTop: Spacing.sm,
  },
  emptyState: {
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
  benefitsSection: {
    backgroundColor: Colors.primary[50],
    padding: Spacing.lg,
    margin: Spacing.lg,
    borderRadius: 12,
  },
  benefitsTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary[800],
    marginBottom: Spacing.md,
  },
  benefitsList: {
    gap: Spacing.sm,
  },
  benefitItem: {
    fontSize: Typography.fontSizes.base,
    color: Colors.primary[700],
  },
});