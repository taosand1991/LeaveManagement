import React, {Component, Fragment} from 'react';
import {Tween, Timeline} from 'react-gsap';
import {Input, Radio, message} from "antd";
import {KeyOutlined} from "@ant-design/icons";
import {Link} from 'react-router-dom'
import InputGroup from "../miscellaneous/InputGroup";
import axios from 'axios'
import authContext from "../utils/AuthContext";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:true,
            isRegister:false,
            register:{email:'', staff_id:'', password:'', password2:'', department:'', designation:'',
                first_name:'', last_name:''},
            gender:'',
            selectedUser:'',
            login:{ email_1:'', password_1: '', staff_id_1:''},
            emailResponse:[],
            emailId: '',
            errors:{},
            loading:false,
        }
    }
    setRegister =(e)=>{
        e.preventDefault();
        this.setState({
            isRegister:true,
            isLogin:false
        })
    };

    setLogin =(e)=>{
        e.preventDefault();
        this.setState({isLogin:true, isRegister:false})
        };

    handleRegisterChange =(e)=>{
        const register = this.state.register;
        register[e.target.name] = e.target.value;
        this.setState({register})
    };

    handleChange =(e)=> {
        const login = this.state.login;
        login[e.target.name] = e.target.value;
        this.setState({login})
    };

   handleBlur =async()=>{
       const {login:{staff_id_1}} = this.state;
       const errors = this.state.errors;
       errors['staff'] = '';
       if(staff_id_1.trim() !== '' || staff_id_1 !== ''){
           const api = `http://127.0.0.1:8000/api/user/${staff_id_1}/user_staff/`;
           const {data:emailResponse} = await axios.get(api);
          if(emailResponse.length > 0){
              delete errors['staff'];
              this.setState({emailResponse, emailId:emailResponse[0].email, errors})
          }else{
              errors['staff'] = 'No staff with the ID found in the database';
              this.setState({errors, emailId:''})
          }
       }
   };

   handleSubmitLogin =async(e)=>{
       e.preventDefault();
       const {refreshPage} = this.context;
       this.setState({loading:true});
       const {emailId, login:{password_1}} = this.state;
       const object = {
           email:emailId,
           password:password_1,
       };
       const apiCall = 'http://127.0.0.1:8000/auth/login/';
       try{
           const response = await axios.post(apiCall, object);
           setTimeout(() =>{
               this.setState({loading:false});
               localStorage.setItem('token', response.data.token);
               refreshPage();
               this.props.history.push('/');
           }, 3000)
       }catch (e) {
           if(e){
               this.setState({loading:false});
               console.log(e.response.data)
           }
       }
   };

   handleEmployChange =(value)=>{
       this.setState({gender:value});
   };

   handleGenderChange =(value)=>{
       this.setState({selectedUser:value});
   };

   handleRegistration =async(e)=>{
       e.preventDefault();
       this.setState({loading:true});
       const apiCall = 'http://127.0.0.1:8000/api/user/';
       const {register:{first_name, last_name, staff_id, password, password2, designation,
       department, email, gender, selectedUser}} = this.state;
       if(selectedUser === 'employee') {
           const userObject = {
               first_name,
               last_name,
               staff_id,
               password,
               password2,
               department,
               designation,
               email,
               gender,
               is_employee:true,
           };
           try{
               const response = await axios.post(apiCall, userObject);
               localStorage.setItem('token', response.data.token);
               setTimeout(() => {
                   message.success('Registration successful', 5);
                   this.setState({loading:false});
                   this.prop.history.push('/')
               })
           }catch (e) {
               this.setState({loading:false});
               const errors = this.state.errors;
               errors['email'] = e.response.data.email;
               this.setState({errors})
           }
       }else{
           const userObject = {
               first_name,
               last_name,
               staff_id,
               password,
               password2,
               department,
               designation,
               email,
               gender,
               is_employer:true,
           };
           try{
               const response = await axios.post(apiCall, userObject);
               localStorage.setItem('token', response.data.token);
               setTimeout(() => {
                   message.success('Registration successful', 5);
                   this.setState({loading:false});
                   this.prop.history.push('/')
               }, 2000)
           }catch (e) {
               this.setState({loading:false});
               const errors = this.state.errors;
               errors['email'] = e.response.data.email;
               this.setState({errors})
           }
       }
   };


    render() {
        const {isLogin, isRegister, register:{email, first_name, last_name,
        password, password2, department, designation, staff_id},errors, emailId,loading,
        login:{staff_id_1, password_1}, gender, selectedUser} = this.state;
        const styles = {
            color:'red'
        };
        return (
            <Fragment>
                {loading && <div className='loading'/>}
                <section className='login'>
                    <div className='text-login'>
                        <Timeline target={
                            <Fragment>
                                <img src="/static/image/employee.png" alt="employ"/>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab architecto aspernatur,
                                    assumenda beatae cum ex necessitatibus omnis praesentium quis rem totam vitae
                                    voluptate! A aperiam architecto asperiores beatae culpa ea excepturi explicabo fuga
                                    incidunt magni molestias neque nihil obcaecati, perferendis perspiciatis
                                    reprehenderit temporibus ut voluptatem. Maxime, possimus quia? Molestiae, quo!
                                </p>
                            </Fragment>
                        }>
                            <Tween from={{opacity: 0}} stagger={0.2} delay={.5}/>
                        </Timeline>
                    </div>
                    <div className='login-page'>
                        <h3><KeyOutlined style={{display: 'inline-block', marginRight: 5, color:'white'}}/>
                                    <Link className={isLogin ? 'active' : null} onClick={this.setLogin} to={'#'}>LOGIN</Link>&nbsp;
                                    | <Link className={isRegister ? 'active' : null} onClick={this.setRegister} to={'#'}>Register</Link></h3>
                        {isLogin && <Timeline target={
                            <Fragment>
                                <form onSubmit={this.handleSubmitLogin}>
                                    <label className='mb-2' htmlFor='staff_id'>Staff ID <span style={{color:'red'}}>*</span></label>
                                    <Input placeholder='Enter staff ID'
                                           name='staff_id_1'
                                           value={staff_id_1}
                                           onChange={this.handleChange}
                                           onBlur={this.handleBlur}
                                           required/>
                                    {errors.staff && <small style={styles}>{errors.staff}</small>}<br/>
                                    <label className='mb-2' htmlFor="email">Email <span style={{color: 'red'}}>*</span></label>
                                    <Input placeholder='Enter your email'
                                           id='email'
                                           value={emailId}
                                           disabled={emailId === ''}
                                           name='email_1'/>
                                    <label className='mb-2' htmlFor="password">Password <span
                                        style={{color: 'red'}}>*</span></label>
                                    <Input.Password placeholder='password'
                                                    id='password'
                                                    disabled={emailId === ''}
                                                    value={password_1}
                                                    onChange={this.handleChange}
                                                    name='password_1'/>
                                    <div className='mt-2'>
                                        <button disabled={emailId ==='' || password_1 === ''} className='btn btn-success'>Login</button>
                                        <Link to='#'>Forgot your password?</Link>
                                    </div>
                                </form>
                            </Fragment>
                        }>
                            <Tween from={{opacity:0, x:'200px'}} stagger={0.3} delay={1}/>
                        </Timeline>}
                        {isRegister && <div className='register-page'>
                        <Timeline target={
                            <Fragment>
                                <form>
                                <InputGroup id='Email'
                                            label='Email'
                                            required
                                            asterisk
                                            value={email}
                                            name='email'
                                            onChange={this.handleRegisterChange}
                                            placeholder='Enter Email'/>
                                <InputGroup id='first_name'
                                            label='First Name'
                                            required
                                            asterisk
                                            value={first_name}
                                            name='first_name'
                                            onChange={this.handleRegisterChange}
                                            placeholder='First Name...'/>
                                <InputGroup id='last_name'
                                            label='Last Name'
                                            required
                                            asterisk
                                            value={last_name}
                                            name='last_name'
                                            onChange={this.handleRegisterChange}
                                            placeholder='Last Name...'/>
                                <InputGroup id='staff_id'
                                            label='Staff ID'
                                            required
                                            asterisk
                                            value={staff_id}
                                            name='staff_id'
                                            onChange={this.handleRegisterChange}
                                            placeholder='Staff ID.....'/>
                                <InputGroup id='password'
                                            label='Password'
                                            type='password'
                                            required
                                            asterisk
                                            value={password}
                                            name='password'
                                            onChange={this.handleRegisterChange}
                                            placeholder='Password.....'/>
                                <InputGroup id='password2'
                                            type='password'
                                            label='Confirm  Password'
                                            required
                                            asterisk
                                            value={password2}
                                            name='password2'
                                            onChange={this.handleRegisterChange}
                                            placeholder='Confirm password'/>
                                <InputGroup id='department'
                                            label='Department'
                                            required
                                            asterisk
                                            value={department}
                                            name='department'
                                            onChange={this.handleRegisterChange}
                                            placeholder='Department....'/>
                                <InputGroup id='designation'
                                            label='Designation'
                                            asterisk
                                            required
                                            value={designation}
                                            name='designation'
                                            onChange={this.handleRegisterChange}
                                            placeholder='Designation'/>
                                    <label className='mb-2 mt-2' htmlFor="gender">Gender</label><br/>
                                 <Radio.Group onChange={this.handleGenderChange}>
                                     <Radio value='Male'>Male</Radio>
                                     <Radio value='Female'>Female</Radio>
                                 </Radio.Group><br/>
                                  <label className='mb-2 mt-2' htmlFor="employ">Employment Type</label><br/>
                                 <Radio.Group onChange={this.handleEmployChange}>
                                     <Radio value='employee'>Employee</Radio>
                                     <Radio value='employer'>Employer</Radio>
                                 </Radio.Group><br/>
                                 <button disabled={gender === ''|| selectedUser ===''} className='btn btn-outline-primary mt-2'>Register</button>
                                </form>
                            </Fragment>
                        }>
                        <Tween from={{opacity:0, x:'200px'}} stagger={0.3} delay={1}/>
                        </Timeline>
                    </div>}
                    </div>

                </section>
            </Fragment>
        );
    }
    static contextType = authContext;
}

export default Login;