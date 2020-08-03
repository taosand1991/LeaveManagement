import React, {Component, Fragment} from 'react';
import {MDBAnimation} from "mdbreact";
import axios from 'axios'
import moment from 'moment'
import {Modal, Select, Input} from 'antd'
import authContext from "../../utils/AuthContext";

class ApprovedLeaves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingLeaves: [],
            actionModal: false,
            noteModal: false,
            leaveId:0,
            leave_days:'',
            leave_accrual:'',
            difference:0,
            user:'',
            note:'',
            loading:false,
        }
    }

    async componentDidMount() {
        const apiCall = 'http://127.0.0.1:8000/api/leave/pending/';
        try {
            const {data: pendingLeaves} = await axios.get(apiCall);
            this.setState({pendingLeaves})
        } catch (e) {
            console.log(e.response.data)
        }
    }

    setActionModal = (id, leave_days, leave_accrual, user) => {
        const difference = leave_accrual - leave_days;
        this.setState({actionModal: !this.state.actionModal, leaveId:id, difference, user})
    };

    setNoteModal = () => {
        this.setState({noteModal: !this.state.noteModal})
    };

    handleSelect =async(value)=>{
        const {leaveId, user, difference} = this.state;
        const {userDetail} = this.context;
        const apiCall = `http://127.0.0.1:8000/api/leave/${leaveId}/`;
        const apiUser = `http://127.0.0.1:8000/api/user/${user}/`;
        const apiApproval = 'http://127.0.0.1:8000/api/approval';
        this.setState({loading:true});
        if(value === 'approve'){
            const leaveObject = {
                is_pending:false,
                approved_note:'',
                approved:userDetail.id,
                is_approved:true,
                is_denied:false
            };

            const userObject = {
                leave_accrual:difference,
            };

            const approvalObject = {
                leave_result:leaveId,
                is_approved:true,
                user:userDetail.id
            };
            try{
                 await axios.patch(apiCall, leaveObject);
                 await axios.patch(apiUser, userObject);
                 await axios.post(apiApproval, approvalObject);
                setTimeout(() => {
                     this.componentDidMount();
                    this.setState({loading:false})
                }, 1500)
            }catch (e) {
                this.setState({loading:false});
                console.log(e.response.data)
            }
        }else{
             const leaveObject = {
                is_pending:false,
                approved_note:'',
                approved:userDetail.id,
                is_approved:false,
                is_denied:true
            };
            try{
                 const {data:leaveData} = await axios.patch(apiCall, leaveObject);
                console.log(leaveData);
                setTimeout(() => {
                     this.componentDidMount();
                    this.setState({loading:false})
                }, 1500)
            }catch (e) {
                 this.setState({loading:false});
                console.log(e.response.data)
            }
        }
    };

    handleChange =(e)=>{
        this.setState({note:e.target.value})
    };
    handleBur =()=>{
        this.setState({loading:true});
        setTimeout(() => {
            this.setState({loading:false, noteModal:false})
        }, 1500)
    };

    render() {
        const {pendingLeaves, actionModal, noteModal, note, loading} = this.state;
        const blockStyles ={
           display:'flex',
           justifyContent:'center',
           alignItems:'center',
           width:'50%',
            flexDirection:'column',
           height:100,
            margin:'0 auto',
           backgroundColor:'white',
           boxShadow:'2px 5px 6px 6px rgba(0, 0, 0, 0.5)'
        };
        return (
            <Fragment>
                {loading && <div className='loading'/>}
                <Modal visible={noteModal}
                       footer={null}
                       title='Add note'
                       destroyOnClose
                       onCancel={this.setNoteModal}>
                   <Input.TextArea placeholder='please add a note'
                                    value={note}
                                   onBlur={this.handleBur}
                                   onChange={this.handleChange}/>
                </Modal>
                <Modal visible={actionModal}
                       footer={null}
                       title='Select action'
                       destroyOnClose
                       onCancel={this.setActionModal}>
                    {loading && <div className='loading'/>}
                    <label className='mt-2' htmlFor="action">Please select an action</label><br/>
                    <Select onChange={this.handleSelect} style={{width:300}}>
                       <Select.Option value='approve'>Approve</Select.Option>
                       <Select.Option value='decline'>Decline</Select.Option>
                    </Select>
                </Modal>
                <div className="approved-leave">
                    <MDBAnimation type='fadeInLeft' delay='2s'>
                        <div className="text">
                            <h5>Leave Portal</h5>
                            <p>
                                This is where leaves are either being approved or disapproved,
                                the admin has the right to approve or disapprove leaves beased on
                                their requirements and workforce at that particular date.
                            </p>
                        </div>
                    </MDBAnimation>
                    <MDBAnimation type='fadeInDown' delay='3s'>
                        {pendingLeaves.length > 0 ? <div className="table-approved table-responsive">
                            <table className='table table-bordered'>
                                <thead>
                                <tr>
                                    <th>Leave Application Date</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>TLD</th>
                                    <th>Applied By</th>
                                    <th>Note(optional)</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {pendingLeaves.map(leave => {
                                    return <tr key={leave.id}>
                                        <td>{moment(leave.time_stamp).toDate().toDateString()}</td>
                                        <td>{moment(leave.starting_date).toDate().toDateString()}</td>
                                        <td>{moment(leave.ending_date).toDate().toDateString()}</td>
                                        <td>{leave.leave_days}</td>
                                        <td>{leave.staff_id}</td>
                                        <td>
                                            {note === '' ? <button onClick={this.setNoteModal} className='btn btn-cyan'>Write a Note</button> :
                                                note
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => this.setActionModal(leave.id, leave.leave_days, leave.user_accrual, leave.user)} className='btn btn-success'>Take Action</button>
                                        </td>
                                    </tr>
                                })}
                                </tbody>
                            </table>
                            </div>:
                        <div style={blockStyles} className="text-center">
                            <h5>oops!!!!</h5>
                            <p>No pending Leave request yet</p>
                        </div>
                        }
                                </MDBAnimation>
                                </div>
                                </Fragment>
         );
    }
    static contextType = authContext;
}
export default ApprovedLeaves;