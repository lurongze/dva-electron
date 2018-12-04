import { connect } from 'dva';
import Link from 'umi/link';
import styles from './index.css';
import { Button, WingBlank, Card, InputItem, WhiteSpace } from 'antd-mobile';
function login({dispatch, data, loading}) {
  const isLoading = loading.global;
  return (
    <div className={styles.flexContainer}>
      <WingBlank>
        <Card>
          <WhiteSpace />
          <WingBlank>
            <InputItem
              type="text"
              placeholder="请输入用户名"
              onChange={(e)=>dispatch({type: 'login/inputChange', payload: {value: e, name: 'username'}})}
              value={data.username}
            >手机</InputItem>
            <InputItem
              type="password"
              placeholder="请输入密码"
              onChange={(e)=>dispatch({type: 'login/inputChange', payload: {value: e, name: 'password'}})}
              value={data.password}
            >密码</InputItem>
          </WingBlank>
          <WhiteSpace size="xl"/>
          <WingBlank>
            <Button loading={isLoading} type="primary" onClick={()=>dispatch({type:'login/login'})}>登录</Button>
          </WingBlank>
        </Card>
      </WingBlank>
      <WhiteSpace size="xl" />
      <WingBlank className={styles.footer}>
        <Link to='/'>返回首页</Link>
      </WingBlank>
      <WhiteSpace size="xl"/>
      <WhiteSpace size="xl"/>
      <WingBlank className={styles.footer}>
        <Link to='/register'>注册</Link>
      </WingBlank>
    </div>
  );
}

export default connect(state => {
  return {
    data: state.login,
    loading: state.loading
  };
})(login);
