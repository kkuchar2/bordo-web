import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledEmailSent = styled(motion.div)`
  @media (max-width: 600px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .popup {
    border-radius: 6px;
    background: #323232;
    display: flex;
    flex-direction: column;
    padding: 30px 30px 30px;
    box-shadow: 20px 20px 20px 0 rgba(0, 0, 0, .4);

    @media (min-width: 600px) {
      width: 380px;
      position: relative;
    }

    @media (max-width: 600px) {
      width: 100%;
      height: 100%;
      border-radius: 0;
      align-items: center;
      justify-content: center;
    }

    .imageWrapper {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      img {
        transform: rotateZ(-44deg);
      }
    }


    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 20px;
      padding-bottom: 20px;
      color: #c1c1c1;
      font-size: 20px;
    }

    .description {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-top: 20px;
      padding-bottom: 20px;
      color: #c1c1c1;
      font-size: 15px;
    }

    .buttonGroup {
      height: 50px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const textThemeTitle = {
    textColor: "#bbbbbb",
    fontSize: "25px"
};

export const textThemeDescription = {
    textColor: "#bbbbbb",
    fontSize: "18px",
    margin: "20px 0px 20px 0px"
};