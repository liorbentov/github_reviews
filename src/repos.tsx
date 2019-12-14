import React, { CSSProperties, useEffect, useState } from 'react';
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

const customStyles = {
    control: (provided: CSSProperties) => ({
        ...provided,
        width: 200,
    }),
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
    }, [orgName]);

    const options: OptionsType<Repo> = repos.map((repo: Repo) => ({
        id: repo.id,
        name: repo.name,
    }));

    return (
        <div className="repository-picker px-3 col-2">
            <span>Repository:</span>
            <Select
                isLoading={isLoading}
                isSearchable={true}
                onChange={handleSelect}
                value={options.filter(({ name }) => name === selected)}
                getOptionLabel={({ name }) => name}
                getOptionValue={({ name }) => name}
                options={options}
                styles={customStyles}
            />
        </div>
    );
};

export default Repos;
