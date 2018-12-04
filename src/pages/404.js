import React from 'react'
import styles from './404.less'
import { Icon } from 'antd';
import { connect } from 'dva';

export default () => {
  return (
  <div className={styles.error}>
    <Icon type="frown-o" />
    <h1>404 Not Found</h1>
  </div>
  );
}

