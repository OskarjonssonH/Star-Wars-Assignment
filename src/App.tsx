import React, { useEffect, useState } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';

import Movie from './components/Movie';
import Spinner from './components/Spinner';
import MovieDetailModal from './components/MovieDetailModal/index';

// Movie type
type Movie = {
    title: string;
    release_date: string;
    characters: string[];
};

// API call type
type Results = {
    count: number;
    next?: string;
    previous?: null;
    results: Movie[];
};

type Props = {};

// Material UI styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            minHeight: '100vh',
            padding: '40px 150px',
            backgroundColor: theme.palette.primary.main,
            width: '100%',
            margin: 0,
            [theme.breakpoints.down('md')]: {
                padding: '40px 10px',
                backgroundColor: theme.palette.secondary.main
            }
        },
        spinner: {
            margin: '0 auto',
            color: 'white'
        }
    })
);

const App: React.FC<Props> = () => {
    const classes = useStyles();

    const [isOpen, setIsOpen] = React.useState<boolean>(false); // Controls if the modal is open or not
    const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state - If true spinner will show

    const [movieDetailtTitle, setMovieDetailTitle] = useState<string>(''); // Title for the MovieDetailModal

    const [movies, setMovies] = useState<Movie[]>([]); // Movies from API
    const [characterLinks, setCharacterLinks] = useState<string[]>([]); // Links of each character from "clicked"/choosen movie

    const URL_FILMS = 'https://swapi.dev/api/films'; // URL to get movies from API

    useEffect(() => {
        // This useEffect will only run once when the component is mounting as we only want to request the API once.
        const getMovies = async () => {
            setIsLoading(true); // Sets loading state to true

            try {
                const moviesResult = await axios.get<Results>(URL_FILMS); // request is awaited - the function awaits this to finish before moving on

                const sortedMoviesByDate = moviesResult.data.results.sort((a, b) => {
                    // Sorts the movies by date in chronological order
                    let date1 = new Date(a.release_date).getTime();
                    let date2 = new Date(b.release_date).getTime();
                    return date1 - date2;
                });

                setMovies(sortedMoviesByDate); // Set the sorted movies
            } catch (error) {
                throw new Error(error); // If the request fails an error is thrown
            }

            setIsLoading(false); // Function is now done and the loading state is set to false
        };

        getMovies();
    }, []);

    const handleClickMovie = (characterLinks: string[], movieTitle: string) => {
        setCharacterLinks(characterLinks); // Gets the links to all characters from a "clicked"/choosen movie
        setMovieDetailTitle(movieTitle); // Gets the title of the movie from a "clicked"/choosen movie
        setIsOpen(true); // Opens the modal
    };

    const handleCloseModal = () => {
        setIsOpen(false); // Closes the modal
    };

    return (
        <Grid container alignContent="center" className={classes.root}>
            {!isLoading && movies ? (
                // If loading state is false and the swapi request was successful the movies will render
                movies.map(movie => (
                    <Movie
                        key={movie.title}
                        movieTitle={movie.title}
                        characterLinks={movie.characters}
                        releaseDate={movie.release_date}
                        handleClickMovie={handleClickMovie}
                    />
                ))
            ) : (
                <Spinner className={classes.spinner} /> // If loading state is true spinner will show
            )}

            <MovieDetailModal
                isOpen={isOpen}
                movieDetailTitle={movieDetailtTitle}
                characterLinks={characterLinks}
                handleCloseModal={handleCloseModal}
            />
        </Grid>
    );
};

export default App;
