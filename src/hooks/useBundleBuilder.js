import { useEffect, useMemo, useState } from "react";

import bundleData from "../data/data";
import productImages from "../data/productImages";

import motionSensorImage from "../assets/icons/sensor.png";
import hubImage from "../assets/icons/keypad.svg";
import shippingIcon from "../assets/icons/extra-protection.svg";

import {
  buildCameraReviewItems,
  buildFixedReviewItems,
  calculateReviewTotals,
  countItemsByCategory,
  countSelectedProducts,
  loadConfiguration,
  saveConfiguration,
} from "../features/components/BundleBuilder/utils/bundleHelpers";

const reviewImages = {
  motionSensor: motionSensorImage,
  hub: hubImage,

  microSdCard: motionSensorImage,

  shipping: shippingIcon,
};

function useBundleBuilder() {
  const cameraStep = bundleData.steps.find((step) => step.id === "cameras");

  const cameraProducts = cameraStep?.products || [];

  const summaryItems = bundleData.summaryItems || [];

  const [openStep, setOpenStep] = useState(1);

  const [configuration, setConfiguration] = useState(() => {
    return loadConfiguration(cameraProducts, summaryItems);
  });

  const { productSelections, fixedQuantities } = configuration;

  useEffect(() => {
    try {
      saveConfiguration(configuration);
    } catch (error) {
      console.error("Could not automatically save system:", error);
    }
  }, [configuration]);

  const toggleStep = (stepNumber) => {
    setOpenStep((currentStep) => {
      return currentStep === stepNumber ? null : stepNumber;
    });
  };

  const goToStep = (stepNumber) => {
    setOpenStep(stepNumber);
  };

  const changeVariant = (productId, variantId) => {
    setConfiguration((currentConfiguration) => {
      const currentSelection = currentConfiguration.productSelections[
        productId
      ] || {
        activeVariantId: variantId,
        quantities: {},
      };

      return {
        ...currentConfiguration,

        productSelections: {
          ...currentConfiguration.productSelections,

          [productId]: {
            ...currentSelection,
            activeVariantId: variantId,
          },
        },
      };
    });
  };

  const changeProductQuantity = (productId, variantId, newQuantity) => {
    const quantityKey = variantId || "default";

    const safeQuantity = Math.max(0, Number(newQuantity) || 0);

    setConfiguration((currentConfiguration) => {
      const currentSelection = currentConfiguration.productSelections[
        productId
      ] || {
        activeVariantId: variantId,
        quantities: {},
      };

      return {
        ...currentConfiguration,

        productSelections: {
          ...currentConfiguration.productSelections,

          [productId]: {
            ...currentSelection,
            activeVariantId: variantId,

            quantities: {
              ...currentSelection.quantities,
              [quantityKey]: safeQuantity,
            },
          },
        },
      };
    });
  };

  const cameraReviewItems = useMemo(() => {
    return buildCameraReviewItems({
      products: cameraProducts,
      productSelections,
      productImages,
    });
  }, [cameraProducts, productSelections]);

  const fixedReviewItems = useMemo(() => {
    return buildFixedReviewItems({
      summaryItems,
      fixedQuantities,
      reviewImages,
    });
  }, [summaryItems, fixedQuantities]);

  const reviewItems = useMemo(() => {
    return [...cameraReviewItems, ...fixedReviewItems];
  }, [cameraReviewItems, fixedReviewItems]);

  const selectedCounts = useMemo(() => {
    return {
      cameras: countSelectedProducts(cameraProducts, productSelections),

      plan: countItemsByCategory(fixedReviewItems, "plan"),

      sensors: countItemsByCategory(fixedReviewItems, "sensors"),

      protection: countItemsByCategory(fixedReviewItems, "accessories"),
    };
  }, [cameraProducts, productSelections, fixedReviewItems]);

  const totals = useMemo(() => {
    return calculateReviewTotals(reviewItems);
  }, [reviewItems]);

  const changeFixedQuantity = (itemId, newQuantity) => {
    const safeQuantity = Math.max(0, Number(newQuantity) || 0);

    setConfiguration((currentConfiguration) => ({
      ...currentConfiguration,

      fixedQuantities: {
        ...currentConfiguration.fixedQuantities,
        [itemId]: safeQuantity,
      },
    }));
  };

  const changeReviewQuantity = (itemId, newQuantity) => {
    if (itemId.startsWith("camera::")) {
      const [, productId, variantId] = itemId.split("::");

      changeProductQuantity(
        productId,
        variantId === "default" ? null : variantId,
        newQuantity,
      );

      return;
    }

    if (itemId.startsWith("fixed::")) {
      const fixedItemId = itemId.replace("fixed::", "");

      changeFixedQuantity(fixedItemId, newQuantity);
    }
  };

  const handleSave = () => {
    try {
      saveConfiguration(configuration);

      window.alert("Your security system has been saved.");
    } catch (error) {
      console.error("Could not save security system:", error);

      window.alert("Your security system could not be saved.");
    }
  };

  const handleCheckout = () => {
    window.alert("Checkout is not available in this prototype.");
  };

  return {
    openStep,
    cameraProducts,
    productSelections,
    reviewItems,
    selectedCounts,
    totals,

    toggleStep,
    goToStep,
    changeVariant,
    changeProductQuantity,
    changeReviewQuantity,
    handleSave,
    handleCheckout,
  };
}

export default useBundleBuilder;
