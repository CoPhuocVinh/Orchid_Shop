"use client";

import * as React from "react";

import Fillter_Table from "./_component_fillter/Fillter_Table";

interface Order {
  id: string;
  amount: number;
  status: string;
  email: string;
}

function Grid_Order_Data_Table() {
  const [orders, setOrders] = React.useState<Order[]>([]);

  React.useEffect(() => {
    // Fetch data from JSON file
    fetch("dataOrder.json")
      .then((response) => response.json())
      .then((data) => setOrders(data.dataOrder))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-4">Order Bidding List</h1>
        </div>
        <div>
          <h1 className="text-xl font-semibold mb-4">Filter</h1>
          <Fillter_Table />
        </div>
      </div>

      <div className="w-full">
        <div className="flex items-center py-4">
          <div className="container mx-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Biding Id</th>

                  <th className="px-4 py-2">Bid Amount (USD)</th>
                  <th className="px-4 py-2">Highest Bid</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">Image</td>
                    <td className="border px-4 py-2">{order.id}</td>

                    <td className="border px-4 py-2">{order.amount}</td>
                    <td className="border px-4 py-2">Highest Bid</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2">Action</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Grid_Order_Data_Table;
