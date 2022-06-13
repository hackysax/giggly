import styled from "styled-components";

const Wrapper = styled.article`
  background: var(--grey-700);
  border-radius: var(--borderRadius);
  display: grid;
  grid-template-rows: 1fr auto;
  box-shadow: var(--shadow-2);

  header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--grey-900);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    h5 {
      letter-spacing: 0;
    }
  }
  .main-icon {
    width: 60px;
    height: 60px;
    display: grid;
    place-items: center;
    //background: var(--primary-500);
    border-radius: var(--borderRadius);
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    //color: var(--black);
    margin-right: 2rem;
  }
  .info {
    h5 {
      margin-bottom: 0.25rem;
      color: var(--white);
    }
    p {
      margin: 0;
      text-transform: uppercase;
      color: var(--white);
      letter-spacing: var(--letterSpacing);
    }
  }
  .requested {
    background: var(--primary-500);
    color: var(--black);
  }
  .booked {
    background: #9be80c;
    color: var(--black);
  }
  .completed {
    background: #199eff;
    color: var(--black);
  }
  .canceled {
    color: var(--white);
    background: var(--black);
  }

  .genre {
    color: purple;
    background: pink;
  }
  .content {
    padding: 1rem 1.5rem;
  }
  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;
    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }
    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }
  footer {
    margin-top: 1rem;
  }
  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
  }
  .edit-btn {
    color: var(--primary-900);
    background: var(--primary-400);
    margin-right: 0.5rem;
  }
  .delete-btn {
    color: var(--red-middle);
    background: var(--red-light);
  }
  &:hover .actions {
    visibility: visible;
  }
`;

export default Wrapper;
