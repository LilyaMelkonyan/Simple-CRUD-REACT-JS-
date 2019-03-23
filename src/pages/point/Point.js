import React, { Component } from 'react';
import './point.css';
import pointInfo from '../../jsons/points';
import userInfo from '../../jsons/users';

class Point extends Component {
    constructor(props){
        super(props);
        this.state = {
            userList: userInfo,
            filterList: pointInfo
        };
        this.selectUserPoint = this.selectUserPoint.bind(this);
    }

    selectUserPoint(e){
        let filterPointObj = pointInfo.filter( (point, key) => {
            if (+e.target.value === point.id) {
                return point
            }
        });
        this.setState({ filterList: filterPointObj } )

        this.current_point_info = filterPointObj.map((v,k)=>
            <table className='table table-striped table-hover table-darkgreen' key={v.id}>
                <thead></thead>
                <tbody>
                    <tr>
                        <th> ID </th>
                        <td> {v.id} </td>
                    </tr>
                    <tr>
                        <th> City </th>
                        <td> {v.city} </td>
                    </tr>
                    <tr>
                        <th> Country </th>
                        <td> {v.country} </td>
                    </tr>
                    <tr>
                        <th> Region </th>
                        <td> {v.region} </td>
                    </tr>
                    <tr>
                        <th> Street </th>
                        <td> {v.street} </td>
                    </tr>
                    <tr>
                        <th> Zip </th>
                        <td> {v.zip} </td>
                    </tr>
                    <tr>
                        <th> Geo </th>
                        <td> {v.geo} </td>
                    </tr>
                </tbody>
            </table>
        );
    }


    render() {
        let userNames =  this.state.userList.map( (name, key) =>
            <option key={name.id} value={name.id}> {name.name} </option>
        );

        let pointInfo = this.state.filterList.map( (point, key) =>
            <li key={point.id}>
                <div className='col-12 infoUl'>
                    <p className='mb-0'><b>City:</b> {point.city} </p>
                    <p className='mb-0'><b>Region:</b> {point.region} </p>
                    <p className='mb-0'><b>Street:</b> {point.street} </p>
                </div>
            </li>
        );

        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-4 py-3 listInfoDiv">
                        <select name="users" className='form-control mt-2' onChange={(e)=>this.selectUserPoint(e)}>
                            { userNames }
                        </select>
                        <ul>
                            { pointInfo }
                        </ul>
                    </div>
                    <div className='col-8 py-4 formEditAddDiv'>
                        { this.current_point_info }
                    </div>
                </div>
            </div>
        );
    }
}

export default Point;
