import React, {Component, Fragment} from 'react';
import {Descriptions} from "antd";
import authContext from "../../utils/AuthContext";

class LeaveBalance extends Component {
    constructor(props) {
        super(props);
        this.state ={}
    }
    render() {
        const {userDetail} = this.context;
        return (
            <Fragment>
                <section className='leave-balance'>
                    <div className='leave-profile'>
                    <Descriptions title='Leave Balance' bordered>
                        <Descriptions.Item  label='Staff ID'>{userDetail.staff_id}</Descriptions.Item>
                        <Descriptions.Item  label='Department'>{userDetail.department}</Descriptions.Item>
                        <Descriptions.Item label='Designation'>{userDetail.designation}</Descriptions.Item>
                        <Descriptions.Item label='Phone Number'>{userDetail.phone_number}</Descriptions.Item>
                        <Descriptions.Item label='First Name'>{userDetail.first_name}</Descriptions.Item>
                        <Descriptions.Item label='Last Name'>{userDetail.last_name}</Descriptions.Item>
                    </Descriptions>
                        </div>
                    <div className="leave-detail">
                        <div className="details">
                           <h6>Leave Accrual</h6>
                            <h5>{userDetail.leave_accrual}</h5>
                        </div>
                    </div>
                </section>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default LeaveBalance;