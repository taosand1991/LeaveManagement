import React, {Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import authContext from "../utils/AuthContext";

const NavBar = () => {
    const [state, setState] = useState({open: false});
    const context = React.useContext(authContext);
    const {user} = context;

    useEffect(() => {
        window.addEventListener('scroll', function () {
            const sticky = document.querySelector('nav');
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                sticky.style.padding = '50px 60px'
            } else {
                sticky.style.padding = '10px 20px'
            }
        })
    }, []);


    const handleOpen = () => {
        setState(prevState => ({
            open: !state.open
        }));
        if (!state.open) {
            document.getElementById('sidenav').style.width = '100%'
        } else {
            document.getElementById('sidenav').style.width = '0'
        }
    };
    return (
        <Fragment>
            <header>
                <p className='logo'><Link to='/'>Employee Management</Link></p>
                <nav>
                    <ul className='normal-link'>
                        {!user && <li><Link to='login'>Login</Link></li>}
                        {user && <li><Link to='logout'>Logout</Link></li>}
                        <li><Link to={'/about'}>About</Link></li>
                        <li><Link to='/contact'>Contact</Link></li>
                        {user !== undefined && user.employer &&
                        <li className='dropList'><Link to='#'>Leaves</Link>
                            <ul className='dropbtn'>
                                <li><Link to='approved-leave'>View Pending Leave</Link></li>
                                <li><Link to='employee-stat'>View Employee Stats</Link></li>
                            </ul>
                        </li>}
                        {user !== undefined && user.employee &&
                        <li className='dropList'><Link to='#'>Leaves</Link>
                            <ul className='dropbtn'>
                                <li><Link to='/apply-leave'>Apply For Leave</Link></li>
                                <li><Link to='/leave-status'>View Leave Status</Link></li>
                                <li><Link to='/leave-balance'>View Leave Balance</Link></li>
                            </ul>
                        </li>}
                        {user && <li><Link to='/profile'>Profile</Link></li>}
                    </ul>

                </nav>
                <div onClick={handleOpen} className={state.open ? 'hamburger open' : 'hamburger'}>
                    <span className='line'/>
                    <span className='line'/>
                    <span className='line'/>
                </div>
            </header>
            <div id="sidenav">
                {user && <Link onClick={handleOpen} to='/profile'>Profile</Link>}
                {!user && <Link onClick={handleOpen} className='items' to={'/login'}>Login</Link>}
                {user && <Link onClick={handleOpen} className='items' to={'/logout'}>logout</Link>}
                <Link className='items' to={'/contact'}>Contact us</Link>
                <Link className='items' to={'/about'}>About us</Link>
                {user !== undefined && user.employer &&
                <Link className='drop' to='#'>Leaves
                    <div className='dropDown'>
                        <Link onClick={handleOpen} to={'/approved-leave'}>View Pending Leaves</Link>
                        <Link onClick={handleOpen} to={'/employee-stat'}>View Employee Stats</Link>
                    </div>
                </Link>
                }
                {user !== undefined && user.employee &&
                <Link className='drop' to='#'>Leaves
                    <div className='dropDown'>
                        <Link to={'/apply-leave'}>Apply For Leave</Link>
                        <Link to={'/leave-status'}>View Leave Status</Link>
                        <Link to={'/leave-balance'}>View Leave Balance</Link>
                    </div>
                </Link>
                }
            </div>
        </Fragment>
    );
};

export default NavBar;