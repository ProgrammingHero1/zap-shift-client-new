import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`)

            return res.data;
        }
    })

    const handleAcceptDelivery = parcel => {
        const statusInfo = { deliveryStatus: 'rider_arriving' }
        axiosSecure.patch(`/parcels/${parcel._id}/status`, statusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Thank you for accepting.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
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
                        {parcels.map((parcel, i) => <tr key={parcel._id}>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>
                            <td>
                                {
                                    parcel.deliveryStatus === 'driver_assigned'
                                    ? <>
                                        <button
                                            onClick={() => handleAcceptDelivery(parcel)}
                                            className='btn btn-primary text-black'>Accept</button>
                                        <button className='btn btn-warning text-black ms-2'>Reject</button>
                                    </>
                                    : <span>Accepted</span>    
                                }

                            </td>
                            <td>Blue</td>
                        </tr>)}


                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default AssignedDeliveries;