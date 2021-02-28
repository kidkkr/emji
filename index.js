const fs = require("fs");
const frontmatter = require("@github-docs/frontmatter");
const { createCanvas, loadImage, registerFont } = require("canvas");

module.exports = function emji(config) {
  const { templateImage, outPath, font, width = 1200, height = 1200 } = config;

  registerFont(font, { family: "allfonts" });

  return async (markdown) => {
    const { data, content, errors } = frontmatter(markdown);
    if (!data || errors.length > 0) {
      return;
    }
    const { title, description } = data;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    const image = await loadImage(templateImage);
    ctx.drawImage(image, 0, 0, width, height);
    ctx.font = "30px allfonts";
    ctx.fillText(title, 50, 100);
    const buffer = canvas.toBuffer();
    fs.writeFileSync(outPath, buffer);
  };
};
