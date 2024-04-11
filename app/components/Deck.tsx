"use client";
import React, { useState } from "react";
import { useTrail, a } from "@react-spring/web";

const Trail = ({ open, children }) => {
  const items = React.Children.toArray(children);
  console.log(items);

  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} className="trailsText" style={style}>
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

export function Extrail() {
  const [open, set] = useState(true);
  return (
    <div className="cards" onClick={() => set((state) => !state)}>
      <Trail open={open}>
        <span>work</span>
        <span>notes</span>
        <span>guestbook</span>
        <span>events</span>
        <span>music</span>
      </Trail>
    </div>
  );
}
