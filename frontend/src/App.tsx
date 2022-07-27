import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AppProps } from "./AppProps";
import Bookmark from "./pages/Bookmark";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

const App = () => {
    const navigate = useNavigate();

    const [data, setData] = useState<AppProps["arrayData"]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentData = data[currentIndex];

    const getData = async () => {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
        });
        const sentData = await response.json();
        setData(sentData.data);
    };

    useEffect(() => {
        getData();
    }, []);

    // Previous and next buttons
    const handleNext = () => {
        currentIndex < data.length - 1 && setCurrentIndex(currentIndex + 1);
    };
    const handlePrevious = () => {
        currentIndex > 0 && setCurrentIndex(currentIndex - 1);
    };

    // Bookmarks
    const [bookmarks, setBookmarks] = useState<(string | null)[]>(() => {
        const stored = localStorage.getItem("bookmarks");
        return stored ? JSON.parse(stored) : [];
    });

    const handleBookmark = (date: string) => {
        if (bookmarks.includes(date)) {
            const filtered = bookmarks.filter((b) => b !== date);
            setBookmarks(filtered);
        } else {
            setBookmarks([...bookmarks, date]);
        }
    };

    useEffect(() => {
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }, [bookmarks]);

    // Home icon reset
    const homeReset = () => {
        navigate("/");
        setCurrentIndex(0);
    };

    return (
        <Routes>
            <Route path="/" element={<Layout bookmarks={bookmarks} homeReset={homeReset} />}>
                <Route
                    path=""
                    element={
                        <Home handleBookmark={handleBookmark} bookmarks={bookmarks} data={data} currentIndex={currentIndex} currentData={currentData} handleNext={handleNext} handlePrevious={handlePrevious} />
                    }
                />
                <Route path=":date" element={<Bookmark data={data} handleBookmark={handleBookmark} bookmarks={bookmarks} setBookmarks={setBookmarks} />} />
            </Route>
        </Routes>
    );
};

export default App;
