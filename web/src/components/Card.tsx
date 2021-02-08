import styled from "styled-components";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";

const StyledCard = styled.div`
  display: flex;
  background-color: white;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 16px 33px;
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
          padding: "20px",
        }}
      >
        <UserCircle
          height="35px"
          style={{ color: "#a28e8e", marginRight: "7px" }}
        />
        <p style={{ margin: 0 }}>{`${submittedBy}`}</p>
      </span>
      <div style={{ display: "flex", padding: "30px" }}>
        <div style={{ padding: "20px", width: "100%" }}>
          <h3>{author}</h3>

          <h2 style={{ fontWeight: 300 }}>{quote}</h2>
        </div>
      </div>
    </StyledCard>
  );
};
