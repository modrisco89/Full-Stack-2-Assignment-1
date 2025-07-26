import React, {MouseEvent, useContext} from "react";
import { TvShowsContext } from "../../contexts/tvShowsContext";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {BaseTvShowProps} from "../../types/interfaces"
import { IconButton } from "@mui/material";

const AddToMustWatchIcon: React.FC<BaseTvShowProps> = (tvShow) => {
  const context = useContext(TvShowsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToMustWatch(tvShow);
  };
  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
