import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { Typography, List, ListItem, Dialog } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Spinner from '../Spinner';
import MovieDetailContent from './MovieDetailContent';

// Type of character from API
type Character = {
    name: string;
};

// Type of passed down props
type Props = {
    isOpen: boolean;
    characterLinks: string[];
    movieDetailTitle: string;
    handleCloseModal: () => void;
};

// Material UI styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 0,
            minHeight: 500,
            [theme.breakpoints.down('md')]: {
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                maxHeight: 'none',
                padding: 0,
                margin: 0
            }
        },
        list: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px 0',
            alignContent: 'flex-start',
            flexWrap: 'wrap',
            height: '400px',
            width: '100%',
            [theme.breakpoints.down('md')]: {
                height: 'auto !important' // !important is not really to prefer
            }
        },
        listItem: {
            width: '33%',
            height: '40px',
            backgroundColor: 'transparent',
            border: '1px solid white',
            padding: 0,
            [theme.breakpoints.down('md')]: {
                width: '100%'
            }
        },
        spinner: {
            margin: 'auto 0',
            alignSelf: 'center'
        }
    })
);

const MovieDetailModal: React.FC<Props> = ({ handleCloseModal, isOpen, characterLinks, movieDetailTitle }) => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false); // Loading state - If true spinner will show
    const [characters, setCharacters] = useState<string[]>([]); // Characters from API

    // This useEffect will run when characterLinks is changed/updated as characterLinks is a dependency
    // This will avoid making an unnecessary request if the same movie is clicked right after
    useEffect(() => {
        const getCharacters = async () => {
            setIsLoading(true); // Sets loading state to true
            try {
                // Because characters was an array of links the best practise is to use Promise.All()
                // The way the Swapi API was designed is poor. Getting characters like this is not good for performance.
                const charactersResult = await Promise.all(
                    characterLinks.map(async characterLink => {
                        const characterResult = await axios.get<Character>(characterLink);
                        return characterResult.data.name;
                    })
                );
                setCharacters(charactersResult); // Sets characters
            } catch (error) {
                throw new Error(error); // If the request fails an error is thrown
            }
            setIsLoading(false); // Function is now done and the loading state is set to false
        };

        getCharacters();
    }, [characterLinks]);

    return (
        <Dialog
            maxWidth="md"
            fullWidth
            PaperProps={{
                classes: { root: classes.root }
            }}
            className={classes.root}
            onClose={handleCloseModal}
            open={isOpen} // If true dialog is open
        >
            {isLoading ? ( // If loading state is true show spinner - if not show MovieDetailContent
                <Spinner className={classes.spinner} />
            ) : (
                <MovieDetailContent movieDetailTitle={movieDetailTitle} handleCloseModal={handleCloseModal}>
                    <List
                        className={classes.list}
                        style={characterLinks && characterLinks.length > 30 ? { height: '600px' } : {}}
                    >
                        {characters.map((
                            character // Maps out all of the characters
                        ) => (
                            <ListItem key={character} className={classes.listItem}>
                                <Typography variant="body1">{character}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </MovieDetailContent>
            )}
        </Dialog>
    );
};

export default MovieDetailModal;
