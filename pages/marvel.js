import React, { Component } from 'react';
import SearchChara from './search_M'
import '../styles/tailwind.css'
class Marvel extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
         
          url: '',
          searchVal: '',
          
        };
    }
    render() {
        

        return (
            
           
            <div className="mt-5">
            
            
            <SearchChara 
            
            
            />
            
           
          </div>
        );
    }

}
export default (Marvel);