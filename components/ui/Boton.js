import styled from "styled-components";

const Boton = styled.a`
  background-color: ${(props) => (props.bgColor ? "#DA552F" : "white")};
  color: ${(props) => (props.bgColor ? "white" : "#000")};
  border: 1px solid #d1d1d1;
  font-weight: 700;
  margin-right: 1rem;
  padding: 0.8rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &::last-of-type {
    margin-right: 0;
  }
`;

export default Boton;
