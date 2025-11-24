import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [] } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure
            .get(`/parcels?riderEmail=${user.email}&deliveryStatus=driver_assigned`)
            return res.data;
        }
    })

    const handleParcelAccept = parcel =>{
        
    }
    const handleParcelReject = parcel =>{

    }

    return (
        <div>
            <h2 className="text-4xl">Parcels Pending Pickup: {parcels.length}</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Confirm</th>
                            <th>Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>
                                <button
                                onClick={() => handleParcelAccept(parcel)}
                                 className='btn btn-primary text-black'>Accept</button>
                                <button 
                                onClick={() => handleParcelReject(parcel)}
                                className="btn btn-secondary text-white">Reject</button>
                            </td>
                            <td>Blue</td>
                        </tr>)}


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AssignedDeliveries;