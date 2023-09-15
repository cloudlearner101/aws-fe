import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'react-mdl';



class MainHeader extends React.Component {
    constructor(props) {
        super(props);
                        
    }
    render() {
    

        return (
            <Header title={"Down Hill Pipeline Conveyor"} className="main_header_style">
                
            </Header>
        );
    }
};


export default MainHeader;