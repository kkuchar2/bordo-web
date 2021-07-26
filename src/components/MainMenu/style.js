import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledMainMenu = styled(motion.div)`
  color: #c4c4c4;
  width: 400px;
  height: 400px;
  background: #1d1d1d;
  border-radius: 8px;
  
  .menuSection {
    width: 100%;
    display: flex;
    flex-direction: column;

    .menuName {
      padding: 20px;
      font-size: 15px;
      color: #777777;
    }

    .menuItems {
      display: flex;
      flex-direction: column;
    }
  }
`;
