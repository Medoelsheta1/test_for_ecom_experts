import './QuantityStepper.css';

function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 99,
  className = '',
}) {
  const decreaseQuantity = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increaseQuantity = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={`quantity-stepper ${className}`}>
      <button
        type="button"
        className="quantity-stepper__button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={decreaseQuantity}
      >
        −
      </button>

      <span className="quantity-stepper__value">{value}</span>

      <button
        type="button"
        className="quantity-stepper__button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={increaseQuantity}
      >
        +
      </button>
    </div>
  );
}

export default QuantityStepper;