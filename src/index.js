import _ from "lodash";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Moment from "moment";

import Repos from "./repos";
import { User } from "./user.tsx";
import { getPRs, getReviews } from "./api";
import "./styles.css";

const convertDate = momentDate => momentDate.format("YYYY-MM-DD");

function App() {
  const [token, setToken] = useState("");
  const [startDate, setStartDate] = useState(convertDate(Moment()));
  const [reviewers, setReviewers] = useState({});

  const maxDate = convertDate(Moment());

  const getPRsData = async () => {
    const start = Moment(startDate);
    const data = await getPRs(token);
    return data
      .filter(({ created_at }) => Moment(created_at).isAfter(start))
      .filter(({ closed_at, merged_at }) => closed_at && merged_at)
      .map(({ number }) => number);
  };

  const handleGetPRs = async () => {
    const prsNumbers = await getPRsData();
    const data = await Promise.all(
      prsNumbers.map(async prNumber => {
        const reviews = await getReviews(token, prNumber);
        return reviews.filter(({ state }) => state === "APPROVED");
      })
    );

    // map to object
    const objects = data.map(value => value[0]);

    // group by user
    const groupped = _.groupBy(objects, obj => {
      if (!obj) {
        return undefined;
      }

      return obj.user.login;
    });

    // Object.entries makes it => [username, PRs]
    const sorted = Object.entries(groupped)
      .sort((a, b) => (a[1].length <= b[1].length ? 1 : -1))
      .reduce((acc, pair) => {
        acc[pair[0]] = pair[1];
        return acc;
      }, {});

    setReviewers(sorted);
  };

  return (
    <div className="App">
      <Repos />
      <input
        type="date"
        value={startDate}
        max={maxDate}
        onChange={e => setStartDate(e.target.value)}
      />
      <input value={token} onChange={e => setToken(e.target.value)} />
      <button onClick={handleGetPRs}>Get PRs</button>
      {_.size(reviewers) > 0 && (
        <>
          {_.map(reviewers, (value, key) => {
            return <User username={key} prs={value} key={key} />;
          })}
        </>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

