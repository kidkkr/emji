const fs = require("fs");
const graymatter = require("gray-matter");
const { createCanvas, loadImage, registerFont } = require("canvas");
const splitText = require("./splitText");

module.exports = function emji(config) {
  const {
    templateImage,
    outPath,
    font,
    fontSize,
    lineHeight = 1.2,
    width = 1200,
    height = 1200,
  } = config;

  registerFont(font, { family: "allfonts" });
  const titleWidth = width * 0.8;
  const titleMiddle = width / 2;
  const titleCap = fontSize * lineHeight;

  return async (markdown) => {
    const { data } = graymatter(markdown);
    const { title } = data;
    const splitted = splitText({ text: title, width: titleWidth, fontSize });
    const titleHeight = (1 + (splitted.length - 1) * lineHeight) * fontSize;
    const titleTop = (height - titleHeight) / 2;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const image = await loadImage(templateImage);
    ctx.drawImage(image, 0, 0, width, height);

    ctx.textAlign = "center";
    ctx.font = `${fontSize}px allfonts`;
    for (let i = 0; i < splitted.length; ++i) {
      const textTop = titleTop + (i + 0.5) * titleCap;
      ctx.fillText(splitted[i], titleMiddle, textTop);
      ctx.stroke();
    }

    canvas.createPNGStream().pipe(fs.createWriteStream(outPath));
  };
};
