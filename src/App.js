import React from 'react';
import './style/App.css';
import MainFrame from './components/MainFrame'

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';

class App extends React.Component {
  render() {
    return (
      <div className="App" style={{color:'#ebded3'}}>
        <MainFrame/>
      </div>
    );
  }
}


export default  App;