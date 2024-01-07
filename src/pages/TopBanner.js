import React, {Fragment} from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TopBanner = (props) => {

    return (
        <Fragment>
            <Box border={1} sx={{
                width: '100%',
                height: 60,
                mb: 3, mt: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContents: "center",
                borderTop: '0px',
                borderLeft: '0px',
                borderRight: '0px',
                borderColor: 'white'
                    }} >
            <Typography variant='h6' sx={{
                fontFamily: "Lilita One",
                fontWeight: 'bold',
                fontSize: '25px',
                color: 'white'
            }}>
                JPearson Wordle
            </Typography>
            </Box>
        </Fragment>
    )
}

export default TopBanner;