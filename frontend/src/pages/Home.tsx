import React from "react";
import "../App.css";
import { Box, IconButton } from "@mui/material";
import { AppProps } from "../AppProps";
import DisplayCard from "../components/DisplayCard";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Outlet } from "react-router-dom";

interface Props {
    handleBookmark: (date: string) => void;
    bookmarks: (string | null)[];
    data: AppProps["arrayData"];
    currentIndex: number;
    currentData: AppProps["data"];
    handlePrevious: () => void;
    handleNext: () => void;
}

const Home: React.FC<Props> = ({ handleBookmark, bookmarks, data, currentIndex, currentData, handlePrevious, handleNext }) => {
    return (
        <div className="Home">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3em",
                }}
            >
                {currentIndex > 0 ? (
                    <IconButton onClick={handlePrevious}>
                        <ChevronLeft sx={{ fontSize: "60px" }} />
                    </IconButton>
                ) : (
                    <Box sx={{ width: "5em" }} />
                )}

                {currentData && <DisplayCard data={currentData} handleBookmark={handleBookmark} bookmarks={bookmarks} />}
                {currentIndex < data.length - 1 ? (
                    <IconButton onClick={handleNext}>
                        <ChevronRight sx={{ fontSize: "60px" }} />
                    </IconButton>
                ) : (
                    <Box sx={{ width: "5em" }} />
                )}
            </Box>
            <Outlet />
        </div>
    );
};

export default Home;
