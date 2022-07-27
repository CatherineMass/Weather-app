import { SentimentVeryDissatisfied } from "@mui/icons-material";
import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router";
import { AppProps } from "../AppProps";
import DisplayCard from "../components/DisplayCard";

interface Props {
    data: AppProps["arrayData"];
    handleBookmark: (date: string) => void;
    bookmarks: (string | null)[];
    deleteBookmark: (date: string | undefined) => void;
}

const Bookmark: React.FC<Props> = ({ data, handleBookmark, bookmarks, deleteBookmark }) => {
    const params = useParams();
    // const navigate = useNavigate();

    const bookmarkData = data?.filter(d => d?.date === params.date)[0];

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "3em",
        }}>
            {
                bookmarkData ? <DisplayCard data={bookmarkData} handleBookmark={handleBookmark} bookmarks={bookmarks} /> :
                    <Card raised={true} sx={{ width: "50vw", padding: "1em", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <SentimentVeryDissatisfied sx={{ fontSize: "100px" }} />
                        <Box>
                            <Typography sx={{ fontSize: "2em" }}>Data no longer available.</Typography>
                            <Typography sx={{ fontSize: "2em" }}>Delete bookmark?</Typography>
                        </Box>
                        <Button variant="contained" size="large" sx={{ margin: "1em" }} onClick={() => deleteBookmark(params.date)}>Delete</Button>
                    </Card>
                    
            }
            
        </Box>
    );
};

export default Bookmark;