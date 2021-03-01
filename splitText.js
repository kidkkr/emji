module.exports = function splitText({ text, fontSize, width }) {
  const words = text.split(" ");
  const splitted = [""];
  const maxLen = Math.floor(width / fontSize);

  for (const word of words) {
    let last = splitted.pop();

    if (last.length + word.length + 1 < maxLen) {
      splitted.push(last + " " + word);
    } else {
      splitted.push(last);
      splitted.push(word);
    }
  }

  return splitted;
};
