import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchUserDataState {
    UsrList: UserData[];
    loading: boolean;
}
export class GetUser extends React.Component<RouteComponentProps<{}>, FetchUserDataState> {
    constructor() {
        super();
        
        this.state = { UsrList: [], loading: true };
        fetch('/UserMaster/Index', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        }).then(response => response.json() as Promise<UserData[]>)
            .then(data => {
                this.setState({ UsrList: data, loading: false });
            });
        // This binding is necessary to make "this" work in the callback  
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderUserTable(this.state.UsrList);
        return <div>
            <h1>User Data</h1>
            <p>
                <Link to="/adduser">Create New</Link>
            </p>
            {contents}
        </div>;
    }
    // Handle Delete request for an employee  
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete user with Id: " + id))
            return;
        else {
            fetch('/UserMaster/DeleteUser/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        UsrList: this.state.UsrList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }
    private handleEdit(id: number) {
        this.props.history.push("/user/EditUser/" + id);
    }
    // Returns the HTML table to the render() method.  
    private renderUserTable(usrlist: UserData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Full Name</th>
                    <th>Email ID</th>
                    <th>Mobile no</th>
                </tr>
            </thead>
            <tbody>
                {usrlist.map(usr =>
                    <tr key={usr.id}>
                        <td>{usr.id}</td>
                        <td>{usr.fullName}</td>
                        <td>{usr.emailId}</td>
                        <td>{usr.mobileNo}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(usr.id)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(usr.id)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
export class UserData {
    id: number = 0;
    fullName: string = "";
    emailId: string = "";
    mobileNo: string = "";
}
