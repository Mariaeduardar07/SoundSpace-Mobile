import React from "react";
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: 'blue', 
        tabBarInactiveTintColor: 'gray', 
        tabBarStyle: {
          backgroundColor: 'white', 
        },
      }}
    >
      <Tabs.Screen
        name="home" 
        options={{
          title: 'Home', 
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="list"
        options={{
          title: 'List', 
          tabBarIcon: ({ color }) => <Ionicons name="layers-outline" color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="add"
        options={{
          title: 'Add', 
          tabBarIcon: ({ color }) => <Ionicons name="add-circle-outline" color={color} size={24} />,
        }}
      />

      <Tabs.Screen
        name="favorites" 
        options={{
          title: 'Favorites', 
          tabBarIcon: ({ color }) => <Ionicons name="heart-outline" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}