let api_key="gXQ7Zr4ZuXkLPpytOy6nXkM_72nr9Kj2JA5Lkiksoq5h8NjsOs_lWKyrg_wauQ"
let spreadsheet_id ="1Frm49d2BmVPbHwdMq1xYjfWJd2OWPAN68zossdaL2Pc"
let stored_character_data = JSON.parse(localStorage.getItem('character_data'))
console.log(stored_character_data)

if(stored_character_data){
    load_page(stored_character_data)
} else {
    
}


Promise.all([
  fetch("https://api.sheetson.com/v2/sheets/tamer", {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch("https://api.sheetson.com/v2/sheets/torments", {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch("https://api.sheetson.com/v2/sheets/digimon", {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
])
.then(([tamer, torment, digimon]) => {
    console.log(tamer)
    console.log(torment)
    console.log(digimon)
    return {
        "tamers": tamer.results,
        "torments": torment.results,
        "digimons": digimon.results
    }
})
.then(result => load_page(result))
.catch((err) => {
    console.log(err);
});


function load_page(result){
    localStorage.setItem( 'character_data', JSON.stringify(result))
    // all_digimon_forms = result.digimons
    tamers = result.tamers
    all_torments = result.torments
    tamers.shift()

    tamers.forEach(function(tamer){
        tamer.xp = {}
        tamer.xp.rewarded = tamer.xp_rewarded
        tamer.xp.used = tamer.xp_used

        tamer.inspiration = {}
        tamer.inspiration.rewarded = tamer.inspiration_rewarded
        tamer.inspiration.used = tamer.inspiration_used
        tamer.special_orders = tamer['special orders'].split(',')
    })
    console.log(tamers)

    let activeTamer = localStorage.getItem('activeTamer')
    

    if(activeTamer){
        update_tamer_tab(activeTamer)
    } else {
        update_tamer_tab(tamers[0]['id'])
    }

    setup_tamers(tamers)
    // setup_digimon(all_digimon_forms)
    // 

}


function setup_tamers(tamers){

    document.querySelector('#tamer-dropdownmenu').innerHTML = ""
    tamers.forEach(function(x){
    let dropdownitem = create_element(
            'li',
            `<li>
            <a tamer_id=${x["id"]} class="dropdown-item" href="#a">${x["name"]}</a>
            </li>`,
            )
        document.querySelector('#tamer-dropdownmenu').append(dropdownitem)
    })

    document.querySelectorAll('#tamer-dropdownmenu .dropdown-item')
    .forEach(
        function(x){
            x.addEventListener('click', function (event) {
                console.log("Ran update")
                let id = x.getAttribute('tamer_id')
                update_tamer_tab(id)
                localStorage.setItem( 'activeTamer', id)
            })
        }
        )

    let partner_forms = all_digimon_forms.filter(function(x){
        return x.partner_tamer_id == tamers[0]
    })

    document.querySelector("#partner_forms").innerHTML = ""
    partner_forms.forEach(function(digimon){
        let new_element = create_element('li',
            `<img src="${digimon['image']}" style="width:15%;float:left;"> 
            <div> ${digimon['name']} </div>
            <div> ${digimon['stage']} | ${digimon['size']} | ${digimon['attribute']} / ${digimon['type']} / ${digimon['field']} </div>`,
            {"class": 'list-group-item list-group-item-action overflow-auto',
            "digimon_id": digimon['id']} )

        new_element.addEventListener('click', function (event) {
            let id = new_element.getAttribute('digimon_id')
                // digimon_tab.show
                update_digimon_tab (id)
                localStorage.setItem( 'activeDigimon', id)
                set_tabs("#digimonTab")
            })
        document.querySelector("#partner_forms").append(new_element)
    })
}


// Functions --------------------------------------------------------------

function update_tamer_tab(id){
    console.log(tamers)
    let tamer = tamers.filter(function(x){ return x.id == id})[0]

    document.getElementById("tamerName").textContent = tamer.name;
    // document.getElementById("tamerEpitaph").textContent = tamer.title;
    document.getElementById("tamerImage").src = tamer.image_url;
    document.getElementById("tamerSynopsis").textContent = tamer.characterSynopsis;


    create_tamer_sidebar_data(tamer)
    create_aspect_div(tamer)
    create_torment_div(tamer)
    create_special_order_div(tamer)
}

function create_tamer_sidebar_data(tamer){

    let small_container = create_element(
        'small',
        '',
        {
            'class': 'text-muted', 
            'style': "margin: 0 auto;"
        }
        )



    let xp_div = create_element('div', `${tamer["xp"]["used"]} / ${tamer["xp"]["rewarded"]} XP Used`)
    let misc = create_element('div', `${tamer["gender"]} / ${tamer["age"]} / ${tamer["height"]}`)
    let inspiration_div = create_element('div', `${tamer["inspiration"]["rewarded"] - tamer["inspiration"]["used"]} Inspiration`)


    let character_sheet_link = create_element(
        'a', 
        `Character Sheet Link`,
        {'class': `character_info`,
        'href': tamer.sheet})

    let inside_divs = [misc, xp_div, inspiration_div]

    inside_divs.forEach(function(x){small_container.appendChild(x)})

    clear_div('#tamerinfo')
    document.querySelector('#tamerinfo').appendChild(small_container)
    document.querySelector('#tamerinfo').appendChild(character_sheet_link)


    let boxes = [
    ['Wound Boxes', `${tamer['wound_boxes']} / ${tamer['wound_boxes']}`], 
    ['Movement', tamer['movement']], 
    ]

    let stats = [
    ['Accuracy Pool', tamer['accuracy']], 
    ['Damage', tamer['damage']],
    ['Dodge Pool', tamer['dodge']],
    ['Armor', tamer['armor']]]

    let attributes = [
    ['Agility', 4, 
    [['Dodge', 1], ['Fight', 1], ['Stealth', 2]
    ]],
    ['Body', 4, 
    [['Dodge', 1], ['Fight', 1], ['Stealth', 2]
    ]],
    ['Charisma', 4, 
    [['Dodge', 1], ['Fight', 1], ['Stealth', 2]
    ]],
    ['Intelligence', 4, 
    [['Dodge', 1], ['Fight', 1], ['Stealth', 2]
    ]],
    ['Willpower', 4, 
    [['Dodge', 1], ['Fight', 1], ['Stealth', 2]
    ]]
    ]




    clear_div('#tamer_stat_block_1')
    boxes.forEach(function(x) {create_bar(x, '#tamer_stat_block_1')})
    clear_div('#tamer_stat_block_2')
    stats.forEach(function(x) {create_bar(x, '#tamer_stat_block_2')})   
//     clear_div('#digimon_stat_block_3')
//     derived.forEach(function(x) {create_bar(x, '#digimon_stat_block_3')})  
//     clear_div('#digimon_stat_block_4')
//     specs.forEach(function(x) {create_bar(x, '#digimon_stat_block_4')})  
clear_div('#tamer_stat_block_3')
attributes.forEach(function(x) {create_attribute_bar(x, '#tamer_stat_block_3')})
}

function create_aspect_div (tamer){
    let tamer_aspects = {
        "major": {
            "name": tamer.major_aspect_name,
            "description": tamer.major_aspect_description
        },
        "minor": {
            "name": tamer.minor_aspect_name,
            "description": tamer.minor_aspect_description
        }
    }
    
    let target_id = "#aspects"
    clear_div(target_id)

    let major_element = create_element(
        'div', 
        `<em>${tamer['major_aspect_name']}</em><small> (Major Aspect ±4)</small><p>${tamer['major_aspect_description']}</p>`,
        {'class': "col-6"})
    
    document.querySelector(`${target_id}`).append(major_element)

    let minor_element = create_element(
        'div', 
        `<em>${tamer['minor_aspect_name']}</em><small> (Minor Aspect ±2) </small><p>${tamer['minor_aspect_description']}</p>`,
        {'class': "col-6"})
    
    document.querySelector(`${target_id}`).append(minor_element)

}

function create_torment_div (tamer){
    console.log(all_torments)
     let tamer_torments = all_torments.filter(function(x){
        return x.tamer_id == tamer.id
    })

     console.log(tamer_torments)
    // let tamer_torments = tamer['torments']
    let target_id = "#torments"
    clear_div(target_id)

    tamer_torments.forEach(function(x){

        let new_element = create_element(
            'div',
            `${x["name"]} <small>(${x["type"]} Torment |     ${x["marked_boxes"]}/${x["total_boxes"]} Boxes Marked)</small>
            <div>${x["description"]}</div>`,
            {"style": "padding-bottom:1%"})
        console.log(x)
        if(x.total_boxes != 0){document.querySelector(`${target_id}`).append(new_element)}
        
    })

}

function create_special_order_div (tamer){
    let target_id = "#special_orders"
    clear_div(target_id)
    
    tamer.special_orders.forEach(function(x){
        console.log(x)

        let new_element = create_element(
            'div',
            `${x} - <small>Special Order Text </small>`,
            {"style": "padding-bottom:1%"})
        document.querySelector(`${target_id}`).append(new_element)
        
    })

}