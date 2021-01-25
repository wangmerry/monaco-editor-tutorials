import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';
import './index.less';

const Home: React.FC = () => {
  const pages = [
    {
      title: 'CustomAction',
      to: '/custom-action',
    },
    {
      title: 'Formatting',
      to: '/formatting',
    },
    {
      title: 'IntelliSense',
      to: '/intellisense',
    },
    {
      title: 'Theme',
      to: '/theme',
    },
    {
      title: 'Snippet',
      to: '/snippet',
    },
    {
      title: 'Syntax Verify',
      to: '/syntax-verify',
    },
    {
      title: 'Syntax Extend',
      to: '/syntax-extend',
    },
    {
      title: 'Command',
      to: '/command',
    },
  ];

  return (
    <div className={styles.container}>
      <h1>Welcome to Monaco Editor Example</h1>
      <ul>
        {pages.map(_ => (
          <li key={_.to}>
            <Link to={_.to}>{_.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
