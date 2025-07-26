import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import {BaseTvShowProps} from "../../types/interfaces"
import { Link } from "react-router-dom";

const WriteReviewIcon:React.FC<BaseTvShowProps> = (tvShow) => {
  return (
    <Link
    to={'/reviews/form'}
    state={{
        tvShowId: tvShow.id,
      }}
  >
    <RateReviewIcon color="primary" fontSize="large" />
  </Link>
  );
};

export default  WriteReviewIcon;
