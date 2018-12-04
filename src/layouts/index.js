import { connect } from "dva";
import { NavBar, Icon } from "antd-mobile";
import router from "umi/router";
import withRouter from "umi/withRouter";
import styles from './index.css';

function BasicLayout(props) {
  const openPages = ['/login', '/register'];
  if (openPages && openPages.includes(props.pathname)) {
    return (
      <div> {props.children}</div>
    );
  }
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <NavBar
          mode="dark"
          className={styles.barColor}
          style={{ backgroundColor: "#f87e8a" }}
          icon={
            (props.pathname === "/main" || props.pathname === "/") ?null: (
              <Icon type="left" />
            )
          }
          onLeftClick={() => {
            //这里需要做指定式跳转，手机页面会涉及到用户刷新的问题
            router.go(-1);
          }}
        >
          {props.title}
        </NavBar>
      </div>
      {props.children}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    title: state.global.title,
    pathname: state.routing.location.pathname
  };
}
export default withRouter(connect(mapStateToProps)(BasicLayout));
