const words = [
  {
    id: 7,
    word: "국어",
    mean: "国語",
    known: false,
  },
  {
    id: 12,
    word: "수영",
    mean: "泳ぎ",
    known: false,
  },
  {
    id: 14,
    word: "한글",
    mean: "漢字",
    known: false,
  },
  {
    id: 15,
    word: "일본어",
    mean: "にほんご",
    known: false,
  },
  {
    id: 16,
    word: "마우스",
    mean: "マウス",
    known: false,
  },
  {
    id: 17,
    word: "검색",
    mean: "検索",
    known: false,
  },
  {
    id: 18,
    word: "공부",
    mean: "勉強",
    known: false,
  },
  {
    id: 19,
    word: "밥",
    mean: "ご飯",
    known: false,
  },
  {
    id: 20,
    word: "말",
    mean: "話",
    known: false,
  },
  {
    id: 21,
    word: "시계",
    mean: "時計",
    known: false,
  },
];
const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const mean = new Array(4);
const createSelection = () => {
  const correctIndex = Math.floor(Math.random() * 4);

  mean[correctIndex] = words[correctIndex].word;

  for (var i = 0; i < 4; i++) {
    let otherIndex = Math.floor(Math.random() * words.length);

    if (mean.indexOf(words[otherIndex].word) === -1)
      mean[i] = words[otherIndex].word;
    else {
      i--;
    }
  }
};

shuffle(words);
createSelection();
