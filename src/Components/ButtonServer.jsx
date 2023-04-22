import { Button } from '@mui/material'
import StorageIcon from '@mui/icons-material/Storage';
import React from 'react'

const ButtonServer = ({ image }) => {
    const handleFetch = async () => {
        if (!image) {
            return;
        }
        const canvas = image.getCanvas();
        const imageData = canvas.toDataURL('image/png');
        const response = await fetch('adresss', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image: imageData
            })
        });
        const data = await response.json()
        console.log(data);
    }
    return (
        <Button variant='contained' color='primary' onClick={handleFetch} startIcon={<StorageIcon />} sx={{ mt: 1, fontWeight: 'bold', letterSpacing: '2px' }}>
            Send
        </Button>
    )
}

export default ButtonServer