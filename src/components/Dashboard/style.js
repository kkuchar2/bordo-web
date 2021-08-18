import {motion} from "framer-motion";
import {Responsive, WidthProvider} from "react-grid-layout";
import styled from "styled-components";

export const StyledDashboard = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

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

export const StyledResponsiveReactGridLayout = styled(ResponsiveReactGridLayout)`
  width: 100%;
`;