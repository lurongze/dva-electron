import { connect } from 'dva';
import Link from 'umi/link';
import { Icon } from 'antd-mobile';
import styles from './index.css';
import { helper } from '@/utils/index';

function Index({ dispatch, global, loading }) {

  const list = global.list || [] ;

  const scroll = (event) => {
    const clientHeight = event.target.clientHeight;
    const scrollHeight = event.target.scrollHeight;
    const scrollTop = event.target.scrollTop;
    const isBottom = (clientHeight + scrollTop === scrollHeight);
    console.log('is bottom:' + isBottom, loading);
    if (isBottom && !loading.global) {
      dispatch({
        type: 'global/getList'
      })
    }
  };

  const clickItem = () => {
    console.log('process.env', process.env);
  };

  const clickTitle = () => {
  };

  return (
    <div className='page' onScroll={helper.debounce(scroll)}>
      <div className={styles.flexContainer}>
        { list && list.map((item)=>{
          return (
            <div className={styles.flexItem} key={`${item.id}${item.item_id}`}>
              <Link to='/login'>
                <img className={styles.image} src={item.item_picture} />
              </Link>
              <div onClick={clickItem} className={styles.price}>价格:￥{item.item_price}</div>
              <div onClick={clickTitle} className={styles.title}>{item.item_name}</div>
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
    global: state.global,
    loading: state.loading
  };
})(Index);
