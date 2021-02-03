const axios = require("axios");
const HTMLParser = require("node-html-parser");

async function wikiSearch(term) {
  const _url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${term}`;
  try {
    const response = await axios.get(_url);
    return response;
  } catch (err) {
    console.log(err.message);
  }
}

async function wikiGetAndParseHTML(_url) {
  const response = await axios.get(_url)
  const root = HTMLParser.parse(response.data)
  const aTags = root.querySelectorAll("a")
  const resArr = []
  aTags.forEach((tag) => {
    let _tag = tag.rawAttrs
    if (_tag.includes("/wiki/")) {
      resArr.push(_tag)
    }
  })
  console.log(resArr)
  
  
}

exports.wikiSearch = wikiSearch;
exports.wikiGetAndParseHTML = wikiGetAndParseHTML;
