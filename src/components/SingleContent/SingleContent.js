import { Badge } from '@material-ui/core'
import React from 'react'
import { img_300, unavailable } from '../../config/config'
import ContentModal from '../ContentModal/ContentModal'
import './SingleContent.css'

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average
}) => {
    return (
        <ContentModal className='media' media_type={media_type} id={id}>
            <Badge

                badgeContent={vote_average.toFixed(1)}
                color={vote_average > 6
                    ? 'primary'
                    : 'secondary'}
                    
            />
            <img
                src={poster
                    ? `${img_300}/${poster}`
                    : unavailable}
                alt={title}
            />
            <b className='title'>{title}</b>
            <span className='subTitle'>
                {media_type === 'tv' ? 'Tv Series' : 'Movie'}
                <span className='subTitle'>
                    {date}
                </span>
            </span>
        </ContentModal>
    )
}

export default SingleContent