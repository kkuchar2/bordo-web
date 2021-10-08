import styled from "styled-components";

export const messageTextTheme = {
    textColor: 'black',
    maxWidth: "260px",
    maxHeight: "300px",
    textAlign: 'left',
    fontSize: '0.9em',
    overflowY: 'auto',
    wordWrap: 'break-word'
};

export const StyledMessageTextWrapper = styled.div`
  background: rgba(208, 208, 208, 0.47);
  margin-left: 10px;
  padding: 20px;
  border-radius: 10px;
`;

export const StyledChatMessageItem = styled.div`
  width: 100%;
  min-height: 10px;
  background: white;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 10px;
  box-sizing: border-box;
`;