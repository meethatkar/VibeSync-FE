export function detectEmotion(blendShapes) {
  const smile =
    ((blendShapes.mouthSmileLeft || 0) + (blendShapes.mouthSmileRight || 0)) /
    2;

  const jawOpen = blendShapes.jawOpen || 0;

  const browUp = blendShapes.browInnerUp || 0;

  const frown =
    ((blendShapes.mouthFrownLeft || 0) + (blendShapes.mouthFrownRight || 0)) /
    2;

  const browDown =
    ((blendShapes.browDownLeft || 0) + (blendShapes.browDownRight || 0)) / 2;

  if (smile > 0.6) {
    return {
      emotion: "happy",
      confidence: smile,
    };
  }

  if (jawOpen > 0.55 && browUp > 0.35) {
    return {
      emotion: "surprised",
      confidence: jawOpen,
    };
  }

  if (frown > 0.45) {
    return {
      emotion: "sad",
      confidence: frown,
    };
  }

  if (browDown > 0.45) {
    return {
      emotion: "angry",
      confidence: browDown,
    };
  }

  return {
    emotion: "calm",
    confidence: 1,
  };
}
