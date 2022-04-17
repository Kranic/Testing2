function setup_qualities() {

Promise.all([
  fetch(`https://api.sheetson.com/v2/sheets/Full_Qualities?limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/Full_Qualities?skip=100&limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/Full_Qualities?skip=200&limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
])
.then(([full_qualities_1, full_qualities_2, full_qualities_3]) => {
    return {
        "full_qualities_1": full_qualities_1.results,
        "full_qualities_2": full_qualities_2.results,
        "full_qualities_3": full_qualities_3.results,

    }
})
.then(result => save_qualities(result))
.catch((err) => {console.log(err)
});

function save_qualities(result){
    quality_array = result.full_qualities_1.concat(result.full_qualities_2, result.full_qualities_3)
    let qualities_json = {}
    quality_array.forEach(function(x){
    qualities_json[x.Name] = x
    })



    quality_list = qualities_json

    if(quality_list!=undefined){localStorage.setItem( 'quality_list', JSON.stringify(quality_list))}

}
}