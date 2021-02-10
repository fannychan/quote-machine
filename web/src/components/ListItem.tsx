import styled from "styled-components";

interface Props {
  text: string;
  author: string;
}

const StyledListItem = styled.li`
  border: 1px solid grey;
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 10px;
  background-color: white;
  color: black;
`

export const ListItem = ({text, author}: Props) => {

  return (
    <StyledListItem>
      <p>{author}</p>
      <p>"{text}"</p>

    </StyledListItem>

  )
};
