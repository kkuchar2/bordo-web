import React, {useMemo, useState} from "react";

import {Grid} from "@giphy/react-components";
import {StyledGIFPresentation} from "components/Image/GIFSelect/GIFPresentation/style";

import {GIFPresentationProps} from "./GIFPresentation.types";

export const GIFPresentation = (props: GIFPresentationProps) => {

    const { searchText, onGifClick, giphyFetch } = props;

    const [top, setTop] = useState(0);

    const getFetchFunc = useMemo(() => {
        if (!searchText || searchText.length === 0) {
            return (offset: number) => giphyFetch.trending({ offset, limit: 10 });
        }
        else {
            return (offset: number) => giphyFetch.search(searchText, { offset, limit: 10 });
        }
    }, [searchText]);

    const handleUpdate = (values) => {
        const { top } = values;
        setTop(top);
    };

    console.log("Top: ", top);

    const renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
            backgroundColor: "red"
        };
        return (
            <div
                style={{ width: 10, ...style, ...thumbStyle }}
                {...props}/>
        );
    };

    return <StyledGIFPresentation
        style={{ height: 500, width: 600 }}
        renderTrackVertical={renderThumb}
        onUpdate={handleUpdate}>
        <Grid onGifClick={onGifClick}
              fetchGifs={getFetchFunc}
              borderRadius={10}
              width={570}
              columns={2}
              key={searchText}
              gutter={10}
              noLink={true}/>
    </StyledGIFPresentation>;
};