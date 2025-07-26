import { celsiusToFahrenheit, fahrenheitToCelsius } from "../utils/tempUtils";

describe("Temperature Conversion Functions", () => {
  describe("celsiusToFahrenheit", () => {
    test("should convert 0°C to 32°F", () => {
      expect(celsiusToFahrenheit(0)).toBe(32);
    });

    test("should convert 100°C to 212°F", () => {
      expect(celsiusToFahrenheit(100)).toBe(212);
    });

    test("should convert -40°C to -40°F", () => {
      expect(celsiusToFahrenheit(-40)).toBe(-40);
    });

    test("should convert 25°C to 77°F", () => {
      expect(celsiusToFahrenheit(25)).toBe(77);
    });

    test("should handle decimal values", () => {
      expect(celsiusToFahrenheit(37.5)).toBe(99.5);
    });
  });

  describe("fahrenheitToCelsius", () => {
    test("should convert 32°F to 0°C", () => {
      expect(fahrenheitToCelsius(32)).toBe(0);
    });

    test("should convert 212°F to 100°C", () => {
      expect(fahrenheitToCelsius(212)).toBe(100);
    });

    test("should convert -40°F to -40°C", () => {
      expect(fahrenheitToCelsius(-40)).toBe(-40);
    });

    test("should convert 77°F to 25°C", () => {
      expect(fahrenheitToCelsius(77)).toBe(25);
    });

    test("should handle decimal values", () => {
      expect(fahrenheitToCelsius(98.6)).toBeCloseTo(37, 1);
    });
  });

  describe("Round-trip conversion", () => {
    test("should maintain precision in round-trip conversion", () => {
      const originalCelsius = 23.5;
      const fahrenheit = celsiusToFahrenheit(originalCelsius);
      const backToCelsius = fahrenheitToCelsius(fahrenheit);

      expect(backToCelsius).toBeCloseTo(originalCelsius, 1);
    });

    test("should work with negative temperatures", () => {
      const originalCelsius = -15.7;
      const fahrenheit = celsiusToFahrenheit(originalCelsius);
      const backToCelsius = fahrenheitToCelsius(fahrenheit);

      expect(backToCelsius).toBeCloseTo(originalCelsius, 1);
    });
  });
});
