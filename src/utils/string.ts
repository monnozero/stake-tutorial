export const trimTrailingSlash = (input: string): string => {
  return input.endsWith('/') ? trimTrailingSlash(input.slice(0, -1)) : input;
};

export const shortenAddress = (address?: string): string => {
  if (!address) {
    return '';
  }

  const length = address.length;
  if (length <= 15) {
    return address;
  }

  return `${address.substring(0, 6)}...${address.substring(length - 6, length)}`;
};

export const formatBalance = (balance: bigint | undefined, decimal: number = 10): string => {
  if (!balance) return '';

  return (parseFloat(balance.toString()) / Math.pow(10, decimal)).toFixed(4).toString();
};


export const formatLockingPeriod = (time: bigint | undefined): string => {
  if (!time) return '';

  return (parseInt(time.toString()) / 1000).toString();
};

