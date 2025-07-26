import React from "react";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes, Link } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import TvShowsPage from "./pages/tvShowsPage";
import MyTvShowsPage from "./pages/myTvShowsPage";
import TvShowPage from "./pages/tvShowDetailsPage";
import TvReviewPage from "./pages/tvShowReviewPage";
import AddTvReviewPage from './pages/addTvShowReviewPage';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />      {/* New Header  */}
        <MoviesContextProvider>
        <Routes>
          <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
          <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
          <Route path="/movies/:id" element={<MoviePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/reviews/:id" element={<MovieReviewPage/>} />
          <Route path="/movies/upcoming" element={<UpcomingMoviesPage/>} />
          <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
          <Route path="/tv/shows" element={<TvShowsPage/>} />
          <Route path="/tv/mytv" element={<MyTvShowsPage />} />
          <Route path="/tv/:id" element={<TvShowPage />} />
          <Route path="/reviewstv/:id" element={<TvReviewPage/>} />
          <Route path="/reviewstv/form" element={<AddTvReviewPage/>} />
        </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
