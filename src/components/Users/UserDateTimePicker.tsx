import React from "react";

interface AvailableDate {
  id?: string;
  date: string;
  availableHours: string[];
}

interface DateTimePickerProps {
  availables: AvailableDate[];
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  setSelectedHour: (value: string) => void;
}

export function UserDateTimePicker({
  availables,
  selectedDate,
  setSelectedDate,
  setSelectedHour,
}: DateTimePickerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const filteredDates = availables.filter((item) => {
    const itemDate = new Date(item.date + "T12:00:00");
    itemDate.setHours(0, 0, 0, 0);
    return itemDate >= today;
  });

  const availableHours =
    availables.find((d) => d.date === selectedDate)?.availableHours || [];

  return (
    <div className="flex gap-1">
      <select
        onChange={(e) => setSelectedDate(e.target.value)}
        value={selectedDate}
      >
        <option value="">Selecione uma data</option>
        {filteredDates.map((item) => (
          <option key={item.id} value={item.date}>
            {item.date}
          </option>
        ))}
      </select>

      {selectedDate && (
        <select onChange={(e) => setSelectedHour(e.target.value)}>
          <option value="">Selecione um horário</option>
          {availableHours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
