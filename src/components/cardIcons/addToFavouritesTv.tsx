import React, {MouseEvent, useContext} from "react";
import { TvShowsContext } from "../../contexts/tvShowsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BaseTvShowProps} from "../../types/interfaces"

const AddToFavouritesIconTv: React.FC<BaseTvShowProps> = (tvShow) => {
  const context = useContext(TvShowsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavouritesTv(tvShow);
  };
  return (
    <IconButton aria-label="add to favorites Tv" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIconTv;
