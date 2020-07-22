import React from 'react';
import SearchBox from './SearchBox'
import ResultsTable from './ResultsTable'
import HeaderImage from './HeaderImage'
// import ItemRotation from './ItemRotation'

import { return_attributes } from '../db_local/db_find_item.js'
import { find_all_items } from '../db_local/db_find_all_items.js'
import { sortIDup, sortIDdown, sortNameup, sortNamedown } from '../misc_js/sort_children.js'

class MainFrame extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            query:"", // Holds last searched result from search bar.
            id:"", // Holds id of searched item.
            quantity:"", // Holds quantity of searched item.
            price:"", // Holds price of searched item.
            results:"", // Holds results from query, arr of query obj.
            image:"",
        };
        this.handleSearch = this.handleSearch.bind(this);
    }

    // Callback function to update state of query when user searches.
    handleSearch = search => {

        // Update query state to be the string literal of the search.
        this.setState({
            query : search.replace(new RegExp(" ", "g"), '_')
        });

        // Log query for testing.
        // console.log("Search: "+this.state.query);

        
        // Create temp variable to update states with query details.
        var attr_list = return_attributes(this.state.query);
    
        // console.log(temp);
        this.setState({
            id : attr_list[0],
            description : attr_list[1],
            price : attr_list[2],
            image : attr_list[3]
        });
    

        let query_list = find_all_items(String(this.state.query));

        this.setState({
            results : query_list
        });

        console.log('\n');

    }

    sortQueryByIDup = () => {
        if (this.state.results.length > 1) {
            this.setState({
                results : sortIDup(this.state.results)
            });
        }
    }

    sortQueryByIDdown = () => {
        if (this.state.results.length > 1) {
            this.setState({
                results : sortIDdown(this.state.results)
            });
        }
    }

    sortQueryByNameUp = () => {
        if (this.state.results.length > 1) {
            this.setState({
                results : sortNameup(this.state.results)
            });
        }
    }

    sortQueryByNameDown = () => {
        if (this.state.results.length > 1) {
            this.setState({
                results : sortNamedown(this.state.results)
            });
        }
    }

    render() {

        var results_props = {
            data : this.state.results,
            search : this.state.query
        }

        return (
            <div className="MainFrame">
                <HeaderImage />

                <SearchBox
                    onSearch = {this.handleSearch}
                />

                <ResultsTable
                    sortQueryUp = {this.sortQueryByIDup}
                    sortQueryDown = {this.sortQueryByIDdown}
                    sortNameUp = {this.sortQueryByNameUp}
                    sortNameDown = {this.sortQueryByNameDown}
                    data = {results_props.data}
                    search = {results_props.search}
                />

            </div>
        );

    }

}

export default MainFrame;