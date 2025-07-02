import styled from 'styled-components'

export const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0.1);
  margin-bottom: 1rem;
`

export const MenuNav = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
`

export const MenuItem = styled.li`
  font-weight: bold;
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`

export const LogoutButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 0.25rem;
  &:hover {
    background-color: #c82333;
  }
`