const axios = require("axios");
const HTMLParser = require("node-html-parser");

async function wikiSearch(term) {
  const _url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${term}`;
  try {
    const response = await axios.get(_url);
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

async function wikiGetAndParseHTML(_url) {
  try {
    const response = await axios.get(_url);
    const root = HTMLParser.parse(response.data);
    const aTags = root.querySelectorAll("a");
    const resArr = [];
    aTags.forEach((tag) => {
      let _tag = tag.rawAttrs;
      if (_tag.includes("/wiki/")) {
        _tag = _tag.split(" ");
        for (let i = 0; i < _tag.length; i++) {
          if (
            _tag[i].includes("href") &&
            !_tag[i].includes(":") &&
            !_tag[i].includes("hreflang") &&
            !_tag[i].includes("Main_Page") &&
            !_tag[i].includes("wikimedia")
          ) {
            _tag[i] = _tag[i].split("/wiki/")[1].split('"')[0];
            resArr.push(_tag[i]);
          }
        }
      }
    });
    return resArr;
  } catch (err) {
    return err.message;
  }
}

exports.wikiSearch = wikiSearch;
exports.wikiGetAndParseHTML = wikiGetAndParseHTML;
