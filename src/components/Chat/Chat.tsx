// import React, {useCallback, useEffect, useRef, useState} from "react";
//
// import {WEBSOCKET_URL} from "appRedux/store";
// import {Input, List, Text} from "kuchkr-react-component-library";
//
// import ChatMessageItem from "./ChatMessageItem/ChatMessageItem";
// import {
//     chatListTheme,
//     CollapsedChat,
//     headerTextTheme,
//     inputTheme,
//     StyledChat,
//     StyledChatContent,
//     StyledChatHeader,
//     StyledExpandIcon
// } from './style';
//
// const Chat = () => {
//
//     const [collapsed, setCollapsed] = useState(false);
//
//     const [items, setItems] = useState([{value: 'XD'}]);
//
//     const ws = useRef<WebSocket | null>(null);
//
//     const onMessage = useCallback((message) => {
//         setItems(prevArray => [...prevArray, {value: message}]);
//     }, [items]);
//
//     useEffect(() => {
//         ws.current = new WebSocket(WEBSOCKET_URL);
//         ws.current.onmessage = onWebsocketMessage;
//         ws.current.onclose = onWebsocketClose;
//
//         return () => {
//             ws.current?.close();
//         };
//     }, []);
//
//     const sendWebsocketMessage = useCallback(() => {
//         if (!ws.current) {
//             return;
//         }
//
//         ws.current.send("Hello from client!");
//     }, [ws]);
//
//     const onWebsocketMessage = useCallback((message) => {
//         console.log(message.data);
//         onMessage(JSON.parse(message.data)['message']);
//     }, []);
//
//     const onWebsocketClose = useCallback(() => {
//         console.log('CLosing websocket');
//     }, []);
//
//     const onExpandClick = useCallback(() => setCollapsed(!collapsed), [collapsed]);
//
//     const renderExpanded = useCallback(() => {
//         return <StyledChat>
//             <StyledChatHeader onClick={onExpandClick}>
//                 <Text theme={headerTextTheme} text={"Chat"}/>
//                 {renderExpandIcon()}
//             </StyledChatHeader>
//             <StyledChatContent>
//                 <List
//                     theme={chatListTheme}
//                     fixedHeight={350}
//                     items={items}
//                     dataItemRenderer={(index, disabled, dataItem) => <ChatMessageItem value={dataItem.value}/>}
//                     rowHeight={12}/>
//             </StyledChatContent>
//             <Input title={''} placeholder={'Aa'} theme={inputTheme} withIcon={true}/>
//         </StyledChat>;
//     }, [collapsed, items]);
//
//     const renderExpandIcon = useCallback(() => {
//         return <StyledExpandIcon fontSize={'small'} style={{color: '#ffffff'}}/>;
//     }, [collapsed]);
//
//     const renderCollapsed = useCallback(() => {
//         return <CollapsedChat onClick={onExpandClick}>
//             <Text theme={headerTextTheme} text={"Chat"}/>
//             {renderExpandIcon()}
//         </CollapsedChat>;
//     }, [collapsed]);
//
//     if (collapsed) {
//         return renderCollapsed();
//     }
//     return renderExpanded();
// };
//
// export default Chat;