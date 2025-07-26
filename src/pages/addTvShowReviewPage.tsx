import React from "react";
import PageTemplate from "../components/templateTvShowPage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getTvShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import { BaseTvShowProps, TvShowDetailsProps } from "../types/interfaces";

const WriteReviewPage: React.FC = () => {
    const location = useLocation()
    const { tvShowId } = location.state;
    const { data: tvShow, error, isLoading, isError } = useQuery<TvShowDetailsProps, Error>(
        ["tvShow", tvShowId],
        () => getTvShow(tvShowId)
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }
    return (
        <>
            {tvShow ? (
                    <PageTemplate tvShow={tvShow}>
                        <ReviewForm {...tvShow} />
                    </PageTemplate>
            ) : (
                <p>Waiting for TV Show review details</p>
            )}
        </>
    );
};

export default WriteReviewPage;
