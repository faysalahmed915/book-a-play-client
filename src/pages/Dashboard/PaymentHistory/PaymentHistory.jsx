import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FiSearch, FiList, FiGrid, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [layout, setLayout] = useState('table'); // 'table' or 'card'
  const [page, setPage] = useState(1);

  // Items per page depending on layout
  const itemsPerPage = layout === 'table' ? 10 : 6;

  // Fetch payments securely for current user
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Filter payments by transaction ID (case-insensitive)
  const filteredPayments = payments.filter((p) =>
    p.transactionId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total amount paid (using discountedAmount if > 0 else original amount)
  const totalAmount = filteredPayments
    .reduce((acc, p) => {
      const discounted = parseFloat(p.discountedAmount);
      const original = parseFloat(p.amount);
      return acc + (discounted > 0 ? discounted : original);
    }, 0)
    .toFixed(2);

  // Calculate total original price
  const totalOriginalPrice = filteredPayments
    .reduce((acc, p) => acc + parseFloat(p.amount), 0)
    .toFixed(2);

  // Total saved amount
  const totalSaved = (totalOriginalPrice - totalAmount).toFixed(2);

  // Most recent payment date
  const lastPayment = filteredPayments.length
    ? new Date(filteredPayments[0].paidAt).toLocaleString()
    : 'N/A';

  // Calculate pagination pages count
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  // Calculate data slice for current page
  const paginatedPayments = filteredPayments.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handler to change page and scroll top
  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-4 bg-base-100 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Payment History</h2>

      {/* Search bar and layout toggle */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-3 flex-grow max-w-md">
          <FiSearch className="text-xl" />
          <input
            type="text"
            placeholder="Search by Transaction ID"
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // reset page on search
            }}
            aria-label="Search by Transaction ID"
          />
        </div>

        {/* Layout toggle buttons */}
        <div className="btn-group">
          <button
            onClick={() => {
              setLayout('table');
              setPage(1); // reset page on layout change
            }}
            className={`btn btn-sm ${layout === 'table' ? 'btn-primary' : 'btn-outline'}`}
            aria-pressed={layout === 'table'}
            aria-label="Table view"
          >
            <FiList className="inline-block mr-1" /> Table
          </button>
          <button
            onClick={() => {
              setLayout('card');
              setPage(1); // reset page on layout change
            }}
            className={`btn btn-sm ${layout === 'card' ? 'btn-primary' : 'btn-outline'}`}
            aria-pressed={layout === 'card'}
            aria-label="Card view"
          >
            <FiGrid className="inline-block mr-1" /> Card
          </button>
        </div>
      </div>

      {/* Loading */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : filteredPayments.length === 0 ? (
        <p className="text-center text-gray-500">No payments found.</p>
      ) : (
        <>
          {/* Conditionally render layout */}
          {layout === 'table' ? (
            // Table Layout
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-secondary text-secondary-content">
                  <tr>
                    <th>#</th>
                    <th>Transaction ID</th>
                    <th>Original Price (৳)</th>
                    <th>Amount Paid (৳)</th>
                    <th>You Saved (৳)</th>
                    <th>Booking ID</th>
                    <th>Paid At</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedPayments.map((payment, index) => {
                    const originalPrice = parseFloat(payment.amount) || 0;
                    const paidAmount =
                      parseFloat(payment.discountedAmount) > 0
                        ? parseFloat(payment.discountedAmount)
                        : originalPrice;
                    const savedAmount = (originalPrice - paidAmount).toFixed(2);

                    return (
                      <tr
                        key={payment._id}
                        className="hover:bg-base-200 transition-colors duration-200"
                      >
                        <td>{(page - 1) * itemsPerPage + index + 1}</td>

                        {/* Transaction ID with copy */}
                        <td>
                          <span
                            title="Click to copy"
                            className="tooltip tooltip-bottom cursor-pointer hover:underline"
                            onClick={() => navigator.clipboard.writeText(payment.transactionId)}
                            data-tip="Click to copy"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                navigator.clipboard.writeText(payment.transactionId);
                              }
                            }}
                          >
                            {payment.transactionId}
                          </span>
                        </td>

                        {/* Original price */}
                        <td className="text-gray-600">
                          {savedAmount > 0 ? (
                            <span className="line-through">{originalPrice.toFixed(2)}</span>
                          ) : (
                            originalPrice.toFixed(2)
                          )}
                        </td>

                        {/* Paid amount */}
                        <td className="font-semibold text-green-600">{paidAmount.toFixed(2)}</td>

                        {/* Saved amount */}
                        <td className={savedAmount > 0 ? 'text-success font-semibold' : ''}>
                          {savedAmount > 0 ? savedAmount : '-'}
                        </td>

                        {/* Booking ID */}
                        <td className="text-xs break-all">{payment.bookingId}</td>

                        {/* Payment date */}
                        <td>{new Date(payment.paidAt).toLocaleString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            // Card Layout
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedPayments.map((payment) => {
                const originalPrice = parseFloat(payment.amount) || 0;
                const paidAmount =
                  parseFloat(payment.discountedAmount) > 0
                    ? parseFloat(payment.discountedAmount)
                    : originalPrice;
                const savedAmount = (originalPrice - paidAmount).toFixed(2);

                return (
                  <div
                    key={payment._id}
                    className="bg-base-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
                    role="region"
                    aria-labelledby={`payment-${payment._id}-title`}
                  >
                    <h3
                      id={`payment-${payment._id}-title`}
                      className="text-lg font-semibold mb-2 break-words"
                      title={payment.transactionId}
                    >
                      Txn:{" "}
                      <span
                        className="cursor-pointer hover:underline"
                        onClick={() => navigator.clipboard.writeText(payment.transactionId)}
                        tabIndex={0}
                        role="button"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            navigator.clipboard.writeText(payment.transactionId);
                          }
                        }}
                      >
                        {payment.transactionId}
                      </span>
                    </h3>
                    <p>
                      <strong>Original Price: </strong>{" "}
                      {savedAmount > 0 ? (
                        <span className="line-through text-gray-600">
                          ৳{originalPrice.toFixed(2)}
                        </span>
                      ) : (
                        `৳${originalPrice.toFixed(2)}`
                      )}
                    </p>
                    <p className="font-semibold text-green-600">
                      <strong>Amount Paid: </strong>৳{paidAmount.toFixed(2)}
                    </p>
                    <p className={savedAmount > 0 ? "text-success font-semibold" : ""}>
                      <strong>You Saved: </strong>
                      {savedAmount > 0 ? `৳${savedAmount}` : '-'}
                    </p>
                    <p>
                      <strong>Booking ID: </strong>
                      <span className="break-all">{payment.bookingId}</span>
                    </p>
                    <p>
                      <strong>Paid At: </strong>
                      {new Date(payment.paidAt).toLocaleString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination controls */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="btn btn-sm btn-outline"
              aria-label="Previous page"
            >
              <FiChevronLeft />
            </button>

            {/* Render page numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => goToPage(i + 1)}
                className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                aria-current={page === i + 1 ? 'page' : undefined}
                aria-label={`Page ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="btn btn-sm btn-outline"
              aria-label="Next page"
            >
              <FiChevronRight />
            </button>
          </div>

          {/* Summary section */}
          <div className="mt-6 p-4 bg-base-200 rounded-lg text-sm flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <strong>Total Original Price:</strong>{' '}
              <span className="text-gray-600 font-semibold">৳{totalOriginalPrice}</span>
            </div>
            <div>
              <strong>Total Amount Paid:</strong>{' '}
              <span className="text-green-600 font-semibold">৳{totalAmount}</span>
            </div>
            <div>
              <strong>Total Saved:</strong>{' '}
              <span className="text-success font-semibold">৳{totalSaved}</span>
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
