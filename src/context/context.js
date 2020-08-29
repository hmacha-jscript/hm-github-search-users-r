import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';
const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos);
    const [followers, setFollowers] = useState(mockFollowers);
    const [error, setError] = useState({ show: false, msg: "" })

    //request loading
    const [requests, setRequests] = useState(0);
    const [loading, setLoading] = useState(false);

    //check rate
    const checkRequests = () => {
        axios(`${rootUrl}/rate_limit`).
            then(({ data }) => {
                const { rate: { remaining } } = data;
                setRequests(remaining)
                if (remaining === 0) {
                    toggleError(true, "Sorry request exceeded")
                }
            }).
            catch((err) => console.log(err))
    }

    //toggle Error
    const toggleError = (show, msg) => {
        setError({ show, msg })
    }

    //make a ajax request after component mounts
    useEffect(checkRequests, []);

    const searchGithubUser = async (user) => {
        //set loading true here
        setLoading(true)
        const response = await axios(`${rootUrl}/users/${user}`).catch(err => console.log(err))
        if (response) {
            setGithubUser(response.data)
            const { login, followers_url } = response.data;
            //repos
            await Promise.allSettled([axios(`${rootUrl}/users/${login}/repos?per_page=100`), axios(`${followers_url}?per_page=100`)]).
                then((results) => {
                    const [repos, followers] = results;
                    const status = "fulfilled";
                    if (repos.status === status) {
                        setRepos(repos.value.data)
                    }
                    if (followers.status == status) {
                        setFollowers(followers.value.data)
                    }
                }).catch(err => console.log(err))
            // set loading false here
            setLoading(false)
            setError(false)
        } else {
            toggleError(true, 'there is no user')
        }
    }

    const data = {
        githubUser,
        repos,
        followers,
        requests,
        error,
        searchGithubUser,
        loading
    }
    return (
        <GithubContext.Provider value={data}>
            {children}
        </GithubContext.Provider>
    )
}

export { GithubProvider, GithubContext }