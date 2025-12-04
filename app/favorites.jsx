import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const FavoritesScreen = () => {
  const [favoriteMusics, setFavoriteMusics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://localhost:4000/musics';

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);

      // Por enquanto, usando favoritos hardcoded
      // TODO: Integrar com AsyncStorage ou backend
      const favoriteIds = [1, 2]; // IDs de exemplo

      if (favoriteIds.length === 0) {
        setFavoriteMusics([]);
        setLoading(false);
        return;
      }

      // Buscar músicas da API
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar músicas');
      }

      const data = await response.json();

      // Filtrar apenas as favoritas
      const favorites = data
        .filter(music => favoriteIds.includes(music.id))
        .map(music => ({
          id: music.id,
          title: music.title || 'Sem título',
          description: music.description || '',
          url: music.url || '',
          rating: music.rating || 0,
          singer: music.singer,
          singerName: music.singer?.name || 'Artista Desconhecido',
          singerGenre: music.singer?.genre || 'Outros',
          singerPhoto: music.singer?.photoUrl || 'https://via.placeholder.com/60',
        }));

      setFavoriteMusics(favorites);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao carregar favoritos:', err);
      setError(err.message);
      setLoading(false);

      // Dados de exemplo
      const mockData = [
        {
          id: 1,
          title: 'Música Favorita 1',
          description: 'Descrição',
          url: '',
          rating: 5.0,
          singerName: 'Artista 1',
          singerGenre: 'Pop',
          singerPhoto: 'https://via.placeholder.com/60',
        },
      ];
      setFavoriteMusics(mockData);
    }
  };

  const removeFavorite = async (id) => {
    try {
      // Atualizar estado local
      setFavoriteMusics(prev => prev.filter(music => music.id !== id));
      // TODO: Integrar com AsyncStorage ou backend
    } catch (err) {
      console.error('Erro ao remover favorito:', err);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <ActivityIndicator size="large" color="#a0ff00" />
        <Text style={styles.loadingText}>Carregando favoritos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Header title="Favoritos" showBack={false} showMenu={true} />

      {error && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle-outline" size={16} color="#ff6b6b" />
          <Text style={styles.errorBannerText}>Usando dados de exemplo</Text>
        </View>
      )}

      {favoriteMusics.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <Ionicons name="heart-outline" size={80} color="#333" />
          </View>
          <Text style={styles.emptyTitle}>Nenhuma música favorita</Text>
          <Text style={styles.emptySubtitle}>
            Adicione músicas aos favoritos para vê-las aqui
          </Text>
        </View>
      ) : (
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.statsContainer}>
            <Ionicons name="heart" size={24} color="#a0ff00" />
            <Text style={styles.statsText}>
              {favoriteMusics.length} {favoriteMusics.length === 1 ? 'música favorita' : 'músicas favoritas'}
            </Text>
          </View>

          {favoriteMusics.map((music) => (
            <TouchableOpacity 
              key={music.id} 
              style={styles.musicCard}
              activeOpacity={0.7}
            >
              <View style={styles.albumArtContainer}>
                <Image source={{ uri: music.singerPhoto }} style={styles.albumArt} />
                <View style={styles.playOverlay}>
                  <Ionicons name="play" size={20} color="#fff" />
                </View>
              </View>
              
              <View style={styles.musicInfo}>
                <Text style={styles.musicTitle} numberOfLines={1}>
                  {music.title}
                </Text>
                <Text style={styles.artistName} numberOfLines={1}>
                  {music.singerName}
                </Text>
                <View style={styles.detailsRow}>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text style={styles.ratingText}>{music.rating.toFixed(1)}</Text>
                  </View>
                  <View style={styles.genreBadge}>
                    <Text style={styles.genreText}>{music.singerGenre}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => removeFavorite(music.id)}
                activeOpacity={0.7}
              >
                <Ionicons name="heart" size={24} color="#a0ff00" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    color: '#999',
    fontSize: 16,
    marginTop: 16,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a1a1a',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  errorBannerText: {
    color: '#ff6b6b',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a1a1a',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  statsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  musicCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#0a0a0a',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  albumArtContainer: {
    position: 'relative',
  },
  albumArt: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#333',
  },
  playOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
  },
  musicInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  musicTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 6,
  },
  artistName: {
    color: '#999',
    fontSize: 14,
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fbbf24',
    fontSize: 13,
    marginLeft: 4,
    fontWeight: '600',
  },
  genreBadge: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 10,
  },
  genreText: {
    color: '#666',
    fontSize: 11,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 12,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
  },
});

export default FavoritesScreen;
