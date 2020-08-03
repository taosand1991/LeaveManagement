import React, {Component, Fragment} from 'react';
import {Tween, Timeline} from "react-gsap";
import authContext from "../utils/AuthContext";
import axios from 'axios'
import {Avatar, Modal} from "antd";
import {UserOutlined} from "@ant-design/icons";
import InputGroup from "../miscellaneous/InputGroup";


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {
                first_name: '', last_name: '', email: '', staff_id: '', phone_number: '',
                department: '', address: '', designation: ''
            },
            openModal: false,
        }
    }

    async componentDidMount() {

    }

    handleChange = (e) => {
        const account = this.state.account;
        account[e.target.name] = e.target.value;
        this.setState({account})
    };

    setModal = () => {
        const {userDetail} = this.context;
        const account = this.state.account;
        account.first_name = userDetail.first_name;
        account.last_name = userDetail.last_name;
        account.staff_id = userDetail.staff_id;
        account.address = userDetail.address;
        account.designation = userDetail.designation;
        account.email = userDetail.email;
        account.department = userDetail.department;
        account.phone_number = userDetail.phone_number;
        this.setState({openModal: !this.state.openModal, account})


    };

    render() {
        const {userDetail} = this.context;
        const {
            account: {
                first_name, last_name, email, staff_id, phone_number, department,
                address, designation
            }
        } = this.state;
        const styles = {
            fontSize: 50,
            textAlign: 'center',
            margin: '20px auto'
        };
        return (
            <Fragment>
                <Modal visible={this.state.openModal}
                       onCancel={this.setModal}
                       footer={null}>
                    <div className="modal-input">
                        <h5>Edit profile</h5>
                        <form>
                            <InputGroup name='address'
                                        value={address}
                                        onChange={this.handleChange}
                                        label='Address'
                                        id='address'/>
                            <InputGroup name='phone_number'
                                        value={phone_number}
                                        onChange={this.handleChange}
                                        label='Phone Number'
                                        id='phone_number'/>
                            <InputGroup name='first_name'
                                        value={first_name}
                                        onChange={this.handleChange}
                                        label='First Name'
                                        disabled
                                        id='first_name'/>
                            <InputGroup name='last_name'
                                        value={last_name}
                                        onChange={this.handleChange}
                                        label='Last Name'
                                        disabled
                                        id='last_name'/>
                            <InputGroup name='designation'
                                        value={designation}
                                        onChange={this.handleChange}
                                        label='Designation'
                                        disabled
                                        id='designation'/>
                            <InputGroup name='department'
                                        value={department}
                                        onChange={this.handleChange}
                                        label='Department'
                                        disabled
                                        id='department'/>
                            <InputGroup name='staff_id'
                                        value={staff_id}
                                        onChange={this.handleChange}
                                        label='Staff ID'
                                        disabled
                                        id='staff_id'/>
                            <InputGroup name='email'
                                        value={email}
                                        disabled
                                        onChange={this.handleChange}
                                        label='Email'
                                        id='email'/>
                            <div className="text-center">
                                <button className='btn btn-success'>Update profile</button>
                            </div>
                        </form>
                    </div>
                </Modal>

                <section className='profile'>
                    <Timeline target={
                        <Fragment>
                    <div className='user-section'>
                        <div className="user-details">
                            <h5>Profile Details</h5>
                            <Avatar style={styles} size={150} icon={<UserOutlined/>}/>
                        </div>
                        <div className="background">
                            <button onClick={this.setModal} className='btn btn-success'>Edit profile</button>
                            <br/>
                            <h5>Welcome {userDetail.first_name}</h5>
                        </div>
                    </div>
                    <div className="main-section">
                        <div className='main-detail'>
                            <h6>Staff ID  &nbsp;<span>{userDetail.staff_id}</span></h6>
                            <hr/>
                            <h6>Email  &nbsp;<span>{userDetail.email}</span></h6>
                            <hr/>
                            <h6>First Name &nbsp;<span>{userDetail.first_name}</span></h6>
                            <hr/>
                            <h6>Last Name  &nbsp;<span>{userDetail.last_name}</span></h6>
                            <hr/>
                            <h6>Department  &nbsp;<span>{userDetail.department}</span></h6>
                            <hr/>
                            <h6>Designation &nbsp;<span>{userDetail.designation}</span></h6>
                            <hr/>
                            <h6>Gender  &nbsp;<span>{userDetail.gender}</span></h6>
                            <hr/>
                            <h5>----------Address----------</h5>
                            <p>{userDetail.address}</p>
                        </div>
                    </div>
                    </Fragment>}>
                        <Tween from={{opacity:0, y:'200px'}} delay={1} stagger={0.5}/>
                    </Timeline>

                </section>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default Profile;