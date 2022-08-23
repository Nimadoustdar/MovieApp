import axios from 'axios'
import React, { useEffect, useState } from 'react'
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent';
import { TrendingApi } from '../../config/api';
import LinearProgress from '@material-ui/core/LinearProgress';
import './Trending.css';
const Trending = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const fetchTrending = async () => {
    setLoading(true)
    const { data } = await axios.get(TrendingApi(page))
    setContent(data.results);
    setLoading(false)

  };

  useEffect(() => {
    fetchTrending();
  }, [page]);
  return (
    <div>
      <span className='pageTitle'>
        Trending
      </span>
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
                  media_type={c.media_type}
                  vote_average={c.vote_average}
                />
              ))
            }

          </div>
          <CustomPagination setPage={setPage} /></>
      }

    </div>
  )
}

export default Trending