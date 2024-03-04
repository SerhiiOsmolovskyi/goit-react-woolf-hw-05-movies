import { useEffect } from 'react';
import { fetchMoviesByQuery } from 'service/theMovieDbApi';
import { useState } from 'react';
import MovieList from 'components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import styles from './Movies.module.css';

const Movies = () => {
  const [movies, setMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const handleSubmit = event => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    if (!query) return;
    setSearchParams({ query });
  };

  useEffect(() => {
    const fn = async () => {
      if (!query) return;
      try {
        const result = await fetchMoviesByQuery(query);
        setMovies(result);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fn();
  }, [query]);
  return (
    <div className={styles.moviesСontainer}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
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
      </form>
      {movies && <MovieList movies={movies} />}
    </div>
  );
};
export default Movies;
