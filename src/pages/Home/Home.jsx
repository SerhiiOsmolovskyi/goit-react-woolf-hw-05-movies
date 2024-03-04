import { useEffect } from 'react';
import { fecthTrendingMovies } from 'service/theMovieDbApi';
import { useState } from 'react';
import MovieList from 'components/MovieList/MovieList';
import styles from './Home.module.css';

const Home = () => {
  const [movies, setMovies] = useState(null);
  useEffect(() => {
    const fn = async () => {
      try {
        const result = await fecthTrendingMovies();
        setMovies(result);
      } catch (error) {
        console.log(error.message);
      } finally {
      }
    };
    fn();
  }, []);
  return (
    <div className={styles.homeContainer}>
      {movies && <MovieList movies={movies} />}
    </div>
  );
};
export default Home;
