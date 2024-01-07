import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Button } from "@mui/material";

const config = {
    widthOfABox: 43,
    heightOfABox: 58,
    widthOfButtons: 65,
    initialBackgroundColor: '#919191'
};

const LetterBox = (props) => {
    // Represent a box into which a letter may be displayed.
    // In this version, we display the value of "letter"
    // in the box.

    const { value, changeLetterCallBack } = props;

    return (
        <Button
            key={value['letter']}
            style={{
                maxWidth: config.widthOfABox, maxHeight: config.heightOfABox,
                minWidth: config.widthOfABox, minHeight: config.heightOfABox,
                fontFamily: "nyt-franklin",
                fontWeight: 'bold',
                fontSize: '25px'
            }}
            sx={{
                color: 'white',
                backgroundColor: value['backgroundColor'],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
            }}
            onClick={() => changeLetterCallBack(value['letter'])}
        >
            {value['letter']}
        </Button>
    )
}


const Keyboard = (props) => {

    const { changeLetterCallBack, backSpaceButtonCallback, enterButtonCallback } = props;
    const { keyboard } = props;

    return (
        keyboard.length > 0 &&
        <Fragment>
            <Box className='keyboard-area'
                sx={{
                    maxWidth: 500,
                    width: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',

                }}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} mb={1}>
                    {
                        keyboard[0].map((elementAttributes) =>
                            <LetterBox key={elementAttributes['letter']} value={elementAttributes} changeLetterCallBack={(elementAttributes) => changeLetterCallBack(elementAttributes)} />
                        )
                    }
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} mb={1}>
                    {
                        keyboard[1].map((elementAttributes) =>
                            <LetterBox key={elementAttributes['letter']} value={elementAttributes} changeLetterCallBack={(elementAttributes) => changeLetterCallBack(elementAttributes)} />
                        )
                    }
                </Box>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} mb={1}>
                    <Button
                        key={'Enter'}
                        onClick={() => enterButtonCallback()}
                        style={{
                            maxWidth: config.widthOfButtons, maxHeight: config.heightOfABox,
                            minWidth: config.widthOfButtons, minHeight: config.heightOfABox,
                            fontFamily: "nyt-franklin",
                            fontWeight: 'bold',
                            fontSize: '15px'
                        }}
                        sx={{
                            color: 'white',
                            backgroundColor: config.initialBackgroundColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1
                        }}>
                        Enter
                    </Button>
                    {
                        keyboard[2].map((elementAttributes) =>
                            <LetterBox key={elementAttributes['letter']} value={elementAttributes} changeLetterCallBack={(elementAttributes) => changeLetterCallBack(elementAttributes)} />
                        )
                    }
                    <Button
                        key={'Back'}
                        onClick={() => backSpaceButtonCallback()}
                        style={{
                            maxWidth: config.widthOfButtons, maxHeight: config.heightOfABox,
                            minWidth: config.widthOfButtons, minHeight: config.heightOfABox
                        }}
                        sx={{
                            color: 'white',
                            backgroundColor: config.initialBackgroundColor,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 1
                        }}>
                        <BackspaceIcon />
                    </Button>
                </Box>
            </Box>
        </Fragment>
    )
}

export default Keyboard;