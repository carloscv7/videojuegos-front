import React, { Component } from 'react';
import SearchResults from './SearchResults';

class HomeContainer extends Component {
    render() {
        return (
            <div>
                
                <SearchResults match={{params: {pagenumber: 1, name: ""}}}></SearchResults>
            </div>
        );
    }
}

export default HomeContainer;