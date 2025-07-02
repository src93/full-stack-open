import styled from 'styled-components'

export const ContentForm = styled.div`
  width: 35vw;
  padding: 1rem;
`

export const FormNewPostCustom = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
`

export const InputCustom = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

export const ButtonCreate = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    background-color: #0056b3;
  }
`