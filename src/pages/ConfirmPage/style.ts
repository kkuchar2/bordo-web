import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledConfirmPage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const StyledConfirmPopup = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  background: #323232;
  padding: 20px 10px 20px 10px;
  box-shadow: 20px 20px 20px 0 rgba(0, 0, 0, .4);
  border-radius: 6px;

  &.full {
    height: 100%;
    width: 100%;
    color: white;
  }

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    margin-left: 10px;
    margin-right: 10px;
  }

  .confirmationMessage {
    margin-top: 20px;
    color: white;

    .title {
      text-align: center;
      font-size: 15pt;
    }

    .message {
      text-align: center;
      margin-top: 10px;
      font-size: 12pt;
    }
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    text-decoration: none;
    white-space: nowrap;
    color: white;
    font-size: 16px;
    background: #404040;
    width: 200px;
    border-radius: 100px;
    height: 40px;
    margin-top: 20px;

    &:hover {
      background: #4562d4;
    }
  }
`;