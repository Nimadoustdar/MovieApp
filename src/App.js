
import { Container } from '@material-ui/core';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";import './App.css';
import Header from './components/Header';
import SimpleBottomNavigation from './components/MainNav/MainNav';
import Trending from './Pages/Trending';
import Movies from './Pages/Movies';
import Series from './Pages/Series';
import Search from './Pages/Search';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Routes>
            <Route path="/" element={<Trending />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </div>


      <SimpleBottomNavigation />

    </BrowserRouter>
  );
}

export default App;
