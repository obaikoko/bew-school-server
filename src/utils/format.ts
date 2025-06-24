function formatCurrency(value?: number | string | null): string {
  if (!value || isNaN(Number(value))) return '₦-';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(Number(value));
}

function formatDate(value?: string | null): string {
  if (!value) return '-';
  const date = new Date(value);
  return date.toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

