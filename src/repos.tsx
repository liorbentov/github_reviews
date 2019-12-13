import React, {useEffect, useState} from "react";

import {getRepos} from "./api";

type Repo = {
    id: number;
    name: string;
};

const Repos: React.FC<{ orgName: string; token: string }> = ({orgName = "Blazemeter"}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        getRepos(orgName).then(repositories => {
            setIsLoading(false);
            setRepos(repositories);
        });
    }, [1]);

    if (isLoading) {
        return <>"Loading..."</>;
    }

    return (
        <select>
            {repos.map((value: Repo) => {
                return (
                    <option key={value.id} value={value.name}>
                        {value.name}
                    </option>
                );
            })}
        </select>
    );
};

export default Repos;

