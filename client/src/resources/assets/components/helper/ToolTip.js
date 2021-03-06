import React, { Component } from 'react';

class ToolTip extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="tooltip_common ">
                <div className="pointed_common"></div>
                <div className="content_common">{this.props.name}</div>
            </div>
        );
    }
}

export default ToolTip;