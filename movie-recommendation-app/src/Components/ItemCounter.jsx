import { useState } from "react";

const ItemCounter = ({ initialCount = 1, min = 1, max = 500, onCountChange }) => {
  const [count, setCount] = useState(initialCount);

  const handleDecrement = () => {
    if (count > min) {
      const newCount = count - 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  const handleIncrement = () => {
    if (count < max) {
      const newCount = count + 1;
      setCount(newCount);
      onCountChange(newCount);
    }
  };

  return (
    <div className="m-2 flex items-center space-x-4 border-white border-2 rounded-lg shadow-lg w-fit">
      <button
        onClick={handleDecrement}
        className="w-10 h-10 flex items-center justify-center text-white rounded-lg shadow-lg focus:outline-none"
      >
        -
      </button>
      <span className="text-xl text-white">{count}</span>
      <button
        onClick={handleIncrement}
        className="w-10 h-10 flex items-center justify-center text-white rounded-lg shadow-lg focus:outline-none"
      >
        +
      </button>
    </div>
  );
};

export default ItemCounter;