import './VariantSelector.css';

function VariantSelector({
  variants = [],
  selectedVariantId,
  onSelect,
}) {
  if (!variants.length) {
    return null;
  }

  return (
    <div className="variant-selector">
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;

        return (
          <button
            key={variant.id}
            type="button"
            className={`variant-selector__item ${
              isSelected ? 'variant-selector__item--selected' : ''
            }`}
            onClick={() => onSelect(variant.id)}
          >
            {variant.image ? (
              <img
                className="variant-selector__image"
                src={variant.image}
                alt=""
              />
            ) : (
              <span
                className="variant-selector__swatch"
                style={{ backgroundColor: variant.color }}
              />
            )}

            <span className="variant-selector__label">
              {variant.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default VariantSelector;