import { StatusBar } from 'react-native';
import { StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import COLORS from '../constants/Colors';
import Fonts from '../constants/Fonts';
import GenreCard from '../components/GenreCard';
import ItemSeparator from '../components/ItemSeparator';
import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

import {
  getNewPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
} from '../services/MovieService';

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = ({ navigation }) => {
  const [activeGenre, setActiveGenre] = useState('All');
  const [nowPlayingMovies, setNowPlayingMovies] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([{ id: 10110, name: 'All' }]);

  useEffect(() => {
    getNewPlayingMovies().then((movieResponse) => {
      setNowPlayingMovies(movieResponse.data);
    });
    getUpcomingMovies().then((movieResponse) => {
      setUpcomingMovies(movieResponse.data);
    });
    getAllGenres().then((genreResponse) => {
      setGenres([...genres, ...genreResponse.data.genres]);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style='auto' translucent={false} />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>

      <View style={styles.genreListContainer}>
        <FlatList
          data={genres}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <GenreCard
              genreName={item.name}
              active={item.name === activeGenre}
              onPress={() => setActiveGenre(item.name)}
            />
          )}
        />
      </View>

      <View>
        <FlatList
          data={nowPlayingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              onPress={() => navigation.navigate('movie', { movieId: item.id })}
            />
          )}
        />
      </View>

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>

      <View>
        <FlatList
          data={upcomingMovies.results}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.6}
              onPress={() => navigation.navigate('movie', { movieId: item.id })}
            />
          )}
        />
      </View>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily:Fonts.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: COLORS.ACTIVE,
    fontFamily:Fonts.BOLD,
  },
  genreListContainer:{
    paddingVertical:10,

  }
});

export default HomeScreen;