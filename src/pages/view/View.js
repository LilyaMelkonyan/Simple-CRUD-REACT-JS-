import React, { Component } from 'react';
import User from '../user/User.js';
import Point from '../point/Point.js';

class View extends Component {
    constructor(props){
        super(props);
        this.state = {isUserOrPoint: 'Users'};
        this.page = this.page.bind(this);
    }

    page(e) {
        this.setState({isUserOrPoint: e.target.innerHTML});
        e.preventDefault();
    }

    render() {
        var linkHref = '#';
        const isUserOrPoint = this.state.isUserOrPoint;
        let page;
        if (isUserOrPoint === 'Users') {
            page = <User userInfo={this.props.userInfo} />;
        } else {
            page = <Point pointInfo={this.props.pointInfo} userInfo={this.props.userInfo} />;
        }
        return (
            <div className="container">
                <div className='row'>
                    <div className='col-12 menu'>
                        <ul className="nav">
                            <li className="nav-item">
                                <a className="nav-link active" href={linkHref} onClick={(e)=>this.page(e)}>Users</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href={linkHref} onClick={(e)=>this.page(e)}>Points</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-12 px-0'>
                        {page}
                    </div>
                </div>
            </div>
        );
    }
}

export default View;
