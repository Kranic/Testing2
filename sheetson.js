let api_key="gXQ7Zr4ZuXkLPpytOy6nXkM_72nr9Kj2JA5Lkiksoq5h8NjsOs_lWKyrg_wauQ"
let speadhseet_id="1whCe6MQu6boD-ulladM-fbOsuRNsXUkX511bz4JIaOg"

const fetch = require('isomorphic-fetch');
fetch("https://api.sheetson.com/v2/sheets/Cities/3", {
  headers: {
    "Authorization": api_key,
    "X-Spreadsheet-Id": spreadsheet_id
  }
}).then(r => r.json())
.then(result => console.log(result))

