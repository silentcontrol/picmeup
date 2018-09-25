
const extractWebAnnotations = (result) => {
  const entities = result[0].webDetection.webEntities;
  let allAnnotations = entities.filter(entity => entity.score >= 0.5 && entity.description);
  allAnnotations = allAnnotations.map(entity => {
    return {
      "description": entity.description,
      "score": entity.score
    }
  });
  return allAnnotations;
}

module.exports = extractWebAnnotations;