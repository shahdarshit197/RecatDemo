import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { UserData } from './GetUser';
interface AdduserDataSet {
    title: string;
    loading: boolean;
    UsrData: UserData;
}
export class AddUser extends React.Component<RouteComponentProps<{}>, AdduserDataSet> {
    constructor(props) {
        super(props);  
        this.state = { title: "", loading: true, UsrData: new UserData };  

        var usrid = this.props.match.params["id"];  
        if (usrid > 0) {
            fetch('/UserMaster/GetUser/' + usrid)
                .then(response => response.json() as Promise<UserData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, UsrData: data });
                });
        }
        // This will set state for Add employee  
        else {
            this.state = { title: "Create", loading: false, UsrData: new UserData };
        }
        // This binding is necessary to make "this" work in the callback  
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);  

    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title}</h1>
            <h3>Add User</h3>
            <hr />
            {contents}
        </div>;
    }  
    private handleSave(event) {
        event.preventDefault();
        debugger;
        const data = new FormData(event.target);
        // PUT request for Edit employee.  
        if (this.state.UsrData.id) {
            fetch('/UserMaster/UpdateUser', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/GetUser");
                })
        }
        // POST request for Add employee.  
        else {
            fetch('/UserMaster/AddUser', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/GetUser");
                })
        }
    }  

    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/GetUser");
    }  

    private renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="Id" value={this.state.UsrData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="FullName" defaultValue={this.state.UsrData.fullName} required />
                    </div>
                </div >
                
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Email ID</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="emailId" defaultValue={this.state.UsrData.emailId} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department" >Mobile No</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="MobileNo" defaultValue={this.state.UsrData.mobileNo} required />
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }  



}