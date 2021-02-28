const Emji = require("./index");

const markdown = `---
title: 범죄도시
description: 야 엠지 잘라라
---

Hello World!
`;

const emji = Emji({
  templateImage: "./index.test.template.png",
  outPath: "./index.test.result.png",
  font: "./index.test.font.ttf",
});
emji(markdown);
