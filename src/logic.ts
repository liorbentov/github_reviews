import _ from "lodash";
import Moment from "moment";

import {getPRs, getReviews} from "./api";

type PR = {
    created_at: string;
    merged_at: string;
    number: number;
    closed_at?: string;
}

type Review = {
    state: string;
    user: {
        login: string;
    }
}

type GroupTuple = { [key: string]: Review[] }

export const getPRsData = async (repo: string, startDate: string) => {
    const start = Moment(startDate);
    const data: PR[] = await getPRs(repo);
    return data
        .filter(({created_at}) => Moment(created_at).isAfter(start))
        .filter(({closed_at, merged_at}) => closed_at && merged_at)
        .map(({number}) => number);
};

export const setPRs = async (repo: string, startDate: string, setReviewers: ({}) => void) => {
    const prsNumbers = await getPRsData(repo, startDate.toString());
    const data = await Promise.all(
        prsNumbers.map(async prNumber => {
            const reviews: Review[] = await getReviews(repo, prNumber);
            return reviews.filter(({state}) => state === "APPROVED");
        })
    );

    // map to object
    const objects: Review[] = data.map(value => value[0]);

    // group by user
    const grouped: GroupTuple = _.groupBy(objects, (obj?: Review) => {
        if (!obj) {
            return undefined;
        }

        return obj.user.login;
    });

    // Object.entries makes it => [username, PRs]
    const sorted = Object.entries(grouped)
        .sort((a, b) => (a[1].length <= b[1].length ? 1 : -1))
        .reduce((acc, pair) => {
            acc[pair[0]] = pair[1];
            return acc;
        }, {});

    setReviewers(sorted);
};