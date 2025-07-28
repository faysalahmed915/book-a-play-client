import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState('');

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/api/payments?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    const filteredPayments = payments.filter((p) =>
        p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalAmount = filteredPayments.reduce((acc, p) => acc + parseFloat(p.amount), 0).toFixed(2);
    const lastPayment = filteredPayments.length
        ? new Date(filteredPayments[0].paidAt).toLocaleString()
        : 'N/A';

    return (
        <div className="p-4 bg-base-100 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>

            <div className="flex flex-wrap-reverse lg:justify-between justify-center gap-2 mb-4">
                <div className="mb-4 flex items-center gap-3">
                    <FiSearch className="text-xl" />
                    <input
                        type="text"
                        placeholder="Search by Transaction ID"
                        className="input input-bordered w-full max-w-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <p className="input input-bordered">
                        Total Payments: <span className="font-bold text-green-600">{filteredPayments.length}</span>
                    </p>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-secondary text-secondary-content">
                                <tr>
                                    <th>#</th>
                                    <th>Transaction ID</th>
                                    <th>Amount</th>
                                    <th>Booking ID</th>
                                    <th>Paid At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPayments.map((payment, index) => (
                                    <tr key={payment._id} className="hover:bg-base-200 transition-colors duration-200">
                                        <td>{index + 1}</td>
                                        <td>
                                            <span
                                                title="Click to copy"
                                                className="tooltip tooltip-bottom cursor-pointer hover:underline"
                                                onClick={() => navigator.clipboard.writeText(payment.transactionId)}
                                                data-tip="Click to copy"
                                            >
                                                {payment.transactionId}
                                            </span>
                                        </td>
                                        <td className="font-semibold text-green-600">${payment.amount}</td>
                                        <td className="text-xs break-all">{payment.bookingId}</td>
                                        <td>{new Date(payment.paidAt).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* 🔽 Summary Section */}
                    <div className="mt-6 p-4 bg-base-200 rounded-lg text-sm flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <strong>Total Amount Paid:</strong>{' '}
                            <span className="text-green-600 font-semibold">${totalAmount}</span>
                        </div>
                        <div>
                            <strong>Most Recent Payment:</strong>{' '}
                            <span className="text-primary">{lastPayment}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PaymentHistory;
