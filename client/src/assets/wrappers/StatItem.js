import styled from "styled-components";

const Wrapper = styled.article`
  padding: 2rem;
  background: var(--black);
  border-radius: var(--borderRadius);

  .requested {
    color: var(--primary-500);
  }
  .booked {
    color: #9be80c;
  }
  .completed {
    color: #199eff;
  }
  .canceled {
    color: var(--red-middle);
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .value {
    display: block;
    font-weight: 700;
    font-size: 50px;
  }
  .title {
    margin: 0;
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: left;
    margin-top: 0.5rem;
  }
  .icon {
    width: 70px;
    height: 60px;
    background: ${(props) => props.bcg};
    border-radius: var(--borderRadius);
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 2rem;
    }
  }
`;

export default Wrapper;
