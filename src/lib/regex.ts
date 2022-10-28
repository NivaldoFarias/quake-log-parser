export default {
  games: new RegExp(
    /(?:(?:\d|\d{2,3}):[0-5]\d\sInitGame:[\sa-zA-Z\d\\_.\-=]*)(?<game>(?:(?:\r\n|\r|\n)\d|(?:\r\n|\r|\n|\d)\d\d):[0-5]\d\s[a-zA-Z]{1,}[\sa-zA-Z\d\\_.-:<>*]*)(?:(?:(?:\r\n|\r|\n|)\d|\d{2,3}):[0-5]\d\s\-{5,})/,
    "g",
  ),
};
