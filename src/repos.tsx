import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, OptionsType, ValueType } from 'react-select';

import { getRepos } from './api';

type Repo = {
    id: number;
    name: string;
};

type Props = {
    orgName?: string;
    selected?: string;
    onSelect(repo: string | null): void;
};

const Repos: React.FC<Props> = ({ selected, onSelect, orgName = 'Blazemeter' }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [repos, setRepos] = useState([]);

    const handleSelect = (value: ValueType<Repo>, __: ActionMeta) => {
        onSelect((value as Repo).name);
    };

    useEffect(() => {
        setIsLoading(true);
        getRepos(orgName).then(repositories => {
            setIsLoading(false);
            setRepos(repositories);
        });
    }, [1]);

    if (isLoading) {
        return <>Loading...</>;
    }

    const options: OptionsType<Repo> = repos.map((repo: Repo) => ({
        id: repo.id,
        name: repo.name,
    }));

    return (
        <Select
            isSearchable={true}
            onChange={handleSelect}
            value={options.filter(({ name }) => name === selected)}
            getOptionLabel={({ name }) => name}
            getOptionValue={({ name }) => name}
            options={options}
        />
    );
};

export default Repos;
