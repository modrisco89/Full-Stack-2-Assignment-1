import React, { useContext } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MovieDetailsProps } from "../../types/interfaces"; 
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";




const styles = {
    root: {  
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
    width: 40,
    height: 40,
  },
};
const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  // const movies = JSON.parse(localStorage.getItem("favourites") || '[]');
  // const movieFoundById = movies.find((moviefound: { id: number; }) => moviefound.id === movie.id);
  const { favourites, mustWatch } = useContext(MoviesContext);//NEW

const isFavourite = favourites.includes(movie.id);
const isMustWatch = mustWatch.includes(movie.id);

  return (
    
    <Paper component="div" sx={styles.root}>

      <IconButton aria-label="go back" >
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>
  {/* Icons next to the title */}
  {isFavourite && (
    <Avatar sx={styles.avatar}>
      <FavoriteIcon />
    </Avatar>
  )}
  {isMustWatch && (
    <Avatar sx={styles.avatar}>
      <PlaylistAddCheckIcon />
    </Avatar>
  )}
      <Typography variant="h4" component="h3">

        {movie.title}{"   "}
        <a href={movie.homepage}>
          <HomeIcon color="primary"  fontSize="large"/>
        </a>
        <br />
        <span>{`${movie.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>

    </Paper>
  );
};

export default MovieHeader;
