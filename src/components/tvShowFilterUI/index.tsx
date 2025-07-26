import React, { useState } from "react";
import FilterCard from "../filterTvShowsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseTvShowProps } from "../../types/interfaces";

export const titleFilter = (tvShow: BaseTvShowProps, value: string): boolean => {
    return tvShow.name.toLowerCase().includes(value.toLowerCase());
};

export const genreFilter = (tvShow: BaseTvShowProps, value: string) => {
    const genreId = Number(value);
    const genreIds = tvShow.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface TvShowFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
}


const TvShowFilterUI: React.FC<TvShowFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                />
            </Drawer>
        </>
    );
};

export default TvShowFilterUI;
