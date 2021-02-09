import styled from "styled-components";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";

const StyledCard = styled.li`
  display: flex;
  background-color: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 33px;
  color: black;
`;

interface Props {
  submittedBy: string;
  author: string;
  quote: string;
}

export const Card = ({ submittedBy, author, quote }: Props) => {
  return (
    <StyledCard
      style={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #e2e2e2",
          padding: "15px",
        }}
      >
        <UserCircle
          height="35px"
          style={{ color: "#a28e8e", marginRight: "7px" }}
        />
        <p style={{ margin: 0 }}>{`${submittedBy}`}</p>
      </span>
      <div style={{ padding: "15px 30px" }}>
        <p style={{ fontWeight: 400, marginBottom: '25px' }}>{quote}</p>
        <p>{author}</p>
      </div>
    </StyledCard>
  );
};
