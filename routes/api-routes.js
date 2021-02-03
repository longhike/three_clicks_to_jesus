const express = require("express");
const { wikiSearch, wikiGetAndParseHTML } = require("./wiki-utils")

const router = express.Router();

router.post("/api/search", (req, res) => {
  try {
    const searchTerm = req.body.data;
    wikiSearch(searchTerm).then((data) => {
      const resArr = data.data.query.search;
      res.json(resArr);
    });
  } catch (err) {
    console.log(err.message);
    res.sendStatus(500);
  }
});

router.post("/api/get-links", (req, res) => {
  try {
    const _url = `https://en.wikipedia.org/wiki/${req.body.data}`
    wikiGetAndParseHTML(_url)
    res.send("Hooray!")
  } catch(err) {
    console.log(err.message)
    res.sendStatus(500)
  }
})




module.exports = router;
