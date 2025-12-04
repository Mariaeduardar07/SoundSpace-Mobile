import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const AddMusicScreen = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    rating: '',
    singerName: '',
    singerGenre: '',
    singerBio: '',
    singerPhoto: '',
  });

  const genres = ['Pop', 'Rock', 'Jazz', 'Hip Hop', 'R&B', 'Eletrônica', 'Sertanejo', 'MPB'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Validação básica
    if (!formData.title || !formData.singerName) {
      Alert.alert('Erro', 'Preencha pelo menos o título e o nome do artista');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/musics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          url: formData.url,
          rating: parseFloat(formData.rating) || 0,
          singer: {
            name: formData.singerName,
            genre: formData.singerGenre,
            biography: formData.singerBio,
            photoUrl: formData.singerPhoto,
          },
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Música adicionada com sucesso!');
        // Limpar formulário
        setFormData({
          title: '',
          description: '',
          url: '',
          rating: '',
          singerName: '',
          singerGenre: '',
          singerBio: '',
          singerPhoto: '',
        });
      } else {
        Alert.alert('Erro', 'Não foi possível adicionar a música');
      }
    } catch (error) {
      console.error('Erro ao adicionar música:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao adicionar a música');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      
      <Header title="Adicionar Música" showBack={false} showMenu={false} />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Música</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Título *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da música"
              placeholderTextColor="#666"
              value={formData.title}
              onChangeText={(value) => handleInputChange('title', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição da música"
              placeholderTextColor="#666"
              multiline
              numberOfLines={3}
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>URL</Text>
            <TextInput
              style={styles.input}
              placeholder="https://example.com/music.mp3"
              placeholderTextColor="#666"
              value={formData.url}
              onChangeText={(value) => handleInputChange('url', value)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Avaliação (0-5)</Text>
            <TextInput
              style={styles.input}
              placeholder="4.5"
              placeholderTextColor="#666"
              keyboardType="decimal-pad"
              value={formData.rating}
              onChangeText={(value) => handleInputChange('rating', value)}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações do Artista</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome do Artista *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do cantor(a)"
              placeholderTextColor="#666"
              value={formData.singerName}
              onChangeText={(value) => handleInputChange('singerName', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gênero Musical</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={styles.genreContainer}
            >
              {genres.map((genre) => (
                <TouchableOpacity
                  key={genre}
                  style={[
                    styles.genreChip,
                    formData.singerGenre === genre && styles.genreChipActive,
                  ]}
                  onPress={() => handleInputChange('singerGenre', genre)}
                >
                  <Text
                    style={[
                      styles.genreChipText,
                      formData.singerGenre === genre && styles.genreChipTextActive,
                    ]}
                  >
                    {genre}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Biografia</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Biografia do artista"
              placeholderTextColor="#666"
              multiline
              numberOfLines={3}
              value={formData.singerBio}
              onChangeText={(value) => handleInputChange('singerBio', value)}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Foto (URL)</Text>
            <TextInput
              style={styles.input}
              placeholder="https://example.com/photo.jpg"
              placeholderTextColor="#666"
              value={formData.singerPhoto}
              onChangeText={(value) => handleInputChange('singerPhoto', value)}
              autoCapitalize="none"
            />
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Ionicons name="musical-note" size={24} color="#000" />
          <Text style={styles.submitButtonText}>Adicionar Música</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#2a2a2a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  genreContainer: {
    marginTop: 8,
  },
  genreChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  genreChipActive: {
    backgroundColor: '#a0ff00',
    borderColor: '#a0ff00',
  },
  genreChipText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
  genreChipTextActive: {
    color: '#000',
    fontWeight: '700',
  },
  submitButton: {
    backgroundColor: '#a0ff00',
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 10,
  },
});

export default AddMusicScreen;
