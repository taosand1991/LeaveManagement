import React, {Component, Fragment} from 'react';
import axios from 'axios'

class EmployeeStat extends Component {
    constructor(props) {
        super(props);
        this.state ={
            employees:[]
        };
    }

    async componentDidMount() {
        const apiCall = 'http://127.0.0.1:8000/api/user/employee';
        try{
            const {data:response} = await axios.get(apiCall);
            this.setState({employees:response})
        }catch (e) {
            console.log(e.response.data)
        }
    }


    render() {
        const {employees} = this.state;
        return (
            <Fragment>
               <div className="employee-stat">
                <div className="row m-auto">
                    {employees.map(em => {
                        return <div key={em.id} className='col-12 col-md-3 col-sm-3 col-lg-3'>
                            <div className="card">
                                <div className="card-header text-center">
                                    <h2>{em.first_name}</h2>
                                </div>
                                <div className="card-body text-center">
                                    <h5>Last Name</h5>
                                    <p>{em.last_name}</p><br/>
                                    <h5>Staff ID</h5>
                                    <p>{em.staff_id}</p><br/>
                                    <h5>Gender</h5>
                                    <p>{em.gender}</p><br/>
                                    <h5>Leave balance</h5>
                                    <p>{em.leave_accrual}</p><br/>
                                    <h5>Department</h5>
                                    <p>{em.department}</p><br/>
                                    <h5>Designation</h5>
                                    <p>{em.designation}</p><br/>
                                    <h5>Phone Number</h5>
                                    <p>{em.phone_number}</p><br/>
                                    <h5>Email</h5>
                                    <p>{em.email}</p>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
               </div>
            </Fragment>
        );
    }
}

export default EmployeeStat;