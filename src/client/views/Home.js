import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionUpdateStore } from '../redux/actions';
import { FetchData } from '../api';
import { Header, Content } from '../components';

function Home({ updateStore }) {
  useEffect(() => {
    FetchData.getLatestData().then(res => {
      updateStore(res);
    });
  }, [updateStore]);

  return (
    <div className="home">
      <Header />
      <Content />
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateStore: bindActionCreators(actionUpdateStore, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Home);
