import React from "react";
import {
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { Bookmark, Home } from "@mui/icons-material";

interface Props {
  bookmarks: (string | null)[];
  homeReset: () => void;
}

const Layout: React.FC<Props> = ({ bookmarks, homeReset }) => {
    const navigate = useNavigate();

    return (
        <div className="layout">
            <Typography variant="h2" align="center">
        Meteo
            </Typography>
            <Drawer variant="permanent">
                <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={homeReset}>
                        <Home sx={{ fontSize: "60px" }} />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List>
                    {bookmarks.length > 0 &&
            bookmarks.map((b) => {
                return (
                    <ListItem key={b}>
                        <ListItemButton onClick={() => navigate(`/${b}`)}>
                            <ListItemIcon>
                                <Bookmark />
                            </ListItemIcon>
                            <ListItemText
                                primary={`${new Intl.DateTimeFormat("en-US", {
                                    month: "long",
                                }).format(new Date())} ${b?.split("T")[0].split("-")[2]}`}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
                </List>
                <Divider />
            </Drawer>
            <Outlet />
        </div>
    );
};

export default Layout;
