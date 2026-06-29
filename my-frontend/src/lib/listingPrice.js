export const CURRENCY_SYMBOL =
  import.meta.env.VITE_CURRENCY_SYMBOL || "₹";

export const CURRENCY_LOCALE =
  import.meta.env.VITE_CURRENCY_LOCALE || "en-IN";

export function formatPrice(amount) {
  const value = Number(amount) || 0;
  if (value <= 0) return "";

  return `${CURRENCY_SYMBOL} ${value.toLocaleString(CURRENCY_LOCALE)}`;
}

export function getListingPrice(item) {
  const price = Number(item?.price) || 0;
  const salePrice = Number(item?.salePrice) || 0;

  if (salePrice > 0 && price > 0 && salePrice < price) {
    return salePrice;
  }

  return price > 0 ? price : salePrice;
}

export function normalizeListingPrices(price, salePrice) {
  const normalizedPrice = Number(price) || 0;
  let normalizedSalePrice = Number(salePrice) || 0;

  if (
    normalizedSalePrice <= 0 ||
    normalizedPrice <= 0 ||
    normalizedSalePrice >= normalizedPrice
  ) {
    normalizedSalePrice = undefined;
  }

  return {
    price: normalizedPrice,
    salePrice: normalizedSalePrice,
  };
}
