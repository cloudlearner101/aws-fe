import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import Dashboard from './Dashboard';

class MainDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated : this.props.isAuthenticated,
      currentDateTime: new Date(),
      lesseeCode : process.env.REACT_APP_LESSECODE,
      lesseeName : process.env.REACT_APP_LESSENAME,
      bulkPermitCode : process.env.REACT_APP_BULKPERMITCODE
    };
  }

  componentDidMount() {
    // this.intervalID = setInterval(() => {
    //   this.setState({ currentDateTime: new Date() });
    // }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { isAuthenticated, currentDateTime } = this.state;
console.log(isAuthenticated)
    if (!isAuthenticated) {
      return (
        <div>
          <h1>Authentication failed. Please log in.</h1>
        </div>
      );
    }

    return (
      <div>
        
        <div className="row step">
          <label className="ilms-heading">ILMS Connection Status</label>
          <div
            class="flex-container"
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className="date-input-container">
              <Typography variant="h6" id="tableTitle">
                <p className="date-label">Date & Time:</p>
              </Typography>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                required
                disabled
                defaultValue={currentDateTime.toLocaleString()}
                value={currentDateTime.toLocaleString()}
              />
            </div>

            <div className="date-input-container" style={{ flex: 1 }}>
              <Typography variant="h6" id="tableTitle">
                <p className="Lessee-label">Lessee Code:</p>
              </Typography>
              <input
                type="text"
                className="form-control"
                autoComplete="off"
                disabled
                value={this.state.lesseeCode}
              />
            </div>           
          </div>

          <div className="flex-container" style={{ display: 'flex', flexDirection: 'column' }}>
  <div className="date-input-container3" style={{ flex: 1 }}>
    <Typography variant="h6" id="tableTitle">
      <p className="Lessee-label-name">Lessee Name:</p>
    </Typography>
    <input
      type="text"
      className="form-control"
      autoComplete="off"
      disabled
      value={this.state.lesseeName}
    />
  </div>
  <div className="date-input-container4" style={{ flex: 1 }}>
    <Typography variant="h6" id="tableTitle">
      <p className="Lessee-label-bulk-code">Bulk Permit Code :</p>
    </Typography>
    <input
      type="text"
      className="form-control"
      autoComplete="off"
      disabled
      value={this.state.bulkPermitCode}
    />
  </div>
</div>

        </div>

        <Dashboard />
      </div>
    );
  }
}

export default MainDashboard;
