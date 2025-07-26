import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateTvShowPage";
import TvShowReview from "../components/tvShowReview";

const TvShowReviewPage: React.FC = () => {
  const { state : {tvShow, review } } = useLocation()
  return (
    <PageTemplate tvShow={tvShow}>
      <TvShowReview {...review} />
    </PageTemplate>
  );
};

export default TvShowReviewPage;
