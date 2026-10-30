export function mapBlendShapes(categories = []) {
  const blendShapes = {};

  categories.forEach(({ categoryName, score }) => {
    blendShapes[categoryName] = score;
  });

  return blendShapes;
}
