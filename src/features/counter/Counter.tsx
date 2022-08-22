import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { decrement, increment, incrementByAmount, incrementAsync, incrementIfOdd, selectCount } from "./counterSlice";

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
  const incrementValue = Number(incrementAmount) || 0;
  
  return (
    <div className="counter">
      <h1 className="counter-title">Redux Toolkit Example Counter</h1>
      <div className="counter-wrapper">
        <button  aria-label="Decrement value" className="counter-button-decrement" onClick={() => dispatch(decrement())}>
          -
        </button>
        <span className="counter-value">{count}</span>
        <button aria-label="Increment value" className="counter-button-increment" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <div className="counter-customize">
        <input aria-label="Set increment amount" className="counter-add-input-value" onChange={(e) => setIncrementAmount(e.target.value)} type="text" value={incrementAmount} />
        <button className="counter-button-solid" onClick={() => dispatch(incrementByAmount(incrementValue))}>
          + Amount
        </button>
        <button className="counter-button-async" onClick={() => dispatch(incrementAsync(incrementValue))}>
          + Async
        </button>
        <button className="counter-button-outline" onClick={() => dispatch(incrementIfOdd(incrementValue))}>
          + If Odd
        </button>
      </div>
    </div>
  );
}
