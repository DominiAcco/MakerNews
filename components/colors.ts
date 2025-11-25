const categoryColorMap = new Map<string, string>();

const coldHueRanges = [
  [200, 230],
  [230, 260],
  [260, 290],
  [170, 200],
];

export function getCategoryColor(category: string) {
  if (categoryColorMap.has(category)) {
    return categoryColorMap.get(category)!;
  }

  const index = categoryColorMap.size;
  const rangeIndex = index % coldHueRanges.length;

  const [minHue, maxHue] = coldHueRanges[rangeIndex];

  const rangeSize = maxHue - minHue;
  const hue = minHue + (index * 13) % rangeSize; 

  const saturation = 65;
  const lightness = 45;

  const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  categoryColorMap.set(category, color);

  return color;
}
