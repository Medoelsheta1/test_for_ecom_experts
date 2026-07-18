import Button from "../../../components/ui/Buttons/Button";
import QuantityStepper from "../../../components/ui/QuantityStepper/QuantityStepper";

import guaranteeImage from "../../../assets/icons/satisfaction-guarantee.png";
import planIcon from "../../../assets/icons/plan.svg";

import "./ReviewPanel.css";

function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}

function ReviewPrice({ price, compareAtPrice, suffix = "" }) {
  return (
    <div className="review-price">
      {compareAtPrice !== undefined &&
        compareAtPrice !== null &&
        compareAtPrice > price && (
          <span className="review-price__compare">
            {formatPrice(compareAtPrice)}
            {suffix}
          </span>
        )}

      <span className="review-price__current">
        {price === 0 ? "FREE" : formatPrice(price)}
        {price !== 0 && suffix}
      </span>
    </div>
  );
}

function ReviewItem({ item, onQuantityChange }) {
  const itemPrice = item.price * item.quantity;

  const itemCompareAtPrice =
    item.compareAtPrice !== undefined
      ? item.compareAtPrice * item.quantity
      : null;

  return (
    <div className="review-item">
      <div className="review-item__image-box">
        <img className="review-item__image" src={item.image} alt={item.name} />
      </div>

      <div className="review-item__name">{item.name}</div>

      {item.canChangeQuantity !== false && (
        <QuantityStepper
          value={item.quantity}
          onChange={(quantity) => {
            onQuantityChange(item.id, quantity);
          }}
        />
      )}

      <ReviewPrice
        price={itemPrice}
        compareAtPrice={itemCompareAtPrice}
        suffix={item.suffix}
      />
    </div>
  );
}

function ReviewSection({ title, items, onQuantityChange }) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="review-section">
      <p className="review-section__title">{title}</p>

      <div className="review-section__items">
        {items.map((item) => (
          <ReviewItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
          />
        ))}
      </div>
    </section>
  );
}

function ReviewPanel({
  items,
  originalTotal,
  total,
  savings,
  onQuantityChange,
  onCheckout,
  onSave,
}) {
  const cameras = items.filter((item) => item.category === "cameras");

  const sensors = items.filter((item) => item.category === "sensors");

  const accessories = items.filter((item) => item.category === "accessories");

  const plan = items.find((item) => item.category === "plan");

  const shipping = items.find((item) => item.category === "shipping");

  return (
    <aside className="review-panel">
      <p className="review-panel__label">REVIEW</p>

      <header className="review-panel__header">
        <h2>Your security system</h2>

        <p>
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </header>
      <div className="review-panel__content">
        <div className="review-panel__content-section">
          <ReviewSection
            title="CAMERAS"
            items={cameras}
            onQuantityChange={onQuantityChange}
          />
x
        <ReviewSection
          title="SENSORS"
          items={sensors}
          onQuantityChange={onQuantityChange}
        />

        <ReviewSection
          title="ACCESSORIES"
          items={accessories}
          onQuantityChange={onQuantityChange}
        />

        {plan && (
          <section className="review-section">
            <p className="review-section__title">PLAN</p>

            <div className="review-plan">
              <div className="review-plan__name">
                <img src={planIcon} alt="" />

                <span>
                  Cam <strong>Unlimited</strong>
                </span>
              </div>

              <ReviewPrice
                price={plan.price}
                compareAtPrice={plan.compareAtPrice}
                suffix="/mo"
              />
            </div>
          </section>
        )}

        {shipping && (
          <div className="review-shipping">
            <div className="review-shipping__details">
              <div className="review-shipping__icon">
                <img src={shipping.image} alt="" />
              </div>

              <span>Fast Shipping</span>
            </div>

            <ReviewPrice
              price={shipping.price}
              compareAtPrice={shipping.compareAtPrice}
            />
          </div>
        )}
        </div>

        <div className="review-summary">
          <div className="review-summary__top">
            <img
              className="review-summary__guarantee"
              src={guaranteeImage}
              alt="100% satisfaction guarantee"
            />

            <div className="review-summary__total-area">
              <span className="review-summary__finance">
                as low as $19.19/mo
              </span>

              <div className="review-summary__totals">
                <span className="review-summary__original">
                  {formatPrice(originalTotal)}
                </span>

                <strong className="review-summary__total">
                  {formatPrice(total)}
                </strong>
              </div>
            </div>
          </div>

          <p className="review-summary__saving">
            Congrats! You’re saving {formatPrice(savings)} on your security
            bundle!
          </p>

          <Button
            fullWidth
            onClick={onCheckout}
            className="review-summary__checkout"
          >
            Checkout
          </Button>

          <button
            type="button"
            className="review-summary__save"
            onClick={onSave}
          >
            Save my system for later
          </button>
        </div>
      </div>
    </aside>
  );
}

export default ReviewPanel;
