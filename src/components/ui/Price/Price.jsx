import './Price.css';

function Price({
  price,
  compareAtPrice,
  className = '',
}) {
  const hasDiscount =
    compareAtPrice && Number(compareAtPrice) > Number(price);

  return (
    <div className={`price ${className}`}>
      {hasDiscount && (
        <span className="price__compare">
          {compareAtPrice}
        </span>
      )}

      <span className="price__current">
        {price}
      </span>
    </div>
  );
}

export default Price;