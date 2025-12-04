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

const MusicListScreen = () => {
  const [musics, setMusics] = useState([]);
  const [filteredMusics, setFilteredMusics] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const API_URL = 'http://localhost:4000/musics';

  useEffect(() => {
    fetchMusics();
  }, []);

  const fetchMusics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Erro ao carregar músicas');
      }

      const data = await response.json();
      
      // Verifica se data é um array
      if (!Array.isArray(data)) {
        throw new Error('Formato de dados inválido');
      }
      
      // Mapeia conforme o schema Prisma
      const formattedMusics = data.map((music) => ({
        id: music.id,
        title: music.title || 'Sem título',
        description: music.description || '',
        url: music.url || '',
        rating: music.rating || 0,
        singer: music.singer,
        singerName: music.singer?.name || 'Artista Desconhecido',
        singerGenre: music.singer?.genre || 'Outros',
        singerPhoto: music.singer?.photoUrl || 'https://via.placeholder.com/50',
      }));

      setMusics(formattedMusics);
      setFilteredMusics(formattedMusics);
      setLoading(false);
    } catch (err) {
      console.error('Erro ao buscar músicas:', err);
      setError(err.message);
      setLoading(false);
      
      // Dados de exemplo para teste
      const mockData = [
        {
          id: 1,
          title: 'Exemplo de Música 1',
          description: 'Descrição da música',
          url: 'https://example.com/music1',
          rating: 4.5,
          singerName: 'Artista 1',
          singerGenre: 'Pop',
          singerPhoto: 'https://via.placeholder.com/50',
        },
        {
          id: 2,
          title: 'Exemplo de Música 2',
          description: 'Descrição da música',
          url: 'https://example.com/music2',
          rating: 4.0,
          singerName: 'Artista 2',
          singerGenre: 'Rock',
          singerPhoto: 'https://via.placeholder.com/50',
        },
      ];
      setMusics(mockData);
      setFilteredMusics(mockData);
    }
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const filterByGenre = (genre) => {
    setActiveFilter(genre);
    if (genre === 'All') {
      setFilteredMusics(musics);
    } else {
      const filtered = musics.filter((music) => music.singerGenre === genre);
      setFilteredMusics(filtered);
    }
  };

  // Extrai gêneros únicos das músicas
  const uniqueGenres = ['All', ...new Set(musics.map((music) => music.singerGenre))].slice(0, 5);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <ActivityIndicator size="large" color="#a0ff00" />
        <Text style={styles.loadingText}>Carregando músicas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      {/* Header */}
      <Header title="Músicas" showBack={true} showMenu={true} />

      {/* Mensagem de erro se houver */}
      {error && (
        <View style={styles.errorBanner}>
          <Ionicons name="alert-circle-outline" size={16} color="#ff6b6b" />
          <Text style={styles.errorBannerText}>Usando dados de exemplo</Text>
        </View>
      )}

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{musics.length}</Text>
          <Text style={styles.statLabel}>Músicas</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{uniqueGenres.length - 1}</Text>
          <Text style={styles.statLabel}>Gêneros</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{favorites.length}</Text>
          <Text style={styles.statLabel}>Favoritas</Text>
        </View>
      </View>

      {/* Filter Pills */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContentContainer}
      >
        {uniqueGenres.map((genre) => (
          <TouchableOpacity
            key={genre}
            style={[
              styles.filterPill,
              activeFilter === genre && styles.filterPillActive,
            ]}
            onPress={() => filterByGenre(genre)}
            activeOpacity={0.7}
          >
            <Text
              style={
                activeFilter === genre
                  ? styles.filterTextActive
                  : styles.filterText
              }
            >
              {genre}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Music List */}
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {filteredMusics.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="musical-notes-outline" size={64} color="#666" />
            <Text style={styles.emptyText}>Nenhuma música encontrada</Text>
          </View>
        ) : (
          filteredMusics.map((music) => (
            <TouchableOpacity 
              key={music.id} 
              style={styles.songItem}
              activeOpacity={0.7}
            >
              <View style={styles.albumArtContainer}>
                <Image source={{ uri: music.singerPhoto }} style={styles.albumArt} />
                <View style={styles.playOverlay}>
                  <Ionicons name="play" size={16} color="#fff" />
                </View>
              </View>
              <View style={styles.songInfo}>
                <Text style={styles.songTitle} numberOfLines={1}>
                  {music.title}
                </Text>
                <Text style={styles.artistName} numberOfLines={1}>
                  {music.singerName}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={12} color="#fbbf24" />
                  <Text style={styles.ratingText}>{music.rating.toFixed(1)}</Text>
                  <View style={styles.genreBadge}>
                    <Text style={styles.genreText}>{music.singerGenre}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => toggleFavorite(music.id)}
                style={styles.favoriteButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={favorites.includes(music.id) ? 'heart' : 'heart-outline'}
                  size={20}
                  color={favorites.includes(music.id) ? '#a0ff00' : '#666'}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Bottom Navigation */}
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 16,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#a0ff00',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#333',
  },
  filterContainer: {
    marginBottom: 15,
  },
  filterContentContainer: {
    paddingHorizontal: 20,
  },
  filterPill: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  filterPillActive: {
    backgroundColor: '#a0ff00',
    borderColor: '#a0ff00',
  },
  filterText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 16,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#0a0a0a',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#1a1a1a',
  },
  albumArtContainer: {
    position: 'relative',
  },
  albumArt: {
    width: 60,
    height: 60,
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
  songInfo: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  artistName: {
    color: '#999',
    fontSize: 13,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fbbf24',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
  },
  genreBadge: {
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  genreText: {
    color: '#666',
    fontSize: 10,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 10,
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
  },
});

export default MusicListScreen;