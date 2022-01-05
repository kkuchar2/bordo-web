import styled from "styled-components";

export const StyledConfirmPage = styled.div`
  height: 100%;
  width: 100%;
  background: #343434;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.full {
    height: 100%;
    width: 100%;
    color: #eaeaea;
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
    color: #eaeaea;

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
    color: #eaeaea;
    font-size: 16px;
    width: 200px;
    border-radius: 100px;
    height: 40px;
    margin-top: 20px;
    font-weight: 700;

    &:hover {
      font-weight: 700;
    }
  }
`;

export const StyledConfirmPageTop = styled.div`
  height: 300px;
  width: 100%;
  background: #2c2c2c;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding-left: 30px;
  box-sizing: border-box;
`;

export const textTheme = {
    textColor: "#d7d7d7",
    fontSize: "1em",
    textAlign: "center",
    fontWeight: 600,
    margin: "0px 0px 0px 0px"
};

export const errorTextTheme = {
    textColor: "#ff3c3c",
    fontSize: "1em",
    textAlign: "center",
    fontWeight: 600,
    margin: "0px 0px 0px 0px"
};