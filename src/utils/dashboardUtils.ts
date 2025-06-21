export type TrendInfo = {
  percentage: string;
  isPositive: boolean;
};

export function calcularCrescimento(
  atual: number,
  anterior: number
): TrendInfo {
  if (anterior === 0) return { percentage: "+0%", isPositive: true };

  const diff = atual - anterior;
  const percent = (diff / anterior) * 100;
  const isPositive = percent >= 0;

  return {
    percentage: `${isPositive ? "+" : ""}${percent.toFixed(1)}%`,
    isPositive,
  };
}
