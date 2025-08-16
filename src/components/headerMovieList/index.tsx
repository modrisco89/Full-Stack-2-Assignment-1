import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
    },
};

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = (headerProps) => {
    const title = headerProps.title
  const navigate = useNavigate();


    const forward = () => {
    switch (headerProps.title) {
    case "Discover Movies":
      navigate("/movies/favourites");
      break;
    case "Favourite Movies":
      navigate("/movies/upcoming");
      break;
    case "Upcoming Movies":
      navigate("/movies/mustWatch");
      break;
    case "Must Watch":
      navigate("/tv/Shows");
      break;      
    default:
      navigate("/");
      break;
  }
  };

     const goBack = () => {
    switch (headerProps.title) {
    case "Discover Movies":
      navigate("/tv/mytv");
      break;
    case "Favourite Movies":
      navigate("/");
      break;
    case "Upcoming Movies":
      navigate("/movies/favourites");
      break;
    case "Must Watch":
      navigate("/movies/upcoming");
      break;      
    default:
      navigate("/");
      break;
  }
  };
    return (
        <Paper component="div" sx={styles.root}>
            <IconButton
                aria-label="go back" onClick={() => goBack()}
            >
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <Typography variant="h4" component="h3">
                {title}
            </Typography>
            <IconButton
                aria-label="go forward"
                onClick={() => forward()}
            >
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default Header;
