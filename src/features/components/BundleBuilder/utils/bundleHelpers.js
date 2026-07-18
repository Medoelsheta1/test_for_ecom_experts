export const STORAGE_KEY = "saved-security-system";

export function createDefaultProductSelections(products = []) {
  return products.reduce((selections, product) => {
    const variants = product.variants || [];

    if (variants.length > 0) {
      const quantities = variants.reduce(
        (variantQuantities, variant) => ({
          ...variantQuantities,
          [variant.id]: Number(variant.initialQuantity || 0),
        }),
        {},
      );

      return {
        ...selections,
        [product.id]: {
          activeVariantId:
            product.defaultVariantId || variants[0].id,
          quantities,
        },
      };
    }

    return {
      ...selections,
      [product.id]: {
        activeVariantId: null,
        quantities: {
          default: Number(product.initialQuantity || 0),
        },
      },
    };
  }, {});
}

export function createDefaultConfiguration(
  cameraProducts,
  summaryItems,
) {
  const fixedQuantities = summaryItems.reduce(
    (quantities, item) => ({
      ...quantities,
      [item.id]: Number(item.initialQuantity || 0),
    }),
    {},
  );

  return {
    productSelections:
      createDefaultProductSelections(cameraProducts),
    fixedQuantities,
  };
}

function mergeProductSelections(
  defaultSelections,
  savedSelections = {},
) {
  return Object.keys(defaultSelections).reduce(
    (mergedSelections, productId) => {
      const defaultSelection =
        defaultSelections[productId];

      const savedSelection =
        savedSelections[productId] || {};

      return {
        ...mergedSelections,
        [productId]: {
          activeVariantId:
            savedSelection.activeVariantId ??
            defaultSelection.activeVariantId,

          quantities: {
            ...defaultSelection.quantities,
            ...(savedSelection.quantities || {}),
          },
        },
      };
    },
    {},
  );
}

export function loadConfiguration(
  cameraProducts,
  summaryItems,
) {
  const defaultConfiguration =
    createDefaultConfiguration(
      cameraProducts,
      summaryItems,
    );

  try {
    const savedValue =
      localStorage.getItem(STORAGE_KEY);

    if (!savedValue) {
      return defaultConfiguration;
    }

    const savedConfiguration =
      JSON.parse(savedValue);

    return {
      productSelections: mergeProductSelections(
        defaultConfiguration.productSelections,
        savedConfiguration.productSelections,
      ),

      fixedQuantities: {
        ...defaultConfiguration.fixedQuantities,
        ...(savedConfiguration.fixedQuantities || {}),
      },
    };
  } catch (error) {
    console.error(
      "Could not restore saved security system:",
      error,
    );

    return defaultConfiguration;
  }
}

export function saveConfiguration(configuration) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(configuration),
  );
}

export function buildCameraReviewItems({
  products,
  productSelections,
  productImages,
}) {
  return products.flatMap((product) => {
    const selection =
      productSelections[product.id] || {
        activeVariantId: null,
        quantities: {},
      };

    const variants = product.variants || [];

    if (variants.length === 0) {
      const quantity =
        Number(selection.quantities.default) || 0;

      if (quantity === 0) {
        return [];
      }

      return [
        {
          id: `camera::${product.id}::default`,
          category: "cameras",
          name: product.title,
          image: productImages[product.imageKey],
          quantity,
          price: Number(product.price || 0),
          compareAtPrice:
            product.compareAtPrice !== undefined
              ? Number(product.compareAtPrice)
              : undefined,
        },
      ];
    }

    return variants
      .filter((variant) => {
        return (
          Number(
            selection.quantities[variant.id],
          ) > 0
        );
      })
      .map((variant) => ({
        id: `camera::${product.id}::${variant.id}`,
        category: "cameras",
        name: product.title,
        variantName: variant.name,

        image:
          productImages[variant.imageKey] ||
          productImages[product.imageKey],

        quantity: Number(
          selection.quantities[variant.id],
        ),

        price: Number(
          variant.price ?? product.price ?? 0,
        ),

        compareAtPrice:
          variant.compareAtPrice !== undefined
            ? Number(variant.compareAtPrice)
            : product.compareAtPrice !== undefined
              ? Number(product.compareAtPrice)
              : undefined,
      }));
  });
}

export function buildFixedReviewItems({
  summaryItems,
  fixedQuantities,
  reviewImages,
}) {
  return summaryItems
    .map((item) => ({
      ...item,
      id: `fixed::${item.id}`,
      sourceId: item.id,

      image: item.imageKey
        ? reviewImages[item.imageKey]
        : undefined,

      quantity: Number(
        fixedQuantities[item.id] ??
          item.initialQuantity ??
          0,
      ),
    }))
    .filter((item) => {
      return (
        item.quantity > 0 ||
        item.canChangeQuantity === false
      );
    });
}

export function countSelectedProducts(
  products,
  productSelections,
) {
  return products.filter((product) => {
    const quantities =
      productSelections[product.id]?.quantities || {};

    return Object.values(quantities).some(
      (quantity) => Number(quantity) > 0,
    );
  }).length;
}

export function countItemsByCategory(
  items,
  category,
) {
  return items.filter((item) => {
    return (
      item.category === category &&
      Number(item.quantity) > 0
    );
  }).length;
}

export function calculateReviewTotals(items) {
  const hardwareItems = items.filter((item) => {
    return (
      item.category !== "shipping" &&
      item.category !== "plan"
    );
  });

  const originalTotal = hardwareItems.reduce(
    (total, item) => {
      const originalPrice =
        item.compareAtPrice !== undefined
          ? Number(item.compareAtPrice)
          : Number(item.price);

      return (
        total +
        originalPrice * Number(item.quantity)
      );
    },
    0,
  );

  const total = hardwareItems.reduce(
    (currentTotal, item) => {
      return (
        currentTotal +
        Number(item.price) *
          Number(item.quantity)
      );
    },
    0,
  );

  return {
    originalTotal,
    total,
    savings: Math.max(0, originalTotal - total),
  };
}