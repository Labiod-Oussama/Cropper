import { Box, Button, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { CircleStencil, Cropper, CropperPreview, RectangleStencil, CropperPreviewRef } from 'react-advanced-cropper'
import 'react-advanced-cropper/dist/style.css'
import 'react-advanced-cropper/dist/themes/bubble.css';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import MenuIcon from '@mui/icons-material/Menu';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import RotateRightIcon from '@mui/icons-material/RotateRight';
import FlipIcon from '@mui/icons-material/Flip';
import ClearIcon from '@mui/icons-material/Clear';
function Crp(props) {
    const { image, showCropperPreview, showShapeOfSpencil, btnSpecials, handleCropper } = props;
    const cropperRef = useRef(null);//ref of cropper
    const previewRef = useRef(null);//ref of preview of cropper
    const [shapeOfSpencil, setShapeOfSpencil] = useState(RectangleStencil)
    const [imageChosen, setImageChosen] = useState(0); // the numero of image of defaultProps
    // const src=image?.src;
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
    //preview
    const onUpdate = () => {
        if (previewRef.current) {
            previewRef.current?.refresh();
        }
    };
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
    //acions on image
    const actions = [
        { icon: <ClearIcon />, name: 'Reset', key: '1', fct: reset },
        { icon: <ZoomInIcon />, name: 'Zoom in', key: '2', fct: () => zoom(2) },
        { icon: <ZoomOutIcon />, name: 'Zoom out', key: '3', fct: () => zoom(0.5) },
        { icon: <RotateRightIcon />, name: 'Rotate', key: '4', fct: () => rotate(90) },
        { icon: <RotateLeftIcon />, name: 'Rotate', key: '5', fct: () => rotate(-90) },
        { icon: <FlipIcon />, name: 'FlipRight', key: '6', fct: () => flip(true, false) },
        { icon: <FlipIcon sx={{ transform: 'rotate(90deg)' }} />, name: 'FlipDown', key: '7', fct: () => flip(false, true) },
    ];
    //handleCropper(send the cropper to parent)
    useEffect(() => {
        if (cropperRef.current) {
            handleCropper(cropperRef.current)
        }
    }, [image])
    // responsive mui
    const theme = useTheme()
    const isMatchedTablette = useMediaQuery(theme.breakpoints.down('md'))
    const isMatchedPhone = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <Box width={isMatchedPhone ? '80vw' : isMatchedTablette ? '70vw' : '60vw'} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Box sx={{ position: 'relative', width: isMatchedPhone ? '90%' : isMatchedTablette ? '90%' : '70%', height: '80%' }}>
                <Cropper
                    ref={cropperRef}
                    src={image?.src}
                    className='cropper'
                    stencilComponent={shapeOfSpencil}
                    stencilProps={{ grid: true }}
                    onUpdate={onUpdate}
                    defaultSize={defaultSize}
                    style={{ height: '100%', width: '100%', backgroundColor: 'primary.light' }}
                />
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
                {
                    showCropperPreview &&
                    <CropperPreview
                        ref={previewRef}
                        cropper={cropperRef}
                        style={{ width: isMatchedPhone ? 80 : 100, height: isMatchedPhone ? 80 : 100, border: 'solid 1.5px wheat', position: 'absolute', top: 10, left: 10, borderRadius: shapeOfSpencil.displayName == 'CircleStencil' && '50%' }}
                        className='preview'
                    />
                }
                {
                    showShapeOfSpencil && <>
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
                    </>
                }
            </Box>
            <Box display='flex' flexDirection={isMatchedTablette ? 'column' : 'row'} mb={2} mt={2} flexWrap='wrap'>
                {
                    btnSpecials.map(btn => (
                        <Button
                            key={btn.key}
                            variant='contained'
                            color='primary'
                            startIcon={btn.icon}
                            onClick={btn.fct}
                            sx={{ mr: !isMatchedTablette && 1, mb: isMatchedTablette && 1 }}
                        >
                            {btn.label}
                        </Button>
                    ))
                }
            </Box>



        </Box>

    )
}
Crp.propTypes = {
    image: PropTypes.shape({
        src: PropTypes.string

    }),
    showCropperPreview: PropTypes.bool.isRequired,
    showShapeOfSpencil: PropTypes.bool.isRequired,
    btnSpecials: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.element.isRequired,
            fct: PropTypes.func.isRequired
        })
    ).isRequired

}

Crp.defaultProps = {
    image: {
        src: 'https://images.pexels.com/photos/16292477/pexels-photo-16292477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
}
export default Crp