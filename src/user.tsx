import React from 'react';
import Avatar from 'react-avatar';

type PR = {
    id: number;
    pull_request_url: string;
};

export type userPRs = {
    username?: string;
    prs: PR[];
};

export const User: React.FC<userPRs & { asTableRow?: boolean }> = ({
    username,
    prs,
    asTableRow,
}) => {
    if (username === 'undefined') {
        return null;
    }

    if (asTableRow) {
        return (
            <tr>
                <td>
                    <Avatar githubHandle={username} round="10px" />
                </td>
                <td>{username}</td>
                <td>{prs.length}</td>
                <td>
                    {prs.map(({ id, pull_request_url }) => {
                        return <PR key={id} url={pull_request_url} />;
                    })}
                </td>
            </tr>
        );
    }

    return (
        <div className="reviewer row mb-2">
            <Avatar githubHandle={username} round="10px" />
            <span className="col-2">{username}</span>
            <span className="col-1">{prs.length}</span>
            <section className="pull-requests col-6">
                {prs.map(({ id, pull_request_url }) => {
                    return <PR key={id} url={pull_request_url} />;
                })}
            </section>
        </div>
    );
};

const PR: React.FC<{ url: string }> = ({ url }) => {
    const prNumber = url.match(/\d+$/);
    const href = 'https://github.com/Blazemeter/v3/pull/' + prNumber;
    return <a href={href}>{prNumber}</a>;
};

export default User;
