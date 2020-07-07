import React from 'react';
import { CircularProgress } from '@material-ui/core';

type Props = { className?: string };

// Spinner is shown when loading state is true
// Takes in className as prop so that it becomes reusable to different scenarios
const Spinner: React.FC<Props> = ({ className }) => {
    return <CircularProgress className={className} />;
};

export default Spinner;
