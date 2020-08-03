import React, {Fragment} from 'react';
import {Radio} from "antd";

const RadioGroup = ({onChange,  id, label, value, name}) => {
    return (
        <Fragment>
            <label htmlFor={id}>{label}</label><br/>
            <Radio.Group onChange={onChange} className='mb-2'>
                <Radio value={value}>{name}</Radio>
                <Radio value={value}>{name}</Radio>
            </Radio.Group>
        </Fragment>
    );
};

export default RadioGroup;