const BASE_GITHUB_API_URL = "https://api.github.com";
const BASE_URL = "https://api.github.com/repos/Blazemeter/v3";

export const getData = async (url, token) => {
  const response = await fetch(url, {
    headers: { Authorization: `Basic ${token}` }
  });
  return response.json();
};

export const getRepos = async (orgName, token, perPage = 100) => {
  const url = `${BASE_GITHUB_API_URL}/orgs/${orgName}/repos?per_page=${perPage}`;
  return await getData(url, token);
};

export const getPRs = async (token, perPage = 100) => {
  const url = `${BASE_URL}/pulls?state=all&per_page=${perPage}`;
  return await getData(url, token);
};

export const getReviews = async (token, prNumber) => {
  const url = `${BASE_URL}/pulls/${prNumber}/reviews`;
  return await getData(url, token);
};

export const getUser = async login => {
  const response = await fetch("https://api.github.com/users/" + login);
  return response.json();
};

