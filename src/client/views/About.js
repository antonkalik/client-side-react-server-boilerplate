import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function About({ store }) {
  useEffect(() => {
    console.log({ store });
  }, [store]);

  return <div className="about">About page</div>;
}

const mapStateToProps = store => {
  return { store };
};

export default connect(
  mapStateToProps,
  null
)(About);
