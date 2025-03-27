
export const drawRect = (detections, ctx) => {
  detections.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];
    const text = prediction["class"];

    const color = "green";
    ctx.strokeStyle = color;
    ctx.font = "18px Arial";
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.fillText(text, x, y);
    ctx.rect(x, y, width, height);
    ctx.stroke();
  });
};

// Define our labelmap
const labelMap = {
  1:{name:'Hello', color:'red'},
  2:{name:'Thank You', color:'yellow'},
  3:{name:'I Love You', color:'lime'},
  4:{name:'Yes', color:'blue'},
  5:{name:'No', color:'purple'},
}

// Define a drawing function
export const drawRect1 = (boxes, classes, scores, threshold, imgWidth, imgHeight, ctx) => {
  for (let i = 0; i < boxes.length; i++) {  // Use < instead of <=
    if (boxes[i] && classes[i] && scores[i] > threshold) {
      // Extract variables
      const [y, x, height, width] = boxes[i];  // Ensure boxes are in [y, x, height, width]
      const text = classes[i];

      // Set styling
      ctx.strokeStyle = labelMap[text] ? labelMap[text]['color'] : 'white';  // Default color if label not found
      ctx.lineWidth = 2;  // Adjust line width as needed
      ctx.fillStyle = 'white';
      ctx.font = '18px Arial';  // Adjust font size as needed

      // DRAW!!
      ctx.beginPath();
      ctx.fillText(labelMap[text] ? labelMap[text]['name'] + ' - ' + Math.round(scores[i] * 100) / 100 : 'Unknown', x * imgWidth, y * imgHeight - 10);
      ctx.rect(x * imgWidth, y * imgHeight, width * imgWidth, height * imgHeight);
      ctx.stroke();
    }
  }
}


