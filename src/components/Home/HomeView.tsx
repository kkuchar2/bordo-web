import React, {useState, useEffect, useCallback} from "react";

import {Card, CardActionArea, CardContent} from "@mui/material";
import {makeStyles} from "@mui/styles";

import {StyledHomeView} from "./style";

export const parseDate = (date) => {
    const year = date.substring(0, 4);
    const month = date.substring(5, 7);
    const day = date.substring(8, 10);

    switch (month) {
        case "01":
            return day + " January " + year;
        case "02":
            return day + " February " + year;
        case "03":
            return day + " March " + year;
        case "04":
            return day + " April " + year;
        case "05":
            return day + " May " + year;
        case "06":
            return day + " June " + year;
        case "07":
            return day + " July " + year;
        case "08":
            return day + " August " + year;
        case "09":
            return day + " September " + year;
        case "10":
            return day + " October " + year;
        case "11":
            return day + " November " + year;
        case "12":
            return day + " December " + year;
        default:
            return "No publication date";
    }
};

const youtubeRssFeed =
    "https://api.rss2json.com/v1/api.json?rss_url=https://youtube.com/feeds/videos.xml?channel_id=UCPZUQqtVDmcjm4NY5FkzqLA";

const useStyles = makeStyles(() => ({
    root: {
        height: 500,
        maxWidth: "100%",
        margin: "1.5rem",
        backgroundColor: "#1e1e1e",
    },
    media: {
        height: 200,
        minWidth: "100%"
    }
}));

const HomeView = () => {
    const classes = useStyles();
    const MAX_VIDEOS = 10;

    const [videos, setVideos] = useState();

    useEffect(() => {
        const loadVideos = async () => {
            fetch(youtubeRssFeed, { headers: { Accept: "application/json" } })
                .then((res) => res.json())
                .then((data) => data.items.filter((item) => item.title.length > 0))
                .then((newVideos) => newVideos.slice(0, MAX_VIDEOS))
                .then((videos) => setVideos(videos))
                .catch((error) => console.log(error));
        };

        loadVideos();
    }, [MAX_VIDEOS]);

    console.log(videos);

    const renderVideos = useCallback(() => {
        if (!videos) {
            return "no video shown";
        }

        return videos.map((item, idx) => {

            const link = item.link;
            let newStr = link.replace("watch?v=", "embed/");

            console.log(newStr);

            return <Card key={idx} className={classes.root}>
                <CardActionArea>
                    <iframe style={{ border: "none" }} width="100%" height="345" src={newStr}>
                    </iframe>

                    <CardContent>
                        <div style={{ color: "#cccccc", fontWeight: 500, fontFamily: "poppins", fontSize: "1.2em" }}>
                            {item.title}
                        </div>
                        <div style={{
                            color: "#7540cd",
                            fontWeight: 500,
                            fontFamily: "poppins"
                        }}>{parseDate(item.pubDate)}</div>
                    </CardContent>
                </CardActionArea>
            </Card>;
        });
    }, [videos]);

    return <StyledHomeView>
        {renderVideos()}
    </StyledHomeView>;
};

export default HomeView;