import { memo, useRef } from "react";

const OrdersList = memo (({ users }) =>  {
  const renders = useRef(0);
  renders.current++;
  return (
    <>
      <small style={{ color: "red" }}>
        List Render Counts {renders.current}
      </small>
      {users.slice(0, 50).map((o) => (
        <div key={o.id} style={{ padding: 6, borderBottom: "1px solid #eee" }}>
          {o.customer} — ${o.amount}
        </div>
      ))}
    </>
  );
})

export default OrdersList