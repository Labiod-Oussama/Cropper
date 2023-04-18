import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { CircleStencil, Cropper, CropperPreview, RectangleStencil, CropperPreviewRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import 'react-advanced-cropper/dist/themes/bubble.css';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
function Crp({ image }) {
    const cropperRef = useRef(null);//ref of cropper
    const previewRef = useRef(null);//ref of preview of cropper
    const [shapeOfSpencil, setShapeOfSpencil] = useState(RectangleStencil)
    const [imageChosen, setImageChosen] = useState(0); // the numero of image of defaultProps
    const imageSrc = image ? image.src : Crp.defaultProps.image.src[imageChosen];
    /* fill the image*/
    const defaultSize = ({ imageSize, visibleArea }) => {
        return {
            width: (visibleArea || imageSize).width,
            height: (visibleArea || imageSize).height,
        };
    }
    //zoom
    const zoom = (e) => {
        if (cropperRef.current) {
            cropperRef.current.zoomImage(e); // zoom-in 2x
        }
    };
    //rotate
    const rotate = (angle) => {
        if (cropperRef.current) {
            cropperRef.current.rotateImage(angle);
        }
    };
    //flip
    const flip = (horizontal, vertical) => {
        if (cropperRef.current) {
            cropperRef.current.flipImage(horizontal, vertical);
        }
    };
    //reset
    const reset = () => {
        if (cropperRef.current) {
            cropperRef.current.reset();
        }
    };
    // all the actions :zoom rotate flip reset
    const actions = [
        { icon: <ClearIcon />, name: 'Reset', key: '1', fct: reset },
        { icon: <ZoomInIcon />, name: 'Zoom in', key: '2', fct: () => zoom(2) },
        { icon: <ZoomOutIcon />, name: 'Zoom out', key: '3', fct: () => zoom(0.5) },
        { icon: <RotateRightIcon />, name: 'Rotate', key: '4', fct: () => rotate(90) },
        { icon: <RotateLeftIcon />, name: 'Rotate', key: '5', fct: () => rotate(-90) },
        { icon: <FlipIcon />, name: 'FlipRight', key: '6', fct: () => flip(true, false) },
        { icon: <FlipIcon sx={{ transform: 'rotate(90deg)' }} />, name: 'FlipDown', key: '7', fct: () => flip(false, true) },
    ];
    //preview
    const onUpdate = () => {
        previewRef.current?.refresh();
    };
    //download the cropper
    const downloadImage = () => {
        if (!cropperRef.current) {
            return;
        }
        const canvas = cropperRef.current.getCanvas();
        if (!canvas) {
            return;
        }
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'cropped-image.jpg';
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    };
    //options for the user to apply
    const options = [
        { label: 'download', fct: downloadImage }
    ]
    // menu for shape of spencil
    const MenuOptions = [
        { label: 'RectangleStencil', fct: () => setShapeOfSpencil(RectangleStencil) },
        { label: 'CircleStencil', fct: () => setShapeOfSpencil(CircleStencil) },
    ]
    // handle Menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // responsive mui
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box width={isMatchedPhone ? '80vw' : isMatchedTablette ? '70vw' : '60vw'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box sx={{ position: 'relative', width: isMatchedPhone ? '90%' : isMatchedTablette ? '90%' : '70%', height: '80%' }}>
                <Cropper
                    ref={cropperRef}
                    src={imageSrc}
                    className='cropper'
                    stencilComponent={shapeOfSpencil}
                    stencilProps={{
                        grid: true,
                    }}
                    onUpdate={onUpdate}
                    defaultSize={defaultSize}
                    style={{ height: '100%', width: '100%', backgroundColor: 'primary.light' }}
                />
                {
                    !image && <>
                        <Button variant='outlined' color='primary' disabled={imageChosen == 0} onClick={() => imageChosen > 0 && setImageChosen(prev => prev - 1)} sx={{ position: 'absolute', top: isMatchedTablette ? '103%' : '50%', left: isMatchedTablette ? '0' : '-80px', fontWeight: 'bold' }}>
                            &lt;
                        </Button>
                        <Button variant='outlined' color='primary' disabled={imageChosen == Crp.defaultProps.image.src.length - 1} onClick={() => imageChosen < (Crp.defaultProps.image.src.length - 1) && setImageChosen(prev => prev + 1)} sx={{ position: 'absolute', top: isMatchedTablette ? '103%' : '50%', right: isMatchedTablette ? '0' : '-80px', fontWeight: 'bold' }}>
                            &gt;
                        </Button>
                    </>
                }
                <MenuIcon
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ color: 'primary.main', fontSize: '2em', position: 'absolute', top: 2, right: 10, cursor: 'pointer' }} >
                </MenuIcon>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
                            '&:before': { content: '""', display: 'block', position: 'absolute', top: 0, right: 14, width: 10, height: 10, bgcolor: 'background.paper', transform: 'translateY(-50%) rotate(45deg)', zIndex: 0 },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    {
                        MenuOptions.map(menu => (
                            <MenuItem key={menu.label} onClick={menu.fct} sx={{ color: ((shapeOfSpencil.displayName) == (menu.label)) && 'primary.main', fontWeight: 'bold' }}>
                                {menu.label}
                            </MenuItem>
                        ))
                    }

                </Menu>
                {
                    <SpeedDial
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: "absolute", bottom: 10, right: 10 }}
                        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
                    >
                        {actions.map((action) => (
                            <SpeedDialAction
                                key={action.key}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={action.fct}
                                sx={{ color: 'primary.main', marginBottom: 0 }}
                            />
                        ))}
                    </SpeedDial>
                }
                {
                    <CropperPreview
                        ref={previewRef}
                        cropper={cropperRef}
                        style={{ width: isMatchedPhone ? 80 : 100, height: isMatchedPhone ? 80 : 100, border: 'solid 1.5px wheat', position: 'absolute', top: 10, left: 10, borderRadius: shapeOfSpencil.displayName == 'CircleStencil' && '50%' }}
                        className='preview'
                    />
                }
            </Box>
            {
                options.map((opt) => (
                    <Button key={opt.label} variant='contained' color='primary' onClick={opt.fct} sx={{ mt: 2, fontWeight: 'bold', letterSpacing: '2px' }}>
                        {opt.label}
                    </Button>
                ))
            }

        </Box>

    )
}
Crp.propTypes = {
    image: PropTypes.shape({
        src: PropTypes.string,
    })
}
// i make array that we will pass as props all the photos scriping from the site ecommerce
Crp.defaultProps = {
    image: {
        src: [
            'https://images.pexels.com/photos/16292477/pexels-photo-16292477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            'https://images.pexels.com/photos/11895469/pexels-photo-11895469.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
            'https://images.pexels.com/photos/9213617/pexels-photo-9213617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ]
    }
}
export default Crp