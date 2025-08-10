import React, { useState, useCallback } from "react";
import { BaseTvShowProps } from "../types/interfaces";


interface TvShowContextInterface {
    favouritesTv: number[];
    addToFavouritesTv: ((tvShow: BaseTvShowProps) => void);
    removeFromFavouritesTv: ((tvShow: BaseTvShowProps) => void);
    // addReview: ((tvShow: BaseTvShowProps, review: Review) => void);  // NEW
}
const initialContextState: TvShowContextInterface = {
    favouritesTv: [],
    addToFavouritesTv: () => {},
    removeFromFavouritesTv: () => {},
    // addReview: (tvShow, review) => { tvShow.id, review},  // NEW
};

// eslint-disable-next-line react-refresh/only-export-components
export const TvShowsContext = React.createContext<TvShowContextInterface>(initialContextState);

const TvShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favouritesTv, setFavouritesTv] = useState<number[]>([]);
    // const [myReviews, setMyReviews] = useState<Review[]>( [] ) 

    const addToFavouritesTv = useCallback((tvShow: BaseTvShowProps) => {
        setFavouritesTv((prevFavourites) => {
            if (!prevFavourites.includes(tvShow.id)) {
                return [...prevFavourites, tvShow.id];
            }
            return prevFavourites;
        });
    }, []);


    const removeFromFavouritesTv = useCallback((tvShow: BaseTvShowProps) => {
        setFavouritesTv((prevFavourites) => prevFavourites.filter((mId) => mId !== tvShow.id));
    }, []);

    
    //   const addReview = (tvShow:BaseTvShowProps, review: Review) => {   // NEW
    //     setMyReviews( {...myReviews, [tvShow.id]: review } )
    //   };

    return (
        <TvShowsContext.Provider
            value={{
                favouritesTv,
                addToFavouritesTv,
                removeFromFavouritesTv,
                // addReview,
            }}
        >
            {children}
        </TvShowsContext.Provider>
    );
};

export default TvShowsContextProvider;
