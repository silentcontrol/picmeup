const vision = require('@google-cloud/vision');

const client = new vision.ImageAnnotatorClient();

const getTextFromAnnotations = (allAnnotations) => {
  let results = [];
  allAnnotations.forEach(text => results.push(text.description));
  return results;
}

const getTextAnnotations = (imageURL) => {
  let results = [];
  client.textDetection(imageURL)
        .then(results => {
          const textAnnotations = results[0].textAnnotations;
          results = getTextFromAnnotations(textAnnotations);
        })
        .catch(err => console.error('Error:', err));

  return results;
}

const getLabelFromAnnotations = (allAnnotations) => {
  let results = [];
  allAnnotations.forEach(text => results.push(label.description));
  return results;
}

const getLabelAnnotations = (imageURL) => {
  let results = [];
  client.labelDetection(imageURL)
        .then(results => {
          const labelAnnotations = results[0].labelAnnotations;
          results = getLabelFromAnnotations(labelAnnotations);
        })
        .catch(err => console.error('Error:', err));
  return results;
}

const getAllAnnotations = (imageURL) => {
  let allAnnotations = getTextAnnotations(imageURL);
  allAnnotations.concat(getLabelAnnotations(imageURL));
  return allAnnotations;
}