import React from "react";

const TransactionsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-1">Transactions</h1>
      <p className="text-sm text-gray-500 mb-6">View your payment history.</p>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <p className="text-gray-400 text-sm">Transaction history goes here.</p>
      </div>
    </div>
  );
};

export default TransactionsPage;
