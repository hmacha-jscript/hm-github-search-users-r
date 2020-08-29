import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
// import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
import { Pie3D } from './Charts';

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
    value: "21"
  },
];

const Repos = () => {
  const { repos } = useContext(GithubContext);
  let m = new Map();
  let count = 0;
  repos.forEach((item) => {
    if (m.has(item.language)) {
      m.set(item.language, m.get(item.language) + 1)
    } else {
      m.set(item.language, count + 1)
    }
  })
  let entries = Array.from(m);
  let max = 0;
  let lan = ""
  entries.forEach((item) => {
    if (max < item[1]) {
      max = item[1]
      lan = item[0]
    }
  })
  return (
    <Pie3D data={chartData} />
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
