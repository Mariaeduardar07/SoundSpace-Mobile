import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const BottomNav = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'home', icon: 'home', iconOutline: 'home-outline', path: '/' },
    { name: 'library', icon: 'library', iconOutline: 'library-outline', path: '/listagem' },
    { name: 'add', icon: 'add-circle', iconOutline: 'add-circle-outline', path: '/add' },
    { name: 'favorites', icon: 'heart', iconOutline: 'heart-outline', path: '/favorites' },
  ];

  const isActive = (path) => {
    // Verifica se é exatamente a rota ou se começa com a rota (mas não é a home)
    if (path === '/') {
      return pathname === '/';
    }
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          
          return (
            <TouchableOpacity
              key={item.name}
              style={styles.navButton}
              onPress={() => router.push(item.path)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={active ? item.icon : item.iconOutline}
                size={24}
                color={active ? '#a0ff00' : '#666'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#0a0a0a',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    paddingBottom: 20,
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  navButton: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomNav;
