export function formatBalance(sats: number): string {
  if (sats === 0) return '0';
  if (sats >= 1000000) return `${(sats / 1000000).toFixed(1)}M`;
  if (sats >= 1000) return `${(sats / 1000).toFixed(1)}k`;
  return new Intl.NumberFormat('en-US').format(sats);
}

export function formatBalanceLong(sats: number): string {
  if (sats === 0) return '0 sats';
  return new Intl.NumberFormat('en-US').format(sats) + ' sats';
}
