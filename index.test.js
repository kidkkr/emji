const Emji = require("./index");

const markdown = `---
title: "나이키 성공 신화의 비밀"
description: 나이키 브랜드 마케팅에 대해서 알아봅니다
---

Hello World!
`;

const emji = Emji({
  templateImage: "./index.test.template.png",
  outPath: "./index.test.result.png",
  font: "./index.test.font.ttf",
  fontSize: 128,
});
emji(markdown);
