import React, {Fragment} from 'react';
import {Input} from "antd";

const InputGroup = ({id, label, asterisk, onChange, name, value, placeholder, type, styles, ...rest}) => {
    return (
        <Fragment>
            <label style={styles} htmlFor={id} className='mb-2'>{label}
            {asterisk ? <span style={{color:'red'}}>*</span>: null}</label>
            {type === 'password' ? <Input.Password placeholder={placeholder}
                                                   className='input'
                                                   value={value}
                                                   name={name}
                                                    {...rest}
                                                   id={id}
                                                   onChange={onChange}/>
                :
                <Input  placeholder={placeholder}
                                value={value}
                                name={name}
                                className='input'
                                {...rest}
                                id={id}
                                onChange={onChange}/>
            }
        </Fragment>
    );
};

export default InputGroup;