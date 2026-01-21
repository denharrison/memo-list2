import { memo, useRef } from "react";

const OrdersHeader = memo(({ totalRevenue, onToggleSort, sortDir }) => {
  const renders = useRef(0);
  renders.current++;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
      }}
    >
      <div>
        <b>Total revenue:</b> {totalRevenue}{" "}
        <small style={{ color: "red" }}>(renders: {renders.current})</small>
      </div>
      <button onClick={onToggleSort}>Sort: {sortDir}</button>
    </div>
  );
})

export default OrdersHeader