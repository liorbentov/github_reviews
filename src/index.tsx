import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Moment from 'moment';
import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';

import Repos from './repos';
import User from './user';
import {setPRs} from './logic';
import './styles.css';

const convertDate = (momentDate: Moment.Moment) => momentDate.format('YYYY-MM-DD');

function App() {
    const [startDate, setStartDate] = useState(convertDate(Moment()));
    const [reviewers, setReviewers] = useState({});
    const [repo, setRepo] = useState(undefined);

    const maxDate = convertDate(Moment());

    const handleGetPRs = async () => {
        await setPRs(repo!, startDate, setReviewers);
    };

    const handleSelectRepo = useCallback(
        selectedRepo => {
            setRepo(selectedRepo);
        },
        []
    );

    return (
        <div className="App">
            <Repos selected={repo} onSelect={handleSelectRepo}/>
            <input
                type="date"
                value={startDate}
                max={maxDate}
                onChange={e => setStartDate(e.target.value)}
            />
            <Button onClick={handleGetPRs}>Get PRs</Button>
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

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);
