export const mapAliasToOriginalMood = (aliasMood) => {
  const mapping = {
    "Radiant Joy": "happy",
    "Deep Focus": "neutral",
    "Melancholic Drift": "surprised",
    "Hyper Workout": "happy",
    "Midnight Chill": "neutral"
  };
  return mapping[aliasMood] || aliasMood;
};
