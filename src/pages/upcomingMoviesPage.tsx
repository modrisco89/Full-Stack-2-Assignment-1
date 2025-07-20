import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import { UpcomingMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'


const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const upcomingMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<UpcomingMovies, Error>("upcoming", getUpcomingMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }


  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  const displayedMovies = filterFunction(movies);

  // Redundant, but necessary to avoid app crashing.
  // const favourites = movies.filter(m => m.favourite)
  // localStorage.setItem("favourites", JSON.stringify(favourites));
  // const addToFavourites = (movieId: number) => true;

 return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default upcomingMoviesPage;




// import React, { useState, useEffect } from "react";
// import PageTemplate from '../components/templateMovieListPage';
// import { BaseMovieProps } from "../types/interfaces";
// import { getUpcomingMovies } from "../api/tmdb-api";


// const upcomingMoviesPage: React.FC = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [movies, setMovies] = useState<BaseMovieProps[]>([]);
//   const favourites = movies.filter(m => m.favourite)
//   localStorage.setItem('favourites', JSON.stringify(favourites))
//   // New function
//   const addToFavourites = (movieId: number) => {
//     const updatedMovies = movies.map((m: BaseMovieProps) =>
//       m.id === movieId ? { ...m, favourite: true } : m
//     );
//     setMovies(updatedMovies);
//   };

//  useEffect(() => {
//     getUpcomingMovies().then(movies => {
//       setMovies(movies);
//     });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <PageTemplate
//       title='Upcoming Movies'
//       movies={movies}
//       selectFavourite={addToFavourites}
//     />
//   );
// };
// export default c;
