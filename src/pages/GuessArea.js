import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { Grid } from "@mui/material";

const config = {
    numBoxesPerRow: 5,
    numRows: 6,
    widthOfABox: 60,
    heightOfABox: 60,
    gapBetweenBoxes: 10,
    initialBackgroundColor: '#d3d6da'
};

const LetterBox = (props) => {
    // Represent a box into which a letter may be displayed.
    // In this version, we display the value of "index"
    // in the box.

    const { value } = props;
    const { backgroundColor, letter } = value;
    return (
        <Box
            style={{
                maxWidth: config.widthOfABox, maxHeight: config.heightOfABox,
                minWidth: config.widthOfABox, minHeight: config.heightOfABox,
                fontFamily: "nyt-franklin",
                fontWeight: 'bold',
                fontSize: '25px',
                color: 'white'
            }}
            sx={{
                border: 1,
                borderColor: 'black',
                backgroundColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            {letter}
        </Box>
    )
}

const GuessArea = (props) => {

    const { activeRow } = props;

    return (
        <Fragment>
            <Box sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContents: "center",
            }} >
                <Grid container columns={config.numBoxesPerRow}
                    sx={{
                        width: config.numBoxesPerRow * config.widthOfABox +
                            (config.numBoxesPerRow - 1) * config.gapBetweenBoxes,

                    }}
                >
                    {
                        activeRow.map((elementAttributes, idx) =>
                            <Grid item
                                key={idx}
                                xs={1}
                                sx={{ mb: 0.8 }}
                            >
                                <LetterBox index={idx} value={elementAttributes} />
                            </Grid>
                        )
                    }
                </Grid>
            </Box>
        </Fragment>
    )
}

export default GuessArea;