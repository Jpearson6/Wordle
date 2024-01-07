import React, { Fragment } from 'react';
import { Alert, Box, Typography } from '@mui/material';

const MessageCenter = (props) => {

    const { messageString } = props;

    return (
        <Fragment>
            <Box >
                {
                    messageString.length > 0 &&
                    <Alert severity={"error"} icon={false} duration={5000}
                        sx={{
                            position: 'fixed',
                            top: "10%",
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            zIndex: 9999,
                            width: '105px', // Adjust the width as needed,
                            height: '36px',
                            backgroundColor: "white",
                            justifyContent: "center"
                        }}>
                        <Typography variant='h6' sx={{
                            fontFamily: "Lilita One",
                            fontWeight: "bold",
                            fontSize: '13px',
                            color: 'black'
                        }}>
                            {messageString}
                        </Typography>
                    </Alert>
                }

            </Box>
        </Fragment>
    )
}

export default MessageCenter;