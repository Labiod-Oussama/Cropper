import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
const ButtonDownload = ({ image }) => {
    const downloadImage = () => {
        if (!image) {
            return;
        }
        const canvas = image.getCanvas();
        console.log(canvas);
        const width = (canvas.getAttribute('width'));
        const height =(canvas.getAttribute('height'));
        if (!canvas) {
            return;
        }
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `cropped[${width}x${height}].jpg`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    };
    return (
        <Button variant='contained' color='primary' onClick={downloadImage} startIcon={<DownloadIcon />} sx={{ mt: 1, fontWeight: 'bold', letterSpacing: '2px' }}>
            Download
        </Button>
    )
}

export default ButtonDownload