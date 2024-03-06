import { useEffect } from 'react';
import { fetchMoviesByQuery } from 'service/theMovieDbApi';
import { useState } from 'react';
import MovieList from 'components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import styles from './Movies.module.css';
import SearchForm from 'components/SearchForm/SearchFrom';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   const query = event.target.elements.searchQuery.value.trim();
  //   if (!query) return;
  //   setSearchParams({ query });
  // };

  useEffect(() => {
    const fetchMoviesByQueryData = async () => {
      if (!query) return;
      try {
        const result = await fetchMoviesByQuery(query);
        setMovies(result);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMoviesByQueryData();
  }, [query]);
  return (
    <div className={styles.moviesСontainer}>
      {/* <form onSubmit={handleSubmit} className={styles.searchForm}>
        <label htmlFor="searchQuery">
          <input
            type="text"
            name="searchQuery"
            id="searchQuery"
            className={styles.searchInput}
            defaultValue={query}
            placeholder="Search for movies..."
          />
        </label>
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form> */}
      <SearchForm />
      {movies && <MovieList movies={movies} />}
    </div>
  );
};
export default Movies;
