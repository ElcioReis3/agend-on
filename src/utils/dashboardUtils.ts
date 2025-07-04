export type TrendInfo = {
  percentage: string;
  isPositive: boolean;
};

export function calcularCrescimento(
  atual: number,
  anterior: number
): TrendInfo {
  if (anterior === 0) {
    if (atual === 0) {
      return { percentage: "0.0%", isPositive: true };
    }
    return { percentage: "+100.0%", isPositive: true };
  }

  const diff = atual - anterior;
  const percent = (diff / anterior) * 100;
  const isPositive = percent >= 0;

  const percentFormatado =
    Math.abs(percent) < 0.1
      ? "0.0%"
      : `${isPositive ? "+" : "-"}${Math.abs(Number(percent.toFixed(1)))}%`;

  return {
    percentage: percentFormatado,
    isPositive,
  };
}
