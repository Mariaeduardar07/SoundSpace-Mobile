import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar 
} from "react-native";
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';

export default function Home() {
  const router = useRouter();
  const categories = ["All", "New Release", "Trending", "Top"];
  
  const newReleases = [
    { id: 1, color: "#c084fc" },
    { id: 2, color: "#c084fc" },
    { id: 3, color: "#d8b4fe" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>🔍</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Text style={styles.iconText}>❤️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Greeting */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hi, User</Text>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryBadge,
                index === 0 ? styles.categoryBadgeActive : styles.categoryBadgeInactive
              ]}
            >
              <Text style={[
                styles.categoryText,
                index === 0 ? styles.categoryTextActive : styles.categoryTextInactive
              ]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured New Release */}
        <View style={styles.featuredContainer}>
          <Text style={styles.sectionTitle}>New Release</Text>
          <View style={styles.featuredCard}>
            <View style={styles.featuredHeader}>
              <View>
                <Text style={styles.featuredTitle}>New Release</Text>
                <Text style={styles.featuredSubtitle}>New Release</Text>
              </View>
            </View>
            
            <View style={styles.featuredActions}>
              <TouchableOpacity style={styles.playButtonLarge}>
                <Text style={styles.playIcon}>▶</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>⬇</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Text style={styles.actionIcon}>⋯</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* New Release Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.gridHeader}>
            <Text style={styles.sectionTitle}>New Release</Text>
            <TouchableOpacity onPress={() => router.push('/listagem')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.grid}>
            {newReleases.map((release) => (
              <View key={release.id} style={styles.gridItem}>
                <View style={[styles.gridItemCard, { backgroundColor: release.color }]} />
                <TouchableOpacity style={styles.playButtonSmall}>
                  <Text style={styles.playIconSmall}>▶</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Spacer for bottom navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9333ea',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#18181b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 16,
  },
  greetingContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greetingText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryBadgeActive: {
    backgroundColor: '#bef264',
  },
  categoryBadgeInactive: {
    backgroundColor: '#18181b',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#000000',
  },
  categoryTextInactive: {
    color: '#ffffff',
  },
  featuredContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    paddingBottom: 12,
  },
  featuredCard: {
    backgroundColor: '#d8b4fe',
    borderRadius: 24,
    padding: 20,
  },
  featuredHeader: {
    marginBottom: 32,
  },
  featuredTitle: {
    fontSize: 18,
    color: '#000000',
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.7)',
  },
  featuredActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  playButtonLarge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 2,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    color: '#000000',
    fontSize: 20,
  },
  gridContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  gridHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#a1a1aa',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '48%',
    position: 'relative',
  },
  gridItemCard: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 24,
  },
  playButtonSmall: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconSmall: {
    color: '#ffffff',
    fontSize: 12,
    marginLeft: 2,
  },
  bottomSpacer: {
    height: 140,
  },
});