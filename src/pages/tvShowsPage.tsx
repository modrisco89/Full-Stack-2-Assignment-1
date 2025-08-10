import React from "react";
import PageTemplate from "../components/templateTvShowListPage";
import { getTvShows } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import TvShowFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/tvShowFilterUI";
import { BaseTvShowProps, DiscoverTvShows } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIconTv from '../components/cardIcons/addToFavouritesTv'


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

const tvHomePage: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error, isLoading, isError } = useQuery<DiscoverTvShows, Error>("tv", getTvShows);
  // eslint-disable-next-line react-hooks/rules-of-hooks
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

  const tvShows = data ? data.results : [];
  const displayedTvShows = filterFunction(tvShows);



 return (
    <>
      <PageTemplate
        title="Discover TV Shows"
        tvShows={displayedTvShows}
        action={(tvShow: BaseTvShowProps) => {
          return <AddToFavouritesIconTv {...tvShow} />
        }}
      />
      <TvShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};
export default tvHomePage;
