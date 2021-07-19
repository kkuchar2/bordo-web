import {Link} from "react-router-dom";
import styled from "styled-components";

export const StyledNotFound = styled.div`
  background: #262626;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledNotFoundTextWithIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const StyledLink = styled(Link)`
  color: #cbcbcb;
  position: relative;
  margin-left: 10px;
  margin-bottom: 2px;
  font-size: 1.2em;
  &:hover {
    color: #00a6ff;
  }
`;

export const textTheme = {
    textColor: "#a3a3a3",
    fontSize: "20px"
};