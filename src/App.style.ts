import styled from "styled-components";

export const AppWrapper = styled.div`
  background-color: var(--white);
  border: var(--border-in-light);
  border-radius: 20px;
  box-shadow: var(--shadow);
  color: var(--black);
  background-color: var(--white);
  min-width: 600px;
  min-height: 370px;
  max-width: 1200px;

  display: flex;
  overflow: hidden;
  box-sizing: border-box;

  width: var(--window-width);
  height: var(--window-height);

  .window-content {
    width: var(--window-content-width);
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;
