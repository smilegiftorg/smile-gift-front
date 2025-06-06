import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Spacing } from '../constants/spacing';

const menuItems = [
  {
    id: 1,
    title: 'Thông tin cá nhân',
    icon: '👤',
    onPress: () => {},
  },
  {
    id: 2,
    title: 'Lịch sử tham gia',
    icon: '📋',
    onPress: () => {},
  },
  {
    id: 3,
    title: 'Chương trình đã đăng ký',
    icon: '📅',
    onPress: () => {},
  },
  {
    id: 4,
    title: 'Giấy chứng nhận',
    icon: '🏆',
    onPress: () => {},
  },
  {
    id: 5,
    title: 'Cài đặt thông báo',
    icon: '🔔',
    onPress: () => {},
  },
  {
    id: 6,
    title: 'Liên hệ hỗ trợ',
    icon: '💬',
    onPress: () => {},
  },
  {
    id: 7,
    title: 'Về Smile Gift',
    icon: 'ℹ️',
    onPress: () => {},
  },
];

export const ProfileScreen: React.FC = () => {
  const handleLogout = () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            // Handle logout
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <FastImage
            source={{
              uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
            }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Nguyễn Văn A</Text>
          <Text style={styles.userEmail}>nguyenvana@email.com</Text>
          
          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Chương trình</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>25</Text>
              <Text style={styles.statLabel}>Giờ tình nguyện</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Chứng nhận</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <Button
            title="Đăng ký TNV mới"
            onPress={() => {}}
            variant="primary"
            size="md"
            style={styles.quickActionButton}
          />
          <Button
            title="Xem chương trình"
            onPress={() => {}}
            variant="outline"
            size="md"
            style={styles.quickActionButton}
          />
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}>
              <View style={styles.menuItemLeft}>
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <Button
            title="Đăng xuất"
            onPress={handleLogout}
            variant="outline"
            size="lg"
            style={styles.logoutButton}
            textStyle={styles.logoutButtonText}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>Phiên bản 1.0.0</Text>
          <Text style={styles.copyright}>© 2025 CLB Thiện Nguyện Smile Gift</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  profileHeader: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.neutral[900],
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: Typography.fontSizes.base,
    color: Colors.neutral[600],
    marginBottom: Spacing.lg,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: Typography.fontSizes['2xl'],
    fontWeight: Typography.fontWeights.bold,
    color: Colors.primary[700],
  },
  statLabel: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.primary[600],
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.primary[200],
    marginHorizontal: Spacing.md,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  quickActionButton: {
    flex: 1,
  },
  menuSection: {
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    fontSize: Typography.fontSizes.xl,
    marginRight: Spacing.md,
  },
  menuTitle: {
    fontSize: Typography.fontSizes.base,
    color: Colors.neutral[900],
  },
  menuArrow: {
    fontSize: Typography.fontSizes.xl,
    color: Colors.neutral[400],
  },
  logoutSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.xl,
  },
  logoutButton: {
    borderColor: Colors.accent[500],
  },
  logoutButtonText: {
    color: Colors.accent[500],
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
  },
  appVersion: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[500],
    marginBottom: Spacing.xs,
  },
  copyright: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral[500],
    textAlign: 'center',
  },
});