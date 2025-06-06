import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from '../screens/HomeScreen';
import { ProgramsScreen } from '../screens/ProgramsScreen';
import { NewsScreen } from '../screens/NewsScreen';
import { VolunteerScreen } from '../screens/VolunteerScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Programs':
              iconName = 'event';
              break;
            case 'News':
              iconName = 'article';
              break;
            case 'Volunteer':
              iconName = 'volunteer-activism';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary[700],
        tabBarInactiveTintColor: Colors.neutral[500],
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.neutral[200],
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: Typography.fontSizes.xs,
          fontWeight: Typography.fontWeights.medium,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Trang chủ',
        }}
      />
      <Tab.Screen
        name="Programs"
        component={ProgramsScreen}
        options={{
          tabBarLabel: 'Chương trình',
        }}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarLabel: 'Tin tức',
        }}
      />
      <Tab.Screen
        name="Volunteer"
        component={VolunteerScreen}
        options={{
          tabBarLabel: 'Tình nguyện',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Cá nhân',
        }}
      />
    </Tab.Navigator>
  );
};