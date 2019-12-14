import React from 'react';
import Avatar from 'react-avatar';

type PR = {
    id: number;
    pull_request_url: string;
};

type userPRs = {
    username?: string;
    prs: PR[];
};

export const User: React.FC<userPRs> = ({username, prs}) => {
    if (username === 'undefined') {
        return null;
    }

    return (
        <div className="reviewer row">
            <Avatar githubHandle={username} size="50" round="10px" className="col"/>
            <span className="col">{username}</span>
            <span className="col">{prs.length}</span>
            <section className="pull-requests col">
                {prs.map(({id, pull_request_url}) => {
                    return <PR key={id} url={pull_request_url}/>;
                })}
            </section>
        </div>
    );
};

const PR: React.FC<{ url: string }> = ({url}) => {
    const prNumber = url.match(/\d+$/);
    const href = 'https://github.com/Blazemeter/v3/pull/' + prNumber;
    return <a href={href}>{prNumber}</a>;
};

export default User;
