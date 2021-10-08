import React from "react";

import UserProfileImage from "components/UserProfileImage/UserProfileImage";
import {Text} from "kuchkr-react-component-library";

import {messageTextTheme, StyledChatMessageItem, StyledMessageTextWrapper} from './style';

interface ChatMessageItemProps {
    value: any
}

const ChatMessageItem = (props: ChatMessageItemProps) => {

    const {value} = props;

    return <StyledChatMessageItem>
        <UserProfileImage/>
        <StyledMessageTextWrapper>
            <Text theme={messageTextTheme} text={value} useOverflow={true} />
        </StyledMessageTextWrapper>
    </StyledChatMessageItem>;
};

export default ChatMessageItem;