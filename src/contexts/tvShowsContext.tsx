import React, { useState, useCallback } from "react";
import { BaseTvShowProps } from "../types/interfaces";


interface TvShowContextInterface {
    favouritesTv: number[];
    mustWatch: number[];
    // addToMustWatch:((tvShow: BaseTvShowProps) => void);
    addToFavourites: ((tvShow: BaseTvShowProps) => void);
    removeFromFavourites: ((tvShow: BaseTvShowProps) => void);
    // removeFromMustWatch: ((tvShow: BaseTvShowProps) => void);
    addReview: ((tvShow: BaseTvShowProps, review: Review) => void);  // NEW
}
const initialContextState: TvShowContextInterface = {
    favouritesTv: [],
    mustWatch: [],
    // addToMustWatch:() => {},
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    // removeFromMustWatch: () => {},
    addReview: (tvShow, review) => { tvShow.id, review},  // NEW
};

// eslint-disable-next-line react-refresh/only-export-components
export const TvShowsContext = React.createContext<TvShowContextInterface>(initialContextState);

const TvShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favouritesTv, setFavourites] = useState<number[]>([]);
    // const [mustWatch, setMustWatch] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>( [] ) 

    const addToFavourites = useCallback((tvShow: BaseTvShowProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(tvShow.id)) {
                return [...prevFavourites, tvShow.id];
            }
            return prevFavourites;
        });
    }, []);

    // const addToMustWatch = useCallback((tvShow: BaseTvShowProps) => {
    //     setMustWatch((prevMustWatch) => {
    //         if (!prevMustWatch.includes(tvShow.id)) {
    //             return [...prevMustWatch, tvShow.id];
    //         }
    //         return prevMustWatch;
    //     });
    // }, []);

    const removeFromFavourites = useCallback((tvShow: BaseTvShowProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== tvShow.id));
    }, []);


    //     const removeFromMustWatch = useCallback((tvShow: BaseTvShowProps) => {
    //     setMustWatch((prevMustWatch) => prevMustWatch.filter((mId) => mId !== tvShow.id));
    // }, []);
    
      const addReview = (tvShow:BaseTvShowProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [tvShow.id]: review } )
      };

    return (
        <TvShowsContext.Provider
            value={{
                favouritesTv,
                mustWatch,
                // addToMustWatch,
                addToFavourites,
                removeFromFavourites,
                // removeFromMustWatch,
                addReview,
            }}
        >
            {children}
        </TvShowsContext.Provider>
    );
};

export default TvShowsContextProvider;
