import React from 'react';
import { connect } from 'react-redux';
import { Footer, FooterSection, FooterLinkList } from 'react-mdl';

class MainFooter extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;
        
        return (
            <Footer  className="footer">
               
            </Footer>
        );
    }
}

export default MainFooter;