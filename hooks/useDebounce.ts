import { useEffect, useState } from "react";

/**
 * Custom hook untuk mendebounce sebuah nilai.
 * @param value Nilai yang ingin di-debounce.
 * @param delay Waktu tunda (dalam milidetik).
 * @returns Nilai yang telah di-debounce.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timer untuk memperbarui nilai yang di-debounce setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Bersihkan timer jika value atau delay berubah sebelum waktu selesai
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
