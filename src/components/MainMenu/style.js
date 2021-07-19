import {motion} from "framer-motion";
import styled from "styled-components";

export const StyledMainMenu = styled(motion.div)`
  color: #c4c4c4;
  width: 400px;
  height: 400px;
  background: #1d1d1d;
  border-radius: 8px;

  .accountInfo {
    margin: 20px;
    align-items: center;

    display: flex;
    flex-direction: row;

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
  }
  
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

      .menuItem {
        display: flex;
        flex-direction: row;
        align-items: center;

        width: 95%;
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
      }
    }
  }
`;
