import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTokenCost(
  width: number,
  height: number,
  detail: "low" | "high"
): number {
  if (detail === "low") {
    return 85;
  }

  // Adjust the image to fit within a 2048x2048 square, maintaining aspect ratio
  const maxDimension = 2048;
  if (Math.max(width, height) > maxDimension) {
    if (width > height) {
      height = Math.round((height / width) * maxDimension);
      width = maxDimension;
    } else {
      width = Math.round((width / height) * maxDimension);
      height = maxDimension;
    }
  }

  // Scale the image such that the shortest side is 768px
  if (width < height) {
    height = Math.round((height / width) * 768);
    width = 768;
  } else {
    width = Math.round((width / height) * 768);
    height = 768;
  }

  // Calculate the number of 512px squares
  const numSquaresWide = Math.ceil(width / 512);
  const numSquaresHigh = Math.ceil(height / 512);
  const totalSquares = numSquaresWide * numSquaresHigh;

  // Calculate the final token cost
  const costPerSquare = 170;
  const baseCost = 85;
  const totalCost = totalSquares * costPerSquare + baseCost;

  return totalCost;
}
