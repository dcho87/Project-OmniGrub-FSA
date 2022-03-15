import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../store";

export default function Counter() {
  const counter = useSelector((state) => state.counter);
  let count
  counter ? count = counter.value : null;
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
