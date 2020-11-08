import React from 'react';
import './Home.scss';
import Button from '@material-ui/core/Button';
import { ping } from '@/apis';

export const Home: React.FC<{}> = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Button variant="contained" color="primary" onClick={() => ping().then(console.log)}>
        Click
      </Button>
    </div>
  );
};
