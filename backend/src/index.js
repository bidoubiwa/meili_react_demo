const MeiliSearch = require("meilisearch");

(async () => {
  try {
    const config = {
      host: 'http://127.0.0.1:7700'
    };

    const meili = new MeiliSearch(config);

    //const indexDelete = await meili.getIndex("decathlon");
    //indexDelete.deleteIndex();

    await meili.createIndex({ uid: "decathlon", primaryKey: "id" });

    const decathlon = require("../decathlon.json");

    const index = await meili.getIndex("decathlon");

    await index.addDocuments(decathlon);

    const newSettings = {
      rankingRules: [
        "typo",
        "words",
        "proximity",
        "attribute",
        "wordsPosition",
        "exactness",
        "desc(creation_date)"
      ],
      searchableAttributes: ["name", "vendor", "category", "tags"],
      displayedAttributes: [
        "name",
        "vendor",
        "category",
        "tags",
        "images",
        "url"
      ]
    };

    await index.updateSettings(newSettings);

    console.dir(await index.getSettings());
  } catch (e) {
    console.log("Meili error: ", e.message);
  }
})();
