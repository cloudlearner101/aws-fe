import React from 'react';
import { connect } from 'react-redux';
import { Header } from 'react-mdl';



class MainHeader extends React.Component {
    constructor(props) {
        super(props);
                        
    }
    render() {
    

        return (
            <Header title={"DOWN HILL PEIPELINE CONVEYOR"} style={{ fontWeight: "bold" }} className="main_header_style">
                
            </Header>
        );
    }
};


export default MainHeader;