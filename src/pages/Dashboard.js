import React, { useContext } from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
import { MdRestaurant } from 'react-icons/md';

const Dashboard = () => {
  const { loading } = useContext(GithubContext);

  if (loading) {
    return (
      <main className="main">
        <Navbar />
        <Search />
        <div className="loading-img">
          <img src={loadingImage} alt="loading" />
        </div>
      </main>
    )
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
