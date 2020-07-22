import React from 'react';
import osrs_ge from '../images/osrs_ge.png'

class HeaderImage extends React.Component {

    render () {

        let img_style = {
            padding: 20
        }

        return(
            <div className="HeaderImage">
                <div style={img_style}>
                    <a href="/">
                    <img src={osrs_ge} alt='Loading...' width="900" height="229"></img>
                    </a>
                </div>
            </div>
        );
    }

}

export default HeaderImage;