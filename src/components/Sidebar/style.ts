import styled from "styled-components";

export const SiderbarWrapper = styled.div`
  top: 0;
  width: var(--sidebar-width);
  box-sizing: border-box;
  padding: 20px;
  background-color: var(--second);
  display: flex;
  flex-direction: column;
  box-shadow: inset -2px 0px 2px 0px rgb(0, 0, 0, 0.05);
  position: relative;
  transition: width ease 0.05s;

  .sidebar-header-bar {
    display: flex;
    margin-bottom: 20px;

    .sidebar-bar-button {
      flex-grow: 1;

      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }

  &:hover,
  &:active {
    .sidebar-drag {
      background-color: rgba($color: #000000, $alpha: 0.01);

      svg {
        opacity: 0.2;
      }
    }
  }
`;
