import React, {PropTypes} from 'react';
import HeaderNav from './HeaderNav';

const App = (props) => {
  return (
    <div>
      <HeaderNav />
      <div id="content">
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
