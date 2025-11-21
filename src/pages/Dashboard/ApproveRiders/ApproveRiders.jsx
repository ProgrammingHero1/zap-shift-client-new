import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';

const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const { data: riders = [] } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    })

    const handleApproval = id => {
        
    }

    return (
        <div>
            <h2 className="text-5xl">Riders Pending Approval: {riders.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>District</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, index) => <tr>
                                <th>{index + 1}</th>
                                <td>{rider.name}</td>
                                <td>{rider.email}</td>
                                <td>{rider.district}</td>
                                <td>{rider.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleApproval(rider._id)} className='btn'>
                                        <FaUserCheck />
                                    </button>
                                    <button className='btn'>
                                        <IoPersonRemoveSharp />
                                    </button>
                                    <button className='btn'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;