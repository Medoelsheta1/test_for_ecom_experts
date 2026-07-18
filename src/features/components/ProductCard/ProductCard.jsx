import DiscountBadge from '../../../components/ui/Buttons/Button';
import Price from '../../../components/ui/Price/Price';
import QuantityStepper from '../../../components/ui/QuantityStepper/QuantityStepper';
import VariantSelector from '../../../components/ui/VariantSelector/VariantSelector';

import './ProductCard.css';
function ProductCard({
  product,
  selectedVariantId,
  quantity,
  totalQuantity,
  onVariantChange,
  onQuantityChange,
}) {
  const variants = product.variants || [];

  const activeVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  );

  const productImage = activeVariant?.image || product.image;
  const productPrice = activeVariant?.price ?? product.price;
  const compareAtPrice =
    activeVariant?.compareAtPrice ?? product.compareAtPrice;

  const isSelected = totalQuantity > 0;

  return (
    <article
      className={`product-card ${
        isSelected ? 'product-card--selected' : ''
      }`}
    >
      {product.badge && (
        <div className="product-card__badge">
          <DiscountBadge className="button--discount">
            {product.badge}
          </DiscountBadge>
        </div>
      )}

      <div className="product-card__image-wrapper">
        <img
          className="product-card__image"
          src={productImage}
          alt={product.title}
        />
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.title}</h3>

        {product.description && (
          <p className="product-card__description">
            {product.description}
          </p>
        )}

        {product.learnMoreUrl && (
          <a
            className="product-card__learn-more"
            href={product.learnMoreUrl}
          >
            Learn More
          </a>
        )}

        {variants.length > 0 && (
          <VariantSelector
            variants={variants}
            selectedVariantId={selectedVariantId}
            onSelect={onVariantChange}
          />
        )}

        <div className="product-card__footer">
          <QuantityStepper
            value={quantity}
            onChange={onQuantityChange}
          />

          <Price
            price={productPrice}
            compareAtPrice={compareAtPrice}
          />
        </div>
      </div>
    </article>
  );
}

export default ProductCard;