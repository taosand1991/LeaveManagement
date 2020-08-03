import React, {Component, Fragment} from 'react';
import axios from 'axios';
import moment from 'moment'


class LeaveStatus extends Component {
   constructor(props) {
       super(props);
       this.state ={
           leaves:[]
       }
   }


       async componentDidMount() {
       const token = localStorage.getItem('token');
            const apiCall = 'http://127.0.0.1:8000/api/leave/get_user';
            try {
                const {data:leaves} = await axios.get(apiCall, {
                    headers:{'Authorization': `JWT ${token}`}
                });
                this.setState({leaves})
            }catch (e) {
                console.log(e.response.data)
            }
       }

       render() {
       const {leaves} = this.state;

           return (
               <Fragment>
                   <section className='leave-status'>
                       <div className="leave-table">
                           <table className='table table-striped table-sm table-bordered '>
                               <thead>
                               <tr>
                                   <th>Leave Application Date</th>
                                   <th>Status</th>
                                   <th>Approved/Disapproved by</th>
                               </tr>
                               </thead>
                               <tbody>
                               {leaves !== undefined && leaves.map(li => {
                                   return <tr key={li.id}>
                                   <td>{moment(li.time_stamp).toDate().toDateString()}</td>
                                   <td style={li.is_pending ? {backgroundColor:'gold', textAlign:'center'}:
                                       {backgroundColor:'green', textAlign:'center'}}>{li.is_pending ?
                                       <span style={{ color:'white', textAlign:'center'}}>PENDING</span> :
                                       <span style={{color:'white', textAlign:'center'}}>APPROVED</span>}</td>
                                   <td>{li.approved}</td>
                               </tr>
                               })}
                               </tbody>
                           </table>
                       </div>
                   </section>
               </Fragment>
           );
       }
}

export default LeaveStatus;