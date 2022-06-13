import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;

  .icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    svg {
      color: var(--primary-200);
    }
  }
  .text {
    text-transform: capitalize;
    color: var(--white);
    letter-spacing: var(--letterSpacing);
  }
  .link-venue {
    color: var(--white);
  }

  .link-venue:hover {
    color: var(--primary-400);
  }
`;
export default Wrapper;
