import React, {useEffect, useState} from "react";

import {getRepos} from "./api";

type Repo = {
    id: number;
    name: string;
};

type Props = {
    orgName?: string;
    selected?: string;
    onSelect(repo: string): void;
}

const Repos: React.FC<Props> = ({selected, onSelect, orgName = "Blazemeter"}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [repos, setRepos] = useState([]);

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(e.target.value);
    };

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
        <select onChange={handleSelect} value={selected}>
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

