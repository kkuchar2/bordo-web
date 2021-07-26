import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledMenuItem = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 60px;
  border-bottom: 1px solid #353535;

  &:hover {
    cursor: pointer;
    background: #ffffff11;

    .menuItemText {
      color: #d6d6d6;
    }
  }

  .iconWrapper {
    width: 25px;
    height: 25px;
    margin-left: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding: 7px;
    border-radius: 12px;

    .icon {
      font-size: 15px;
      color: #ffffff
    }
  }

  .menuItemText {
    margin-left: 15px;
    font-size: 15px;
    color: #999999;
  }
`;