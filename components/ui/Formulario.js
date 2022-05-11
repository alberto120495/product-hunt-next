import styled from "styled-components";

const Formulario = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;

  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    padding: 2rem;
  }
`;

const Campo = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  input,
  textarea {
    flex: 1;
    padding: 1rem;
    outline: none;
  }

  textarea {
    height: 100px;
  }
`;

const InputSubmit = styled.input`
  background-color: var(--naranja);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  border: none;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 1.4rem;
  font-weight: 700;
  text-align: center;
  margin-top: 2rem 0;
`;

export { Formulario, Campo, InputSubmit, Error };
