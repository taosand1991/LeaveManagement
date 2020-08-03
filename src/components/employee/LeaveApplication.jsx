import React, {Component, Fragment} from 'react';
import {DatePicker, Input, message} from "antd";
import InputGroup from "../../miscellaneous/InputGroup";
import authContext from "../../utils/AuthContext";
import moment from 'moment'
import axios from 'axios'

class LeaveApplication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                staff_id: '', leave_balance: '', leave_accrual: '', email: '',
                department: '', designation: ''
            },
            start_date: '',
            end_date: '',
            leaves_days: 0,
            errors: {},
            note:'',
            loading:false
        }
    }

    handleStartDate = (date, dateString) => {
        this.setState({start_date: dateString})
    };

    handleEndDate = (date, dateString) => {
        this.setState({end_date: dateString})
    };

    handleStartBlur = () => {
        const errors = this.state.errors;
        const today = moment().format('yyyy-MM-DD');
        const {start_date} = this.state;
        console.log(start_date);
        console.log(today);
        if (start_date <= today) errors['date'] = 'Start date must be valid, not previous days';
        else delete errors['date'];
        this.setState({errors})

    };

    handleOnblur = () => {
        const errors = this.state.errors;
        const {start_date, end_date} = this.state;
        const today = moment().format('yyyy-MM-DD');
        if (end_date <= today) {
            errors['date1'] = 'Start date must be valid, not previous days';
            this.setState({errors})
        } else if (end_date <= start_date) {
            errors['date1'] = 'End date must be valid';
            this.setState({errors})
        } else {
            delete errors['date1'];
            this.setState({errors});
            const start = moment(start_date);
            const end = moment(end_date);
            const difference = end.diff(start, 'days');
            this.setState({leave_days: difference + 1})
        }
    };

    handleNoteChange =(e)=>{
        this.setState({note:e.target.value})
    };

    handleSubmit =async(e)=>{
        e.preventDefault();
        const {userDetail} = this.context;
        this.setState({loading:true});
       const {start_date, end_date, note, leave_days} = this.state;
       const object = {
           starting_date:start_date,
           ending_date:end_date,
           note:note,
           leave_days,
           is_pending:true,
           user:userDetail.id
       };
       const apiCall = 'http://127.0.0.1:8000/api/leave/';
        try{
           await axios.post(apiCall, object);
            setTimeout(() =>{
                this.setState({loading:false});
                message.success('Your leave request has been sent', 5);
                this.props.history.push('/leave-status')
            }, 2000)
        }catch (e) {
            this.setState({loading:false});
            console.log(e.response.data)
        }
    };

    render() {
        const {userDetail} = this.context;
        const {errors, start_date, end_date, note, loading} = this.state;
        const labelStyles = {
            color: 'white'
        };
        const styles = {
            marginLeft: 3,
            color: 'red'
        };
        const dateStyles = {
            marginBottom: 5,
            width: '100%'
        };
        return (
            <Fragment>
                {loading && <div className='loading'/>}
                <section className='leave-application'>
                    <div className="leave-apply">
                        <div className="text-leave">
                            <h4>Application for Employee Leave</h4>
                            <span>Note:</span>
                            <p>
                                Please fill in your leave details and make sure you fill in
                                correct details as this will be approved by your supervisor.
                                Do not leave any required fields empty.
                            </p>
                            <form onSubmit={this.handleSubmit} className='leave-form'>
                                <InputGroup value={userDetail.staff_id}
                                            styles={labelStyles}
                                            label='Staff ID'
                                            disabled/>
                                <InputGroup value={userDetail.department}
                                            label='Department'
                                            styles={labelStyles}
                                            disabled/>
                                <InputGroup value={userDetail.leave_accrual}
                                            label='Leave Accrual'
                                            styles={labelStyles}
                                            disabled/>
                                <label style={labelStyles} htmlFor="start">Select start Date <span
                                    style={styles}>*</span></label><br/>
                                <DatePicker
                                    style={dateStyles}
                                    onBlur={this.handleStartBlur}
                                    onChange={this.handleStartDate}
                                    placeholder='Select start date'/><br/>
                                {errors.date && <small style={{color: 'black'}}>{errors.date}</small>}
                                <label style={labelStyles} htmlFor="start">Select End Date <span style={styles}>*</span></label><br/>
                                <DatePicker
                                    style={dateStyles}
                                    onBlur={this.handleOnblur}
                                    onChange={this.handleEndDate}
                                    disabled={errors.date}
                                    placeholder='Select End date'/>
                                {errors.date1 && <small style={{color: 'black'}}>{errors.date1}</small>}<br/>
                                <InputGroup value={this.state.leave_days}
                                            label='Total leave days'
                                            styles={labelStyles}
                                            disabled/><br/><br/>
                                 <h6 style={{color:'white', opacity:0.5}}>Optional</h6>
                                <label className='mt-2 mb-2' htmlFor="note">Note</label>
                                 <Input.TextArea value={note}
                                                 placeholder='Please put a note'
                                                 onChange={this.handleNoteChange}/>
                                <div className="mybtn">
                                    <button disabled={start_date === '' || end_date === ''}
                                            className='btn btn-success'>send request
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='imgBox'/>
                    <div className="center-box">
                        <h4>How it works</h4>
                        <p className="text-apply">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit inventore laboriosam nulla
                            perspiciatis placeat ratione soluta. Aliquid aspernatur atque deserunt dolore ducimus ea et
                            eveniet facilis illo in laudantium libero, magnam maxime minus neque nesciunt nisi non
                            officiis perferendis, porro possimus praesentium quasi quisquam quod repellendus
                            reprehenderit, soluta veritatis vitae!
                        </p>
                    </div>
                </section>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default LeaveApplication;