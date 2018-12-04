import { connect } from 'dva';
import Link from 'umi/link';
import { Button, Icon } from 'antd-mobile';
import styles from './index.css';
import { webWork } from '@/utils/index';

function Index({ dispatch, global, loading }) {

  const list = global.list || [] ;

  const scroll = (event) => {
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = event.target.scrollTop;
    const isBottom = (clientHeight + scrollTop === scrollHeight);
    if (isBottom && !loading.global) {
      dispatch({
        type: 'cosplay/getList'
      })
    }
  };

  const clickItem = () => {
    // webWork.postMessage('eeeee');
  };

  return (
    <div className='page' onScroll={scroll}>
      <div className={styles.flexContainer}>
        { list && list.map((item)=>{
          return (
            <div className={styles.flexItem} key={`${item.id}${item.gallery_id}`}>
              <img className={styles.image} src={item.gallery_cover} />
              <div className={styles.title}>{item.gallery_title}</div>
            </div>
          )
        })}
      </div>
      {
        loading && (
          <div className={styles.loading}>
            <Icon type={'loading'}/>
          </div>
        )
      }
    </div>
  );
}

export default connect(state => {
  return {
    global: state.cosplay,
    loading: state.loading
  };
})(Index);
