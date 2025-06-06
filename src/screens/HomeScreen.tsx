import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { Button } from '../components/ui/Button';
import { ProgramCard } from '../components/ProgramCard';
import { ArticleCard } from '../components/ArticleCard';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';
import { IProgram, IArticle } from '../types';

const { width, height } = Dimensions.get('window');

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
];

const mockArticles: IArticle[] = [
  {
    id: 1,
    title: 'Hành trình thiện nguyện đầy ý nghĩa',
    description: 'Chia sẻ về những trải nghiệm đáng nhớ trong các chuyến thiện nguyện',
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
];

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <FastImage
            source={{
              uri: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg',
            }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['rgba(25, 73, 35, 0.8)', 'rgba(25, 73, 35, 0.6)']}
            style={styles.heroOverlay}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroSubtitle}>CLB Thiện Nguyện</Text>
            <Text style={styles.heroTitle}>Smile Gift</Text>
            <Text style={styles.heroDescription}>
              Kết nối nghệ thuật và lòng nhân ái - Nơi tập hợp những bạn trẻ yêu thích nghệ thuật
            </Text>
            <View style={styles.heroButtons}>
              <Button
                title="Tham gia ngay"
                onPress={() => {}}
                variant="secondary"
                size="lg"
              />
              <Button
                title="Tìm hiểu thêm"
                onPress={() => {}}
                variant="outline"
                size="lg"
                style={styles.outlineButton}
                textStyle={styles.outlineButtonText}
              />
            </View>
          </View>
        </View>

        {/* Impact Stats */}
        <View style={styles.statsContainer}>
          <LinearGradient
            colors={[Colors.primary[800], Colors.primary[700]]}
            style={styles.statsGradient}
          />
          <Text style={styles.statsTitle}>Tác động của chúng tôi</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>500+</Text>
              <Text style={styles.statLabel}>Tình nguyện viên</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>50+</Text>
              <Text style={styles.statLabel}>Chương trình</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2000+</Text>
              <Text style={styles.statLabel}>Người thụ hưởng</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5+</Text>
              <Text style={styles.statLabel}>Năm hoạt động</Text>
            </View>
          </View>
        </View>

        {/* Featured Programs */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chương trình nổi bật</Text>
            <Button
              title="Xem tất cả"
              onPress={() => {}}
              variant="outline"
              size="sm"
            />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mockPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                onPress={() => {}}
                onRegister={() => {}}
              />
            ))}
          </ScrollView>
        </View>

        {/* Latest News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tin tức mới nhất</Text>
            <Button
              title="Xem tất cả"
              onPress={() => {}}
              variant="outline"
              size="sm"
            />
          </View>
          <View style={styles.articlesGrid}>
            {mockArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onPress={() => {}}
              />
            ))}
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaContainer}>
          <LinearGradient
            colors={[Colors.primary[700], Colors.primary[600]]}
            style={styles.ctaGradient}
          />
          <Text style={styles.ctaTitle}>Tham gia cùng chúng tôi</Text>
          <Text style={styles.ctaDescription}>
            Hãy cùng chúng tôi tạo ra những thay đổi tích cực cho cộng đồng
          </Text>
          <View style={styles.ctaButtons}>
            <Button
              title="Đăng ký TNV"
              onPress={() => {}}
              variant="secondary"
              size="lg"
              style={styles.ctaButton}
            />
            <Button
              title="Quyên góp"
              onPress={() => {}}
              variant="outline"
              size="lg"
              style={[styles.ctaButton, styles.ctaOutlineButton]}
              textStyle={styles.ctaOutlineButtonText}
            />
          </View>
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
  heroContainer: {
    height: height * 0.6,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    position: 'absolute',
    bottom: Spacing['3xl'],
    left: Spacing.lg,
    right: Spacing.lg,
  },
  heroSubtitle: {
    fontSize: Typography.fontSizes.base,
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  heroTitle: {
    fontSize: Typography.fontSizes['5xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.white,
    marginBottom: Spacing.md,
  },
  heroDescription: {
    fontSize: Typography.fontSizes.lg,
    color: Colors.white,
    lineHeight: Typography.lineHeights.relaxed * Typography.fontSizes.lg,
    marginBottom: Spacing.xl,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  outlineButton: {
    borderColor: Colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  outlineButtonText: {
    color: Colors.white,
  },
  statsContainer: {
    position: 'relative',
    paddingVertical: Spacing['3xl'],
  },
  statsGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  statsTitle: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
  },
  statItem: {
    alignItems: 'center',
    width: '45%',
    marginBottom: Spacing.lg,
  },
  statValue: {
    fontSize: Typography.fontSizes['4xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.white,
  },
  statLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[200],
  },
  section: {
    paddingVertical: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.neutral[900],
  },
  articlesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
  },
  ctaContainer: {
    position: 'relative',
    paddingVertical: Spacing['3xl'],
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
  },
  ctaGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ctaTitle: {
    fontSize: Typography.fontSizes['3xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  ctaDescription: {
    fontSize: Typography.fontSizes.lg,
    color: Colors.white,
    textAlign: 'center',
    lineHeight: Typography.lineHeights.relaxed * Typography.fontSizes.lg,
    marginBottom: Spacing.xl,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  ctaButton: {
    flex: 1,
  },
  ctaOutlineButton: {
    borderColor: Colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  ctaOutlineButtonText: {
    color: Colors.white,
  },
});