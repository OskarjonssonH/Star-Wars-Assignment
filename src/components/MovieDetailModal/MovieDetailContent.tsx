import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, DialogTitle, DialogContent, Hidden, Button } from '@material-ui/core';

// Type of passed down props
type Props = { movieDetailTitle: string; handleCloseModal: () => void };

// Material UI styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '25px',
            paddingBottom: '40px',
            '& h4': {
                [theme.breakpoints.down('md')]: {
                    order: 2,
                    flexDirection: 'column',
                    alignItems: 'flex-start'
                }
            },
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                alignItems: 'flex-start'
            }
        },
        content: {
            overflowY: 'visible'
        },
        closeButton: {
            textTransform: 'capitalize',
            [theme.breakpoints.down('md')]: {
                order: 1,
                alignSelf: 'flex-end'
            }
        }
    })
);

const MovieDetailContent: React.FC<Props> = ({ movieDetailTitle, handleCloseModal, children }) => {
    const classes = useStyles();
    return (
        <>
            <DialogTitle disableTypography className={classes.title}>
                <Typography variant="h4">{movieDetailTitle}</Typography>
                <Button onClick={handleCloseModal} className={classes.closeButton}>
                    Close
                </Button>
            </DialogTitle>
            <DialogContent classes={{ root: classes.content }}>
                {/* Characters title hidden mdDown */}
                <Hidden mdDown>
                    <Typography variant="h5">Characters</Typography>
                </Hidden>
                {/* Takes in other components as children */}
                {children}
            </DialogContent>
        </>
    );
};

export default MovieDetailContent;
