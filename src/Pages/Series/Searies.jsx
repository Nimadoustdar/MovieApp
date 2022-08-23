import { LinearProgress } from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Genres from '../../components/Genres'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleContent'
import { CoverTvApi } from '../../config/api'
import useGenres from '../../hooks/useGenres'

const Searies = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenres(selectedGenres)

    const fetchMovie = async () => {
        setLoading(true)
        const { data } = await axios.get(CoverTvApi(page, genreforURL))
        setContent(data.results);
        setLoading(false)
        setNumOfPages(data.total_pages)
    };


    useEffect(() => {
        fetchMovie();
        //eslint-disable-next-line

    }, [page, genreforURL]);

    return (
        <div>
            <span className='pageTitle'>
                Searies
            </span>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            {loading ?
                <LinearProgress color="secondary" />
                :
                <>
                    <div className='trending'>
                        {content &&
                            content.map(c => (

                                <SingleContent
                                    key={c.id}
                                    id={c.id}
                                    poster={c.poster_path}
                                    title={c.title || c.name}
                                    date={c.first_air_date || c.release_date}
                                    media_type='tv'
                                    vote_average={c.vote_average}
                                />
                            ))
                        }

                    </div>
                    {numOfPages > 1 && (
                        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
                    )}
                </>
            }
        </div>
    )
}

export default Searies