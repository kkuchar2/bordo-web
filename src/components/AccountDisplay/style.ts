import {Link} from "react-router-dom";
import styled from "styled-components";

export const StyledAccountInfo = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    flex-direction: row;
    padding: 5px;
    margin-left: auto;
  }
`;

export const StyledNameAndEmail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-left: 20px;
`;

export const StyledLogout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  color: #d7d7d7;
  margin-top: 5px;

  &:hover {
    color: #EAEAEA;
  }
`;

export const StyledExitLink = styled(Link)`
  font-size: 0.8em;
  margin-left: 3px;
  color: #d7d7d7;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    color: #EAEAEA;
  }
`;

export const StyledAccountEmailAndPicture = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  @media (max-width: 600px) {
    flex-direction: row;
  }

  .profileDetails {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const emailTextTheme = (isMobile: boolean) => {
    return {
        textColor: "#dadada",
        fontSize: isMobile ? "1em" : "0.8em",
        fontWeight: 400,
    };
};

export const nameTextTheme = (isMobile: boolean) => {
    return {
        textColor: "#EAEAEA",
        fontSize: isMobile ? "1em" : "1em",
        fontWeight: 500,
    };
};