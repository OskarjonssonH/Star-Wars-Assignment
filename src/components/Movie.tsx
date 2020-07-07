import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

// Type of passed down props
type Props = {
    movieTitle: string;
    releaseDate: string;
    characterLinks: string[];
    handleClickMovie: (characterLinks: string[], movieTitle: string) => void;
};

// Material UI styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '16px',
            [theme.breakpoints.down('md')]: {
                padding: '12px 4px'
            }
        },
        paper: {
            backgroundColor: theme.palette.secondary.main,
            height: 200,
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'relative',
            textAlign: 'center',
            [theme.breakpoints.down('md')]: {
                backgroundColor: theme.palette.primary.main,
                height: 150
            }
        },
        paperRadius: {
            borderRadius: 10,
            [theme.breakpoints.down('md')]: {
                borderRadius: 0
            }
        },
        releaseDate: {
            position: 'absolute',
            bottom: '10px',
            [theme.breakpoints.down('md')]: {
                bottom: '5px',
                right: '10px',
                fontSize: '16px'
            }
        }
    })
);

const Movie: React.FC<Props> = ({ handleClickMovie, movieTitle, releaseDate, characterLinks }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} lg={3} className={classes.root}>
            <Paper
                onClick={() => handleClickMovie(characterLinks, movieTitle)} // Returns character links of "clicked"/choosen movie and the title of the movie
                elevation={0}
                className={classes.paper}
                classes={{ root: classes.paperRadius }}
            >
                <Typography variant="h5">{movieTitle}</Typography>
                <Typography variant="h6" className={classes.releaseDate}>
                    {releaseDate}
                </Typography>
            </Paper>
        </Grid>
    );
};

export default Movie;
