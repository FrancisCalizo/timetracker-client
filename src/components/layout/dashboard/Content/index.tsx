import React from 'react';

import classes from './Content.module.css';

export default function Content({ children }: any) {
  return <div className={classes['content-container']}>{children}</div>;
}
