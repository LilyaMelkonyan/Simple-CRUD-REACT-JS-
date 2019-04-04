import React, { Component } from 'react';
import './user.css';
import axios from 'axios';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            userList: this.props.userInfo,
            name: '',
            email: '',
            ax: [],
            add_edit: 'add'
        };
        this.deleteRow = this.deleteRow.bind(this);
        this.changeVal = this.changeVal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editOrAddRow = this.editOrAddRow.bind(this);
        this.updateUser = this.updateUser.bind(this);

        axios.get('http://localhost:8080/users')
            .then(res =>{
                this.setState({ax: res.data});
            })
            .catch(err =>{
                console.log(err)
            })
    }

    deleteRow(k){
        if (k !== -1) {
            this.state.ax.splice(k, 1);
            let newUserList = this.state.ax;
            this.setState({ax: newUserList});
        }
    }

    editOrAddRow(idx,e){
        this.filterIdx = this.state.ax.filter( (v, k) =>{
            if (k === idx){
                this.setState({
                    name: v.name,
                    email: v.email
                });
                return true
            }else{
                return false
            }
        });
        //show add or edit button
        this.setState({add_edit:e.target.value});
        e.preventDefault()
    }

    updateUser(e){
        this.filterIdx.forEach((v, i)=>{
            this.state.ax.forEach((value, index)=>{
                if(v.id === value.id){
                    v.name = this.state.name;
                    v.email = this.state.email;
                }
            })
        });
        let updateUserList = this.state.ax;
        this.setState({ ax: updateUserList });
        this.add_success = <p className='col-3 mx-auto alert alert-info alertInfoSpan'> Successfully edited! </p>;
        this.setState({
            name: '',
            email: ''
        });
        e.preventDefault();
    }

    changeVal(e){
        this.setState({
            [e.target.name]: e.target.value
        });
        this.add_success = '';
        e.preventDefault();
    }

    handleSubmit(e){
        //last object id from json file
        var lastId = this.state.ax[this.state.ax.length-1].id;
        lastId++;
        let newUserObjs = {
            id: lastId,
            name: this.state.name,
            email: this.state.email
        };

        this.state.ax.push(newUserObjs);
        this.add_success = <p className='col-3 mx-auto alert alert-info alertInfoSpan'> Successfully added! </p>;
        this.setState({
            name: '',
            email: ''
        });
        e.preventDefault();
    }

    render() {
        if(this.state.add_edit === 'add'){
            this.addEdit = <button type="submit" className='btn btn-outline-dark mr-3' onClick={(e)=>this.handleSubmit(e)}> Add </button>
        }else{
            this.addEdit = <button type='submit' onClick={(e)=>this.updateUser(e)} className='btn btn-outline-dark'> Edit </button>
        }
        let listUserInfo = this.state.ax.map((user, key) =>
            <li key={user.id}>
                <div className='col-12 infoUl'>
                    <h5> {user.id}. {user.name} </h5>
                    <h6> {user.email} </h6>
                    <div className='del_edit_btns'>
                        <button className='btn' value='edit' type='submit' onClick={(e)=>this.editOrAddRow(key,e)}> <img src="/img/edit.png" alt="edit"/> </button>
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
                        <div className='col-12 text-right'>
                            <button className='btn btn-outline-dark' type='submit' value='add' onClick={(e)=>this.editOrAddRow('',e)}>Add</button>
                        </div>

                        <form className='col-6 mx-auto pb-3'>
                            <label form='nameInp'>Name:</label>
                            <input type="text" id='nameInp' name='name' className='form-control mb-2' value={this.state.name} onChange={this.changeVal} />

                            <label form='mailInp'>Email:</label>
                            <input type="mail" id='mailInp' name='email' className='form-control mb-2' value={this.state.email} onChange={this.changeVal} />
                            { this.addEdit }
                        </form>
                        { this.add_success }
                    </div>
                </div>
            </div>
        );
    }
}

export default User;
