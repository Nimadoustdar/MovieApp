import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from 'axios';
import { ModalApi, YouTubApi } from '../../config/api';
import './ContentModal.css'
import Carousel from '../Carousel/Carousel'
import {
    img_500,
    unavailable,
    unavailableLandscape
} from '../../config/config';
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '98%',
        height: '80%',
        backgroundColor: '#39445a',
        border: '1px solid #282c34',
        borderRadius: 10,
        color: '#fff',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(1, 1, 3)
    },
}));

export default function ContentModal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState()
    const [video, setVideo] = useState()
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const fetchModal = async () => {
        const { data } = await axios.get(ModalApi(media_type, id))
        setContent(data)
    }
    const fetchVideo = async () => {
        const { data } = await axios.get(YouTubApi(media_type, id))
        setVideo(data.results[0]?.key)
    }
    useEffect(() => {
        fetchModal()
        fetchVideo()

    }, [])


    return (
        <>
            <div
                className='media'
                type="button"
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className='ContentModal'>
                                <img
                                    src={content.poster_path
                                        ? `${img_500}/${content.poster_path}`
                                        : unavailable}
                                    alt={content.title || content.name}
                                    className='ContentModal__portrait'
                                />
                                <img
                                    src={content.backdrop_path
                                        ? `${img_500}/${content.backdrop_path}`
                                        : unavailableLandscape}
                                    alt={content.title || content.name}
                                    className='ContentModal__landscape'
                                />
                                <div className='ContentModal__about'>
                                    <span className='ContentModal__title'>
                                        {content.name || content.title}(
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "----"
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {content.tagline && (
                                        <i className='tagline'>{content.tagline}</i>
                                    )}
                                    <span className='ContentModal__description'>
                                        {content.overview}

                                    </span>
                                    <div>
                                        <Carousel
                                            media_type={media_type}
                                            id={id}
                                        />
                                    </div>
                                    <Button
                                        variant='contained'
                                        color='secondary'
                                        target='__blank'
                                        href={`https://www.youtub.com/watch?v=${video}`}
                                        startIcon={<YouTubeIcon />}>

                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}
