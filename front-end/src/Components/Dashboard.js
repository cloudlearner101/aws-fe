import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Checkbox } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as XLSX from 'xlsx';
import TextBoxes from './TextBoxes';

let data = [];
class Dashboard extends Component {

  constructor(props) {
    super();
    this.state = {
      data: [],
      page: 0,
      rowsPerPage: 10,
      selected: [],
      startDate: new Date,
      endDate: new Date,
      totalNetWeight : 0.0
    };
    this._mounted = false;
  }


  componentDidMount() {
    this._mounted = true;
    console.log("hello")
    this.getdata();
  };

  componentWillUnmount() {
    this._mounted = false;
  };

  getdata() {
    const payload = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    };
    fetch(`${process.env.REACT_APP_API_URL}/fetchAll`).then((response) => response.json()).then((response) => {
      if (this._mounted) {
        if (response) {
         
          this.setState({ data: response.data})
          this.addNetWeight();
        } else {
          this.setState({ data: undefined })
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  };

  getdataByDates= () => {
    let sDate = this.state.startDate;
    let eDate = this.state.endDate;

    console.log(eDate)
    const payload = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': '*'
      }
    };
    fetch(`${process.env.REACT_APP_API_URL}/fetchByDate?startDate=${sDate}&endDate=${eDate}`,payload).then((response) => response.json()).then((response) => {
        if (response) {
          this.setState({ data: response.data})
          this.addNetWeight();
        } else {
          this.setState({ data: undefined })
        }

    }).catch((error) => {
      console.log(error)
    })
  };

  handleStartDateChange = (e) => {
    const startDate = e.target.value;
    if (startDate <= this.state.endDate) {
      this.setState({ startDate });
    } else {
      this.setState({ startDate, endDate: startDate });
    }
  };

  addNetWeight = (e) => {
    const { data } = this.state;
    const totalNetWeight = data.reduce((total, item) => {
      return total + parseFloat(item.NetWeight);
    }, 0);
    this.setState({ totalNetWeight });
  }

  handleEndDateChange = (e) => {
    const endDate = e.target.value;
    if (endDate >= this.state.startDate) {
      this.setState({ endDate });
    } else {
      this.setState({ endDate, startDate: endDate });
    }
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0, // Reset page to the first page when changing rows per page
    });
  };


  handleSelectAllClick = (event) => {
    data = this.state.data;

    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.LeaseNumber);
      this.setState({ selected: newSelecteds });
      return;
    }

    this.setState({ selected: [] });
  };

  handleClick = (event, name) => {
    const selectedIndex = this.state.selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(this.state.selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(this.state.selected.slice(1));
    } else if (selectedIndex === this.state.selected.length - 1) {
      newSelected = newSelected.concat(this.state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        this.state.selected.slice(0, selectedIndex),
        this.state.selected.slice(selectedIndex + 1),
      );
    }
    console.log("selectedRows", newSelected)
    this.setState({ selected: newSelected })
  };


  handleExportClick = () => {
    const { data } = this.state;
    const selectedRows = data.filter((row) => {
      console.log(row)
      return row.LeaseNumber;
    }); // Assuming you have a "selected" property in your data for each row

    if (selectedRows.length === 0) {
      alert('No rows selected for export.');
      return;
    }

    // Prepare data for export
    const exportData = selectedRows.map((row) => ({
      'Bulk PermitCode': row.BulkPermitCode,
      'Lease Number': row.LeaseNumber,
      "Mineral Name": row.MineralName,
      "Mineral Type": row.MineralType,
      'Lease Holder RefNo': row.LeaseHolderRefNo,
      'Start DateTime': row.StartDateTime,
      'End DateTime': row.EndDateTime,
      'Start Weight': row.StartWeight,
      'End Weight': row.EndWeight,
      'Net Weight': row.NetWeight,
      'Accumulation': row.Accumulation,
      'BeltSpeed': row.BeltSpeed,
      'Status': row.Status,
      'API Response': row.APIResponse
    }));

    // Create a worksheet from the data
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create a workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exported Data');

    // Save the workbook as an XLSX file
    XLSX.writeFile(wb, 'exported_data.xlsx');
  };

  isSelected = (name) => this.state.selected.indexOf(name) !== -1;

  render() {
    const { data, page, rowsPerPage } = this.state;

    // Calculate the start and end index for the current page
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the data array to display only the rows for the current page
    const pageData = data.slice(startIndex, endIndex);
    const headRows = [
      { id: 'id', alignment: 'left', disablePadding: false, label: "Id" },
      { id: 'leaseNumber', alignment: 'left', disablePadding: false, label: "Lease Number" },
      { id: 'bulkPermitCode', alignment: 'left', disablePadding: false, label: "Bulk PermitCode" },
      { id: 'netWeight', alignment: 'left', disablePadding: false, label: "Net Weight" },
      { id: 'startDate', alignment: 'left', disablePadding: false, label: "Start DateTime" },
      { id: 'endDate', alignment: 'left', disablePadding: false, label: "End DateTime" },
      { id: 'leaseHolderRefNo', alignment: 'left', disablePadding: false, label: "Lease Holder RefNo" }
    ];
    return (

      <div className="dashboard-container">
        <div className='main-dhpc-export'>
            <Toolbar className="header">
              <Typography variant="h6" id="tableTitle">
                <p className='dhpc-style'>DHPC RECORDS</p>
              </Typography>

              <div style={{ flex: '1 1 35%' }} />
              
              <div className="right-panel-action">
          <input
            type='date'
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
            className="mr-end-date"
          />
        </div>
        <div className="right-panel-action">
          <input
            type='date'
            value={this.state.endDate}
            onChange={this.handleEndDateChange}
            className="mr-end-date"
          />
        </div>
              <div className="right-panel-action">
                <button type="button" className="mr-submit" onClick={this.getdataByDates} >
                  <p className='para-style'>Submit</p>
                </button>
              </div>
              <div style={{ flex: '-1 1 10%' }} />
              <div className="right-panel-action">
                <button type="button" className="btn btn-sm btn-default mr5" onClick={() => this.handleExportClick()}>
                  <p className='para-style'>Export</p>
                </button>
              </div>
             
            </Toolbar>
          </div>
          <hr></hr>
        <Paper className="custom_paper">         
          <div className="tableWrapper">
            <Table aria-labelledby="tableTitle" size='medium'>
              <TableHead className='table-head'>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    {
                      this.state.data && this.state.data.length ?
                        <Checkbox
                          indeterminate={this.state.data.length > 0 && this.state.data.length < this.state.data.length}
                          checked={this.state.data.length > 0 && this.state.selected.length === this.state.data.length}
                          onClick={this.handleSelectAllClick}
                          inputProps={{ 'aria-label': 'select all desserts' }}
                          style={{ padding: '0px 9px' }}
                          color="secondary"
                        />
                        : null
                    }

                  </TableCell> */}
                  {headRows.map(row => (
                    <TableCell key={row.id}
                      className={row.id === 'action' && this.props.editFlag === false ? 'hidden' : ''}
                      align={row.alignment}
                      padding={row.disablePadding ? 'none' : 'default'}>
                      {row.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  this.state.data ? pageData.map((SrvCnfg, index) => {
                    const isItemSelected = this.isSelected(SrvCnfg.LeaseNumber);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      //key={SrvCnfg.LeaseNumber}
                      >
                        {/* <TableCell padding="checkbox"
                          onClick={(event) => this.handleClick(event, SrvCnfg.LeaseHolderRefNo)}
                          aria-checked={isItemSelected}
                          selected={isItemSelected}
                        >
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': ' ' }}
                            style={{ padding: '0px 9px' }}
                            color="secondary"
                          />
                        </TableCell> */}
                        <TableCell>{index}</TableCell>
                        <TableCell>{SrvCnfg.LeaseNumber}</TableCell>
                        <TableCell>{SrvCnfg.BulkPermitCode}</TableCell>
                        <TableCell>{SrvCnfg.NetWeight}</TableCell>
                        <TableCell>{SrvCnfg.StartDateTime}</TableCell>
                        <TableCell>{SrvCnfg.EndDateTime}</TableCell>
                        <TableCell>{SrvCnfg.LeaseHolderRefNo}</TableCell>
                      </TableRow>
                    );
                  }) : <TableRow><TableCell colSpan={8} className="table_NoData_style">"No records found"</TableCell></TableRow>
                }
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />

          
            <div className='dashboard-total-weight'>
              <Typography variant="h6" id="tableTitle">
                <p className="date-label">Total Net Weight(In MT):</p>
              </Typography>
              
              <input
                type="text"
                className="total-text"
                autoComplete="off"
                required
                disabled
                value={this.state.totalNetWeight.toFixed(2)}
              />
            </div>

          </div>

        </Paper>
      </div>
    );
  }
}

export default Dashboard;