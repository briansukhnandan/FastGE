import React, { Fragment } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBBtnGroup } from 'mdbreact';

class ResultsTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query : this.props.data,
            search : this.props.search,
            entryIndex : 0,
            currentRows : ""
        };
        this.renderTableData = this.renderTableData.bind(this);
    }

    // Populates table with relevant data. 
    renderTableData = () => {


    
        let table_rows = [];
        var i;
        const results_per_page = 10;

        // Refreshes entryIndex to 0 so we can get correct entries
        // for table.
        this.refreshTableData();

        // If we are met with an actual query display top 10 results.
        if (this.state.query != null) {

            // HANDLES DEV TESTING CASE: * = wildcard search.
            // Entering a wildcard character will display all contents of db.
            if (this.props.search === '*') {
                // console.log("Entered wildcard");
                        
                // Push a row with the currently indexed query object.
                for (i = this.state.entryIndex; i < this.state.entryIndex+10 && i < this.props.data.length; i++) {
                    
                    // Base Case: If entryIndex = data.length, we are either in a state
                    // where nothing was searched (0 results), or we indexed to end of query.
                    if (this.state.entryIndex === this.props.data.length) {
                        break;
                    }

                    // Push a row with all details of the table, including image
                    // which we will wrap around with an <img> tag.
                    table_rows.push(
                        <tr style={{color:'#ebded3'}}>
                            <th>{this.props.data[i].objectName.replace(new RegExp("_", "g"), ' ')}</th>
                            <th>{this.props.data[i].id}</th>
                            <th>{this.props.data[i].description}</th>
                            <th>{this.props.data[i].price} gp</th>
                            <th>{<img src={this.props.data[i].image} alt="Loading... " />}</th>
                        </tr>
                    );

                }

            }

            // Handles other non-wildcard searches.
            else {

                if (this.props.data.length > results_per_page) {
                    for (i = this.state.entryIndex; i < this.state.entryIndex+10 && i < this.props.data.length; i++) {
                        
                        if (this.state.entryIndex >= this.props.data.length) {
                            break;
                        }
                       
                        table_rows.push(
                            <tr style={{color:'#ebded3'}}>
                                <th>{this.props.data[i].objectName.replace(new RegExp("_", "g"), ' ')}</th>
                                <th>{this.props.data[i].id}</th>
                                <th>{this.props.data[i].description}</th>
                                <th>{this.props.data[i].price} gp</th>
                                <th>{<img src={this.props.data[i].image} alt="Loading... " />}</th>
                            </tr>
                        );
                    }
                }

                else {
                    for (i = 0; i < this.props.data.length; i++) {
                        
                        table_rows.push(
                            <tr style={{color:'#ebded3'}}>
                                <th>{this.props.data[i].objectName.replace(new RegExp("_", "g"), ' ')}</th>
                                <th>{this.props.data[i].id}</th>
                                <th>{this.props.data[i].description}</th>
                                <th>{this.props.data[i].price} gp</th>
                                <th>{<img src={this.props.data[i].image} alt="Loading... " />}</th>
                            </tr>
                        );
                    }
                }
            }
        }
        
        return table_rows;
    }

    refreshTableData = () => {

        if (this.state.entryIndex > this.props.data.length) {
            this.setState({
                entryIndex : 0
            });
        }

    }

    updateNextTen = () => {

        if (this.state.entryIndex+10 <= this.props.data.length) {
            this.setState({
                entryIndex : this.state.entryIndex+10
            });
        }

        if (this.state.entryIndex > this.props.data.length) {
            this.setState({
                entryIndex : 0
            });
        }

        this.renderTableData();

    }

    updatePrevTen = () => {

        if (this.state.entryIndex > this.props.data.length) {
            this.setState({
                entryIndex : 0
            });
        }

        if (this.state.entryIndex >= 10) {
            this.setState({
                entryIndex : this.state.entryIndex-10
            });
        }

        if (this.state.entryIndex < 0) {
            this.setState({
                entryIndex : 0
            });
        }

        this.renderTableData();

    }

    calculateEndIndex = () => {

        // DEFAULT CASE: if nothing is searched.
        if (this.props.data.length === 0) {
            return 0;
        }

        if ( parseInt(this.state.entryIndex)+9 >= this.props.data.length ) {
            // console.log("Got here");
            return String(this.state.entryIndex + (this.props.data.length - parseInt(this.state.entryIndex)) -1 );
        }

        return String(parseInt(this.state.entryIndex)+9);
    }

    render() {
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize : 16}}>
                <div className="ResultsTable">         
                    <Fragment>
                        <MDBBtnGroup size="sm">
                            <MDBBtn 
                                color="unique"
                                onClick={this.updatePrevTen}
                            >
                                <b>←</b>
                            </MDBBtn>
                            <MDBBtn 
                                color="unique"
                                onClick={this.updateNextTen}
                            >
                                <b>→</b>
                            </MDBBtn>
                        </MDBBtnGroup>
                    </Fragment>
                    <MDBTable autoWidth striped hover responsive>
                        <MDBTableHead>
                            <tr style={{color:'#ebded3'}}>
                                <th>
                                    <b>Item Name</b>
                                    <Fragment>
                                        <MDBBtnGroup size="sm">
                                            <MDBBtn 
                                                color="elegant"
                                                onClick={this.props.sortNameUp}
                                            >
                                                ▼
                                            </MDBBtn>
                                            <MDBBtn 
                                                color="elegant"
                                                onClick={this.props.sortNameDown}
                                            >
                                                ▲
                                            </MDBBtn>
                                        </MDBBtnGroup>
                                    </Fragment>
                                </th>
                                <th>
                                    <b>RS ID no.</b>
                                    <Fragment>
                                        <MDBBtnGroup size="sm">
                                            <MDBBtn 
                                                color="elegant"
                                                onClick={this.props.sortQueryUp}
                                            >
                                                ▼
                                            </MDBBtn>
                                            <MDBBtn 
                                                color="elegant"
                                                onClick={this.props.sortQueryDown}
                                            >
                                                ▲
                                            </MDBBtn>
                                        </MDBBtnGroup>
                                    </Fragment>
                                </th>
                                <th><b>Item Description</b></th>
                                <th><b>Price</b></th>
                                <th><b>Ingame Model</b></th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            { this.renderTableData() }
                        </MDBTableBody>
                    </MDBTable>
                    <div>
                        <p><b>Showing results: {this.state.entryIndex}-{this.calculateEndIndex()} of {this.props.data.length}</b></p>
                    </div>             
                    <div style={{paddingBottom:50}}></div>
                </div>
            </div>
        );
    }
}

export default ResultsTable;