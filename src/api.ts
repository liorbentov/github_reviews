const BASE_GITHUB_API_URL = 'https://api.github.com';
const ORG_NAME = 'Blazemeter';

const token = process.env.REACT_APP_PRIVATE_TOKEN;

export const getData = async (url: string) => {
    const response = await fetch(url, {
        headers: { Authorization: `Basic ${token}` },
    });
    return response.json();
};

export const getRepos = async (orgName: string, perPage: number = 100) => {
    const url = `${BASE_GITHUB_API_URL}/orgs/${orgName}/repos?per_page=${perPage}`;
    return await getData(url);
};

export const getPRs = async (repo: string, perPage = 100) => {
    const url = `${BASE_GITHUB_API_URL}/repos/${ORG_NAME}/${repo}/pulls?state=close&per_page=${perPage}`;
    return await getData(url);
};

export const getReviews = async (repo: string, prNumber: number) => {
    const url = `${BASE_GITHUB_API_URL}/repos/${ORG_NAME}/${repo}/pulls/${prNumber}/reviews`;
    return await getData(url);
};

export const getUser = async (login: string) => {
    const url = `${BASE_GITHUB_API_URL}/users/${login};`;
    const response = await fetch(url);
    return response.json();
};
