import React, { useRef } from 'react'
import { Button } from '@mui/material'
import UploadIcon from '@mui/icons-material/Upload';

const ButtonUpload = ({ imageUploaded }) => {
    const inputRef = useRef(null); // ref of upload input
    //  get image from upload btn
    const onLoadImage = (event) => {
        const { files } = event.target;
        if (files && files[0]) {
            const blob = URL.createObjectURL(files[0]);
            console.log( blob);
            imageUploaded({
                img:{
                    src: blob,
                    type: files[0].type
                }
            })
        }
        event.target.value = '';
    };
   
    return (
        <Button variant='outlined' component='label' color='primary' startIcon={<UploadIcon />} sx={{ margin: '0px auto 20px', fontWeight: 'bold', letterSpacing: '2px' }} >
            Upload photo
            <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={onLoadImage}
            />
        </Button>
    )
}

export default ButtonUpload