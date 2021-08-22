const express = require('express');
const { readdirSync } = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ apiName: 'api-template' });
});

const apiPath = path.resolve(__dirname, 'api');

const apiFolders = readdirSync(apiPath, { withFileTypes: true })
  .filter(dir => dir.isDirectory())
  .map(dir => dir.name);

let folderName;
for (let name of apiFolders) {
  folderName = path.resolve(apiPath, name);
  router.use(`/${name}`, require(`${folderName}/router`));
}

module.exports = router;
