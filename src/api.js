const BASE_GITHUB_API_URL = "https://api.github.com";
const BASE_URL = "https://api.github.com/repos/Blazemeter/v3";

const token = process.env.REACT_APP_PRIVATE_TOKEN;

export const getData = async (url) => {
    const response = await fetch(url, {
        headers: {Authorization: `Basic ${token}`}
    });
    return response.json();
};

export const getRepos = async (orgName, perPage = 100) => {
    const url = `${BASE_GITHUB_API_URL}/orgs/${orgName}/repos?per_page=${perPage}`;
    return await getData(url);
};

export const getPRs = async (perPage = 100) => {
    const url = `${BASE_URL}/pulls?state=all&per_page=${perPage}`;
    return await getData(url);
};

export const getReviews = async (prNumber) => {
    const url = `${BASE_URL}/pulls/${prNumber}/reviews`;
    return await getData(url);
};

export const getUser = async login => {
    const response = await fetch("https://api.github.com/users/" + login);
    return response.json();
};

