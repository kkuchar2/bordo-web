import {motion} from "framer-motion";
import {Responsive, WidthProvider} from "react-grid-layout";
import styled from "styled-components";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

export const StyledTile = styled(motion.div)`
  background: url("https://crhscountyline.com/wp-content/uploads/2020/03/Capture.png");
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c4c4c4;
  border-radius: 10px;
  overflow: hidden;

  &:hover {
    cursor: pointer;
    background: url("https://crhscountyline.com/wp-content/uploads/2020/03/Capture.png");
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
`;

export const StyledDashboardPage = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const StyledDashboardContent = styled.div`
  box-sizing: border-box;
  //border: 1px solid red;
  background: #2a2a2a;
  padding: 20px;
  min-width: 600px;
  display: flex;
  flex-direction: row;
  height: 100%;
`;


export const StyledResponsiveReactGridLayout = styled(ResponsiveReactGridLayout)`
  width: 100%;
  background: #1a1a1a;
  margin-left: 10px;
  border-radius: 10px;
  padding: 20px;
`;

export class StyledLeftMenu {
}