import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import Moment from 'moment';
import React, {useCallback, useState} from 'react';
import ReactDOM from 'react-dom';

import DatePicker, {convertDate} from "./date-picker";
import Repos from './repos';
import User from './user';
import {setPRs} from './logic';
import './styles.css';

function App() {
    const [startDate, setStartDate] = useState(convertDate(Moment()));
    const [reviewers, setReviewers] = useState({});
    const [repo, setRepo] = useState(undefined);

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
        <div className="App container-fluid">
            <section className="justify-content-center row">
                <Repos selected={repo} onSelect={handleSelectRepo}/>
                <DatePicker startDate={startDate} onChange={setStartDate}/>
                <Button className="mx-3" onClick={handleGetPRs} disabled={!repo}>Get PRs</Button>
            </section>
            <section className="container">
                {_.size(reviewers) > 0 && (
                    <>
                        {_.map(reviewers, (value, key) => {
                            return <User username={key} prs={value} key={key}/>;
                        })}
                    </>
                )}
                <User username="liorbentov" prs={[]}/>
            </section>
        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App/>, rootElement);
