import React from "react";
import {
    Typography,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Box,
    Card,
    Paper,
    IconButton,
} from "@mui/material";
import { amber, lime, orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";
import WeatherIcon from "./WeatherIcon";
import { AppProps } from "../AppProps";
import { Bookmark, BookmarkBorder } from "@mui/icons-material";
import { useParams } from "react-router";

interface Props {
    data: AppProps["data"];
    handleBookmark: (date: string) => void;
    bookmarks: (string | null)[];
}

const DisplayCard: React.FC<Props> = ({ data, handleBookmark, bookmarks }) => {
    const params = useParams();

    const StyledTableRow = styled(TableRow)(() => ({
        "&:nth-of-type(odd)": {
            backgroundColor: params.date ? orange[100] : amber[100],
        },
        "&:nth-of-type(even)": {
            backgroundColor: params.date ? orange[50] : amber[50],
        },
        "&:last-child td, &:last-child th": {
            border: 0,
        },
    }));

    // Date
    const getDate = () => {
        const date = data?.date.split("T")[0].split("-")[2];
        const d = new Date();
        // const day = d.getDate();
        const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(d);
        return `${month} ${date}`;
    };

    // Weather Symbol
    const symbol = data?.parameters.filter((p) => p.name === "Wsymb2")[0]
        ?.values[0];

    // Temperature
    const tempDec = data?.parameters.filter((p) => p.name === "t")[0]
        ?.values[0];
    const temp = tempDec?.toString().split(".");
    const temperature =
    temp && temp[1] >= "5" ? Math.ceil(tempDec) : Math.floor(tempDec);

    // Description
    const getDescription = (pN: string) => {
        return pN === "ws"
            ? "Wind"
            : pN === "r"
                ? "Humidity"
                : pN === "prec1h"
                    ? "Precipitation"
                    : pN === "msl"
                        ? "Pressure"
                        : "Clouds";
    };

    // Unit
    const getUnit = (pU: string) => {
        return pU === "Cel"
            ? "°"
            : pU === "m/s"
                ? "m/s"
                : pU === "percent"
                    ? "%"
                    : pU === "mm"
                        ? "mm"
                        : "hPa";
    };

    return (
        <Card sx={{ width: "50vw" }} component={Paper} elevation={5}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <Box sx={{ width: "5em" }}></Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        margin: "1em",
                    }}
                >
                    <Typography gutterBottom variant="h4">
                        {getDate()}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "1em",
                            width: "10vw",
                        }}
                    >
                        <WeatherIcon symbol={symbol} size={100} />
                        <Typography variant="h3">{temperature}°</Typography>
                    </Box>
                </Box>
                <IconButton onClick={() => handleBookmark(data?.date)}>
                    {
                        bookmarks.includes(data.date) ?
                            <Bookmark sx={{fontSize: "60px", color: "#ffa726"}} /> :
                            <BookmarkBorder sx={{fontSize: "60px", color: "#ffa726"}} />
                    }
                    
                </IconButton>
            </Box>
            <TableContainer>
                <Table>
                    <TableBody>
                        {data &&
                  data.parameters.filter((p) => p.name !== "t").filter((p) => p.name !== "Wsymb2").map((p) => {
                      return (
                          <StyledTableRow key={p.name}>
                              <TableCell>
                                  <Typography variant="h6">
                                      {getDescription(p.name)}
                                  </Typography>
                              </TableCell>
                              <TableCell align="right">
                                  <Typography variant="h6">
                                      {p.values[0]} {getUnit(p.unit)}
                                  </Typography>
                              </TableCell>
                          </StyledTableRow>
                      );
                  })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default DisplayCard;