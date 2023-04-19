import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download';
const ButtonDownload = ({ image }) => {
    const [photo, setPhoto] = useState(null)
    useEffect(() => {
        setPhoto(image)
    }, [image])
    const downloadImage = () => {
        if (!photo) {
            return;
        }
        const canvas = photo.getCanvas();
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
        <Button variant='contained' color='primary' onClick={downloadImage} startIcon={<DownloadIcon />} sx={{ mt: 2, fontWeight: 'bold', letterSpacing: '2px' }}>
            Download
        </Button>
    )
}

export default ButtonDownload