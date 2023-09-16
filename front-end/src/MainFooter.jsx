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
            <Footer className="main_footer_style">
               <FooterSection type="left">
                    <FooterLinkList>
                       <label><i>"Powered by : NexInvent Technologies Pvt Ltd"</i></label> 
                    </FooterLinkList>
                </FooterSection>
            </Footer>
        );
    }
}

export default MainFooter;