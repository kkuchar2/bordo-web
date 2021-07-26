import styled from "styled-components";
import {motion} from "framer-motion";

export const titleTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "25px"
};

export const descriptionTextTheme = {
    textColor: "#bbbbbb",
    fontSize: "15px"
};

export const StyledConfirmationDialog = styled(motion.div)`
  max-width: 500px;
  max-height: 200px;
  width: 450px;
  height: 200px;
  background: #1a1a1a;
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

export const StyledDialogTitleSection = styled.div`
  //background: red;
  padding: 20px;
`;

export const StyledDialogDescriptionSection = styled.div`
  //background: green;
  height: 100px;
  padding: 20px;
`;

export const StyledDialogButtonsSection = styled.div`
  //background: blue;
  flex: 1 0;
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
  padding: 20px;
`;
