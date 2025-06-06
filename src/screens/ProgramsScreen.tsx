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
import { ProgramCard } from '../components/ProgramCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { IProgram } from '../types';

// Mock data
const mockPrograms: IProgram[] = [
  {
    id: 1,
    title: 'Công quả ở Tổ Đình Phật Bửu',
    description: 'Hoạt động thiện nguyện tại chùa, phát cơm từ thiện cho người nghèo',
    image: 'https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg',
    date: '15/03/2025',
    location: 'TP.HCM',
    status: 'upcoming',
    category: 'Công quả',
    slug: 'cong-qua-to-dinh-phat-buu',
    maxAttendees: 50,
  },
  {
    id: 2,
    title: 'Đêm nhạc gây quỹ "ĐÊM"',
    description: 'Chương trình gây quỹ thông qua âm nhạc để hỗ trợ trẻ em vùng cao',
    image: 'https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg',
    date: '20/03/2025',
    location: 'Hà Nội',
    status: 'completed',
    category: 'Gây quỹ',
    slug: 'dem-nhac-gay-quy',
    volunteersParticipated: 25,
    beneficiaries: 100,
  },
  {
    id: 3,
    title: 'Tặng quà Tết cho người vô gia cư',
    description: 'Mang Tết ấm áp đến với những người vô gia cư tại TP.HCM',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
    date: '25/01/2025',
    location: 'TP.HCM',
    status: 'upcoming',
    category: 'Tặng quà',
    slug: 'tang-qua-tet',
    maxAttendees: 30,
  },
];

const categories = ['Tất cả', 'Công quả', 'Gây quỹ', 'Tặng quà', 'Y tế', 'Giáo dục'];
const statuses = ['Tất cả', 'Sắp diễn ra', 'Đã hoàn thành'];

export const ProgramsScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedStatus, setSelectedStatus] = useState('Tất cả');
  const [loading, setLoading] = useState(false);

  const filteredPrograms = mockPrograms.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || program.category === selectedCategory;
    const matchesStatus = selectedStatus === 'Tất cả' || 
      (selectedStatus === 'Sắp diễn ra' && program.status === 'upcoming') ||
      (selectedStatus === 'Đã hoàn thành' && program.status === 'completed');
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chương trình thiện nguyện</Text>
        <Text style={styles.subtitle}>
          Khám phá và tham gia các hoạt động ý nghĩa
        </Text>
      </View>

      {/* Search and Filters */}
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm chương trình..."
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

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow}>
          {statuses.map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterChip,
                selectedStatus === status && styles.filterChipActive,
              ]}
              onPress={() => setSelectedStatus(status)}>
              <Text
                style={[
                  styles.filterChipText,
                  selectedStatus === status && styles.filterChipTextActive,
                ]}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Programs List */}
      <ScrollView style={styles.programsList} showsVerticalScrollIndicator={false}>
        {filteredPrograms.length > 0 ? (
          filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              onPress={() => {}}
              onRegister={() => {}}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>Không tìm thấy chương trình</Text>
            <Text style={styles.emptyStateDescription}>
              Thử thay đổi bộ lọc để xem thêm chương trình khác
            </Text>
          </View>
        )}
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
  programsList: {
    flex: 1,
    paddingHorizontal: Spacing.md,
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
});