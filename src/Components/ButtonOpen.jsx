import { Button } from '@mui/material'
import React from 'react'
import OpenWithIcon from '@mui/icons-material/OpenWith';

export const ButtonOpen = ({image}) => {
    const handleOpen = () => {
        if (!image) {
            return;
        }
        const canvas = image.getCanvas();
        const imageData = canvas.toDataURL('image/png');
        const newWindow = window.open();
        newWindow.document.write(`<img src="${imageData}" alt="Cropped Image" />`);
      };
    return (
        <Button variant='contained' color='primary' onClick={handleOpen} startIcon={<OpenWithIcon />} sx={{ mt: 1, fontWeight: 'bold', letterSpacing: '2px' }}>
            Open
        </Button>
    )
}
