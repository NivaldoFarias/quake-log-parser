export default {
  games: new RegExp(
    /(?:\d{1,3}:[0-5]\d\sInitGame:[\sa-zA-Z\d\\_.\-=]+)(?<game>\n\d{1,3}:[0-5][\sa-zA-Z\d\\_.-:<>*]+)(?:\n\d{1,3}:[0-5]\d\s\-{5,})/,
    "g",
  ),
  players: new RegExp(
    /(?:(?:\d|\d{2,3}):[0-5]\d\sClientUserinfoChanged:\s\d\sn\\)(?<player>[a-zA-Z\s\-\_\d]{1,})(?:\\t)/,
    "g",
  ),
  kills: new RegExp(
    /(?:(?:\d|\d{2,3}):[0-5]\d\sKill:\s(?:\d{1,4}\s\d\s\d\d|\d\s\d\s\d):\s)(?<killed_by>[a-zA-Z<>\d]{1,})(?:\skilled\s)(?<player>[a-zA-Z<>\d]{1,})(?:\sby\s)(?<means_of_death>MOD_[A-Z_]{1,})/,
    "g",
  ),
  items: new RegExp(
    /(?:(?:\d|\d{2,3}):[0-5]\d\sItem:\s\d\s)(?<item>[a-zA-Z<>_]{1,})(?:\r\n|\r|\n|)/,
    "g",
  ),
  elapsed_time: new RegExp(
    /^(?<start>(?:\d|\d{2,3}):[0-5]\d)(?:(?:.|\n)*)(?<end>(?:(?:\r\n|\r|\n)\d|\d{2,3}):[0-5]\d)(?:.*)$/,
    "g",
  ),
};
