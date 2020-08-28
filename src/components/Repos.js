import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';

const chartData = [
  {
    label: "HTML",
    value: "13"
  },
  {
    label: "CSS",
    value: "18"
  },
  {
    label: "JavaScript",
    value: "28"
  },
  {
    label: "NodeJs",
    value: "19"
  },
];

const Repos = () => {
  const { repos } = useContext(GithubContext);

  return (
    <ExampleChart data={chartData} />
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;