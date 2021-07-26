import styled from "styled-components";

export const StyledAccountInfo = styled.div`
  margin: 20px;
  align-items: center;

  display: flex;
  flex-direction: column;

  .profilePicture {
    border-radius: 100%;
  }

  .profileDetails {
    box-sizing: border-box;
    margin-left: 10px;

    .profileName {
      font-size: 18px;
      color: #eeeeee;
    }

    .profileEmail {
      margin-top: 2px;
      font-size: 15px;
      color: #777777;
    }
  }
`;

export const StyledAccountEmailAndPicture = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const emailTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "16px"
};