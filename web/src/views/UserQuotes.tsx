import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { UserCircle } from "@styled-icons/boxicons-solid/UserCircle";
import { ListItem } from "../components/ListItem";
import { Card } from "../components/Card";
import { Quote } from "../models/Model";

interface QUOTE_BY_SUBMITTER {
  quote: Quote[];
}
export const GET_QUOTE_BY_SUBMITTER = gql`
  query Quote($submittedBy: String!) {
    quote(submittedBy: $submittedBy) {
      author
      quote
      submittedBy
    }
  }
`;

export const UserQuotes = () => {
  const { user } = useParams<Record<string, string | undefined>>();

  const { loading, error, data, refetch } = useQuery<QUOTE_BY_SUBMITTER>(
    GET_QUOTE_BY_SUBMITTER,
    {
      variables: { submittedBy: user },
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    }
  );

  return (
    <div style={{ backgroundColor: "#F4F5F7" }}>
      <Header />
      <div style={{ margin: "0 auto", display: "flex", maxWidth: "764px" }}>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <UserCircle height="50px" />
          <p>{user}</p>
        </div>
        <ul style={{ padding: "10px 20px", listStyleType: "none", margin: 0 }}>
          {data && data.quote.length > 0 ? (
            data?.quote.map((q) => {
              return <ListItem text={q.quote} author={q.author}></ListItem>;
            })
          ) : (
            <p>No quotes could be found for this user</p>
          )}
        </ul>
      </div>
      <div>
        {user && data && data.quote.length > 0 ? (
          data?.quote.map((q) => {
            return (
              <Card submittedBy={user} quote={q.quote} author={q.author}></Card>
            );
          })
        ) : (
          <p>No quotes could be found for this user</p>
        )}
      </div>
    </div>
  );
};
