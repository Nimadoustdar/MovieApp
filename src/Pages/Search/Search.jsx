import { TextField, createTheme, ThemeProvider, Button, Tabs, Tab } from '@material-ui/core'
import React, { useEffect, useState } from 'react';
import './Search.css'
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { SearchApi } from '../../config/api';
import CustomPagination from '../../components/Pagination/CustomPagination';
import SingleContent from '../../components/SingleContent';

const Search = () => {
  const [type, setType] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [content, setContent] = useState()
  const [numOfPages, setNumOfPages] = useState()

  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(SearchApi(type, page, searchText))
      setContent(data.results)
      setNumOfPages(data.total_pages)
    } catch (error) {
      console.error(error);
    }

  }
  useEffect(() => {
    window.scroll(0, 0)
    fetchSearch()

    //eslint-disable-next-line
  }, [type, page])

  const darkTheme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#fff',
      },
    },
  })



  return (
    <div>
      <ThemeProvider
        theme={darkTheme}>
        <div
          className='search'
        >
          <TextField
            style={{ flex: 1 }}
            className="searchBox"
            label="Search"
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            onClick={fetchSearch}
            variant="contained"
            style={{ marginLeft: 10 }}
          >
            <SearchIcon fontSize="large" />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
          aria-label="disabled tabs example"
        >
          <Tab style={{ width: "50%" }} label="Search Movies" />
          <Tab style={{ width: "50%" }} label="Search TV Series" />
        </Tabs>
      </ThemeProvider>
      
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
        {searchText &&
          !content &&
          (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  )
}

export default Search