import React, { Component } from 'react';
import ProductCard from '../components/ProductCard';
import {getVideoGameList} from "../services/videogameWs"
import {compareObjects} from "../utils/object"

class SearchResults extends Component {

    state = {
        videogames: []
    }

    componentDidUpdate(prevProps){
        if(!compareObjects(prevProps.match.params, this.props.match.params)){
            let {name, pagenumber} = this.props.match.params;
            if(name === undefined){
                name = "";
            }
            getVideoGameList(name, pagenumber).then((response)=>{
                console.log(response);
                this.setState({videogames: response.data.videogames});
            }).catch(e=>{
                console.log("Hubo un error ", e)
            })
        }
    }

    componentDidMount(){
        let {name, pagenumber} = this.props.match.params;
        if(name === undefined){
            name = "";
        }
        getVideoGameList(name, pagenumber).then((response)=>{
            console.log(response);
            this.setState({videogames: response.data.videogames});
        }).catch(e=>{
            console.log("Hubo un error ", e)
        })
    }

    render() {
                
        
        return (
            <div className="search-results">
                {this.state.videogames.map(videogame=>{
                    return <ProductCard id={videogame._id} img={videogame.images[0]} name={videogame.name} price={videogame.price}></ProductCard>
                })}
            </div>
        );
    }
}

export default SearchResults;