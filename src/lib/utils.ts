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

 
/**
 * base64 by gpt
 */
export function convertFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // 当读取完成后，result属性包含了Base64格式的数据
      const base64String = reader.result as string;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    // 读取文件内容，结果用Base64格式表示
    reader.readAsDataURL(file);
  });
}
