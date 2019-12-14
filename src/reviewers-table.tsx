import React from 'react';
import Table from 'react-bootstrap/Table';

import User, { userPRs } from './user';

type Props = {
    reviewers: userPRs[];
};

const ReviewersTable: React.FC<Props> = ({ reviewers }) => {
    if (reviewers.length === 0) {
        return null;
    }

    return (
        <Table striped={true} bordered={true} hover={true} className="reviewers-table">
            <thead className="thead-dark">
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th># Reviews</th>
                    <th>PRs Links</th>
                </tr>
            </thead>
            <tbody>
                {reviewers.map((value, index) => {
                    return <User key={index} {...value} asTableRow={true} />;
                })}
            </tbody>
        </Table>
    );
};

export default ReviewersTable;
