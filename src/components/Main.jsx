import React, {Component, Fragment} from 'react';
import authContext from "../utils/AuthContext";
import {Route, Switch, Redirect} from "react-router-dom";
import userToken from '../utils/TokenAuthentication'
import jwtDecode from 'jwt-decode';
import NavBar from "./NavBar";
import Logout from "./Logout";
import Profile from "./Profile";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Contact from "./Contact";
import About from "./About";
import axios from "axios";
import LeaveApplication from "./employee/LeaveApplication";
import LeaveBalance from "./employee/LeaveBalance";
import LeaveStatus from './employee/LeaveStatus';
import ApprovedLeaves from "./employer/ApprovedLeaves";
import EmployeeStat from "./employer/EmployeeStat";


class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetail:{}
        }
    }


    async componentDidMount() {
        const token = localStorage.getItem('token');
        if (token) {
            const user = jwtDecode(token);
            this.setState({user});
            const apiCall = `http://127.0.0.1:8000/api/user/${user.user_id}/`;
            try {
                const {data:userDetail} = await axios.get(apiCall);
                this.setState({userDetail})
            } catch (e) {
                if(e) {
                    console.log(e.response.data)
                }
            }
        }

    }

    refreshPage = () => {
        this.componentDidMount();
    };

    render() {
        const {user, userDetail} = this.state;
        console.log(user);
        console.log(userDetail);
        const {refreshPage} = this;
        return (
            <Fragment>
                <authContext.Provider value={{user, refreshPage, userDetail}}>
                    <NavBar/>
                    <Switch>
                        <Route path='/login' component={Login}/>
                        <Route path='/profile' component={Profile}/>
                        <Route path='/apply-leave' component={LeaveApplication}/>
                        <Route path='/leave-balance' component={LeaveBalance}/>
                        <Route path='/leave-status' component={LeaveStatus}/>
                        <Route path='/approved-leave' component={ApprovedLeaves}/>
                        <Route path='/employee-stat' component={EmployeeStat}/>
                        <Route path='/contact' component={Contact}/>
                        <Route path='/about' component={About}/>
                        <Route path='/logout' component={Logout}/>
                        <Route path='/' component={LandingPage}/>
                    </Switch>
                </authContext.Provider>
            </Fragment>
        );
    }

    static contextType = authContext;
}

export default Main;