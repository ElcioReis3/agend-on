export function generateHours(
  start: string,
  end: string,
  interval: number,
  buffer: number
) {
  const hours: string[] = [];
  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  let current = new Date();
  current.setHours(startHours, startMinutes, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHours, endMinutes, 0, 0);

  while (current <= endDate) {
    const hoursFormatted = current.getHours().toString().padStart(2, "0");
    const minutesFormatted = current.getMinutes().toString().padStart(2, "0");
    hours.push(`${hoursFormatted}:${minutesFormatted}`);

    current.setMinutes(current.getMinutes() + interval + buffer);
  }

  return hours;
}

export async function buscarHorariosOcupados(data: Date) {
  const dataFormatada = data.toISOString().split("T")[0];
  const respostaFake: Record<string, string[]> = {
    "2025-04-29": ["08:00", "09:20", "14:00"],
    "2025-04-30": ["08:00", "14:00"],
  };

  // Simula chamada à API
  return respostaFake[dataFormatada] || [];
}

/* 
inicio -> start
fim -> end
horarios -> hours
atual -> current
fimDate -> endDate
horas -> hoursFormatted
minutos -> minutesFormatted
intervalo -> interval
buffer -> buffer  */
