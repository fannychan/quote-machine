import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
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
    <div>
      <Header />
      <h1 style={{ margin: "0 auto", maxWidth: "890px" }}>{user}'s quotes</h1>
      <ul
        style={{
          padding: "10px 20px",
          listStyleType: "none",
          margin: "0 auto",
          maxWidth: "890px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        {user && data && data.quote.length > 0 ? (
          data?.quote.map((q) => {
            return (
              <Card
                key={q.author}
                submittedBy={user}
                quote={q.quote}
                author={q.author}
              ></Card>
            );
          })
        ) : (
          <p>No quotes could be found for this user</p>
        )}
      </ul>
    </div>
  );
};
