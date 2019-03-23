import React, { Component } from 'react';
import './user.css';
import listOfUser from '../../jsons/users';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            userList: listOfUser,
            name: '',
            email: ''
        };
        this.deleteRow = this.deleteRow.bind(this);
        this.changeVal = this.changeVal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editRow = this.editRow.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.count = 100;
        this.add_success = '';
        this.idx = '';
    }

    deleteRow(k){
        if (k !== -1) {
            this.state.userList.splice(k, 1);
            let newUserList = this.state.userList;
            this.setState({userList: newUserList});
        }
    }

    editRow(idx){
        this.idx = this.state.userList.filter( (v, k) =>{
            if (k === idx){
                this.setState({
                    name: v.name,
                    email: v.email
                });
                return v
            }
        })
    }

    updateUser(){
        this.idx.map((v, i)=>{
            this.state.userList.filter((value, index)=>{
                if(v.id === value.id){
                    v.name = this.state.name;
                    v.email = this.state.email;
                }
            })
        });
        let updateUserList = this.state.userList;
        this.setState({ userList: updateUserList });
    }

    changeVal(e){
        this.setState({
            [e.target.name]: e.target.value
        });
        this.add_success = '';
    }

    handleSubmit(e){
        this.count++;
        let newUserObjs = {
            id: this.count,
            name: this.state.name,
            email: this.state.email
        };

        this.state.userList.push(newUserObjs);
        this.add_success = <p className='col-3 mx-auto alert alert-info alertInfoSpan'> Successfully added! </p>;
        this.setState({
            name: '',
            email: ''
        });
        e.preventDefault();
    }

    render() {
        let listUserInfo = this.state.userList.map((user, key) =>
            <li key={user.id}>
                <div className='col-12 infoUl'>
                    <h5> {user.id}. {user.name} </h5>
                    <h6> {user.email} </h6>
                    <div className='del_edit_btns'>
                        <button className='btn' onClick={()=>this.editRow(key)}> <img src="/img/edit.png" alt="edit"/> </button>
                        <button className='btn' onClick={()=>this.deleteRow(key)}> <img src="/img/delete.png" alt="delete"/> </button>
                    </div>
                </div>
            </li>
        );
        return (
            <div className='container'>
                <div className='row'>
                    <div className="col-4 py-3 listInfoDiv">
                        <ul>
                            { listUserInfo }
                        </ul>
                    </div>
                    <div className='col-8 py-4 formEditAddDiv'>
                        <form className='col-6 mx-auto pb-3'>
                            <label form='nameInp'>Name:</label>
                            <input type="text" id='nameInp' name='name' className='form-control mb-2' value={this.state.name} onChange={this.changeVal} />

                            <label form='mailInp'>Email:</label>
                            <input type="mail" id='mailInp' name='email' className='form-control mb-2' value={this.state.email} onChange={this.changeVal} />

                            <input type="submit" className='btn btn-outline-dark mr-3' onClick={this.handleSubmit} value="Add" />
                            <input type='button' onClick={this.updateUser} className='btn btn-outline-dark' value="Edit" />
                        </form>
                        { this.add_success }
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
