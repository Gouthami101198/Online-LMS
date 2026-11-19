/**
 * Formats a number into Indian Rupee format (e.g. ₹14,89,200 or ₹4,999)
 */
export const formatINR = (amount: number): string => {
  return `₹${Math.round(amount).toLocaleString('en-IN')}`;
};

/**
 * Compact Indian format (e.g. ₹14.8L or ₹88.4K)
 */
export const formatINRCompact = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)} Lakh`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}k`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

