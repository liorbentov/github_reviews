import Moment from 'moment';
import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';

import DatePicker, { convertDate } from './date-picker';
import InteractiveButton from './interactive-button';
import Repos from './repos';
import ReviewersTable from './reviewers-table';
import { userPRs } from './user';
import { setPRs } from './logic';
import './styles.css';

function App() {
    const [startDate, setStartDate] = useState(convertDate(Moment()));
    const [reviewers, setReviewers] = useState([] as userPRs[]);
    const [repo, setRepo] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetPRs = async () => {
        setIsLoading(true);
        await setPRs(repo!, startDate, setReviewers);
        setIsLoading(false);
    };

    const handleSelectRepo = useCallback(selectedRepo => {
        setRepo(selectedRepo);
    }, []);

    return (
        <div className="App container-fluid">
            <section className="justify-content-center row align-items-end sticky-top bg-light mb-3 p-3">
                <Repos selected={repo} onSelect={handleSelectRepo} />
                <DatePicker startDate={startDate} onChange={setStartDate} />
                <InteractiveButton
                    isLoading={isLoading}
                    text="Get PRs"
                    onClick={handleGetPRs}
                    className="mx-3 col-1"
                    disabled={!repo}
                />
            </section>
            <section className="container reviewers-container">
                <ReviewersTable reviewers={reviewers} />
            </section>
        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
