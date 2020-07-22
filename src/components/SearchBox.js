import React from 'react';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            message:""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            message : event.target.value
        });
        this.props.onSearch(this.state.message);
    }

    render() {

        var searchBoxStyle = {
            padding: 20
        }

        return (
            <div className="SearchBox" style={searchBoxStyle}>

                <input
                    id="searchbox"
                    type="text"
                    placeholder="Search for an item..."
                    size="60"
                    onChange= { this.handleChange }
                >   
                </input>

            </div>
        );
    }

};

export default SearchBox;