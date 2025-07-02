import styled from 'styled-components'

export const ListPost = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const PostItem = styled.li`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
`