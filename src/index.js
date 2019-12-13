import _ from "lodash";
import React, {useState} from "react";
import ReactDOM from "react-dom";
import Moment from "moment";

import Repos from "./repos";
import {User} from "./user";
import {setPRs} from "./logic";
import "./styles.css";

const convertDate = momentDate => momentDate.format("YYYY-MM-DD");

function App() {
    const [startDate, setStartDate] = useState(convertDate(Moment()));
    const [reviewers, setReviewers] = useState({});

    const maxDate = convertDate(Moment());

    const handleGetPRs = async () => {
        await setPRs(startDate.toString(), setReviewers);
    };

    return (
        <div className="App">
            <Repos/>
            <input
                type="date"
                value={startDate}
                max={maxDate}
                onChange={e => setStartDate(e.target.value)}
            />
            <button onClick={handleGetPRs}>Get PRs</button>
            {_.size(reviewers) > 0 && (
                <>
                    {_.map(reviewers, (value, key) => {
                        return <User username={key} prs={value} key={key}/>;
                    })}
                </>
            )}
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);

