import React, { useEffect, useState } from 'react'
import { CoverMovieApi } from '../../config/api';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import Genres from '../../components/Genres';
import SingleContent from '../../components/SingleContent';
import CustomPagination from '../../components/Pagination/CustomPagination';
import useGenres from '../../hooks/useGenres';

const Movies = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const genreforURL = useGenres(selectedGenres)

    const fetchMovie = async () => {
        setLoading(true)
        const { data } = await axios.get(CoverMovieApi(page, genreforURL))
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
            <span className="pageTitle">
                Movies
            </span>
            <Genres
                type="movie"
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
                                    media_type='movie'
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

export default Movies