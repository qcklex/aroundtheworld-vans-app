import React from "react";

interface Transaction {
  amount: number;
  date: string;
  id: string;
}

const Income: React.FC = () => {
  const transactionsData: Transaction[] = [
    { amount: 720, date: "Jan 3, '23", id: "1" },
    { amount: 560, date: "Dec 12, '22", id: "2" },
    { amount: 980, date: "Dec 3, '22", id: "3" },
  ];
  
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Income</h1>
      <p className="text-gray-600 mb-4">
        Last <span className="font-medium">30 days</span>
      </p>
      <h2 className="text-4xl font-bold mb-8">$2,260</h2>
      
      <img
        className="w-full h-64 object-contain bg-white p-4 rounded-lg shadow-sm mb-8"
        src="/assets/images/income-graph.png"
        alt="Income graph"
      />
      
      <div className="flex justify-between items-baseline mb-4">
        <h3 className="text-xl font-bold">Your transactions (3)</h3>
        <p className="text-gray-600">
          Last <span className="font-medium">30 days</span>
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {transactionsData.map((item, index) => (
          <div 
            key={item.id} 
            className={`flex justify-between p-4 ${
              index < transactionsData.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <h3 className="font-bold text-xl">${item.amount}</h3>
            <p className="text-gray-600">{item.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Income;