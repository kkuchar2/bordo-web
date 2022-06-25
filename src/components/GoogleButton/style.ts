import styled from "styled-components";

export const StyledGoogleButton = styled.button`
  padding: 0;
  width: 300px;
  height: 42px;
  background-color: #4285f4;
  color: #fff;
  border: none;
  border-radius: 1px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 6px #4285f4;
  }

  &:active {
    background: #1669F2;
  }
`;

export const GoogleIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const GoogleIconWrapper = styled.div`
  margin: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GoogleTextWrapper = styled.div`
  height: 100%;
  flex: 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledGoogleButtonText = styled.span`
  font-size: 14px;
  letter-spacing: 0.2px;
  font-weight: bold;
`;