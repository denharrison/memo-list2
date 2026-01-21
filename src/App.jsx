import { useState, useMemo, useCallback } from 'react'
import './App.css'
import OrdersHeader from './OrdersHeader';
import OrdersList from './OrdersList';

function calcRevenue(orders) {
  let total = 0;
  for (const o of orders) {
    for (let i = 0; i < 2500; i++) total += (o.amount * i) % 13;
    total += o.amount;
  }
  return total;
}

function App() {
const [query, setQuery] = useState("");
const [sortDir, setSortDir] = useState("asc");

const [personalDataChecked, setPersonalDataChecked] = useState(false);
const onToggleSort = useCallback(() => {
  setSortDir((d) => (d === "asc" ? "desc" : "asc"));
}, []);

const orders = useMemo(
  () =>
    Array.from({ length: 800 }, (_, i) => ({
      id: i + 1,
      customer: `Customer ${i + 1}`,
      amount: (i * 7) % 97,
    })),
  [],
);

const visible = orders
  .filter((o) => o.customer.toLowerCase().includes(query.toLowerCase()))
  .sort((a, b) =>
    sortDir === "asc" ? a.amount - b.amount : b.amount - a.amount,
  );

const totalRevenue = calcRevenue(visible);

return (
  <div style={{ fontFamily: "sans-serif", maxWidth: 520, margin: "20px auto" }}>
    <h3>Orders</h3>
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search customers…"
      style={{ width: "100%", padding: 8, marginBottom: 10 }}
    />
    <OrdersHeader
      totalRevenue={totalRevenue}
      onToggleSort={onToggleSort}
      sortDir={sortDir}
    />
    <label style={{ marginBottom: "12px" }}>
      I agree to the processing of personal data
      <input
        type="checkbox"
        value={personalDataChecked}
        onChange={(e) => setPersonalDataChecked(e.target.checked)}
      />
    </label>
    <div style={{ border: "1px solid #ddd", maxHeight: 320, overflow: "auto" }}>
      <OrdersList users={visible}></OrdersList>
    </div>
  </div>
);
}

export default App
