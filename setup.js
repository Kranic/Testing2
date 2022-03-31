let api_key="gXQ7Zr4ZuXkLPpytOy6nXkM_72nr9Kj2JA5Lkiksoq5h8NjsOs_lWKyrg_wauQ"
let spreadsheet_id ="1Frm49d2BmVPbHwdMq1xYjfWJd2OWPAN68zossdaL2Pc"
let stored_character_data = JSON.parse(localStorage.getItem('character_data'))
let special_orders_list = {}

if(stored_character_data){
    load_page(stored_character_data)
}


Promise.all([
  fetch(`https://api.sheetson.com/v2/sheets/tamer`, 
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/torments?limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/digimon?limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/playlist?limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
    fetch(`https://api.sheetson.com/v2/sheets/attacks?limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/special_orders`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
])
.then(([tamer, torment, digimon, playlist, attacks, special_orders]) => {
    return {
        "tamers": tamer.results,
        "torments": torment.results,
        "digimons": digimon.results,
        "playlist": playlist.results,
        "attacks": attacks.results,
        "special_orders": special_orders.results
    }
})
.then(result => load_page(result))
.catch((err) => {console.log(err)
});



function load_page(result){

    if(result!=undefined){localStorage.setItem( 'character_data', JSON.stringify(result))}

    

    let playlist = result.playlist

    tamers = result.tamers
    if(tamers==undefined){tamers = []} else {tamers.shift()}

    all_torments = result.torments
    special_orders_list = result.special_orders

    all_digimon_forms = result.digimons
    if(all_digimon_forms==undefined){all_digimon_forms = []} else {all_digimon_forms.shift()}
    
    let selected_digimon = all_digimon_forms[0]

    attacks = result.attacks
    
    tamers.forEach(function(tamer){
        tamer.xp = {}
        tamer.xp.rewarded = tamer.xp_rewarded
        tamer.xp.used = tamer.xp_used
        tamer.inspiration = {}
        tamer.inspiration.rewarded = tamer.inspiration_rewarded
        tamer.inspiration.used = tamer.inspiration_used
        tamer.special_orders = tamer['special orders'].split(',')
    })

    all_digimon_forms.forEach(function(digimon){
        digimon['wound_boxes'] = digimon['wound_boxes']
        
    })

    let activeTamer = localStorage.getItem('activeTamer')
    if(activeTamer){ update_tamer_tab(activeTamer)}
    else { update_tamer_tab(tamers[0]['id'])}

    let activeDigimon = localStorage.getItem('activeDigimon') 
    if(activeDigimon){ update_digimon_tab(activeDigimon)}
    else { update_digimon_tab(all_digimon_forms[0]['id'])}

}



// Functions --------------------------------------------------------------

function update_tamer_tab(id){
    let tamer = tamers.filter(function(x){ return x.id == id})[0]

    document.getElementById("tamerName").textContent = tamer.name;
    // document.getElementById("tamerEpitaph").textContent = tamer.title;
    document.getElementById("tamerImage").src = tamer.image_url;
    document.getElementById("tamerSynopsis").textContent = tamer.characterSynopsis.trim();

    try{
    create_partner_forms(tamers, tamer)
    create_tamer_sidebar_data(tamer)
    create_aspect_div(tamer)
    create_torment_div(tamer)
    create_special_order_div(tamer)
    }
    catch(err){console.log(err)}

}


function update_digimon_tab(id){
    let digimon = all_digimon_forms.filter(function(x){ return x.id == id})[0]
    let selected_digimon = digimon
    if(digimon==undefined){digimon=all_digimon_forms[0]}

    digimon.dodges = [
        {
            "name": "vs Melee",
            "roll": digimon.dodge_roll_melee,
            "auto_success": digimon.dodge_successes,
            "effect_duration": digimon.dodge_effect_duration,
            "tags": digimon.dodge_tags,
        },
        {
            "name": "vs Ranged",
            "roll": digimon.dodge_roll_ranged,
            "auto_success": digimon.dodge_successes,
            "effect_duration": digimon.dodge_effect_duration,
            "tags": digimon.dodge_tags,
        },
        {
            "name": "vs Positive Effect",
            "roll": digimon.postive_effect_roll,
            "effect_duration": digimon.postive_effect_duration,
            "auto_success": 0,
            "tags": digimon.postive_effect_tags,
        },
    ]

    digimon.qualities = []

    console.log(digimon)

    let q_names = []
    if(digimon.qualities_names){q_names = digimon.qualities_names.split(',')}
    
    
    let q_ranks = []
    if(digimon.quality_ranks){q_ranks = digimon.quality_ranks.split(',')}

    let count = 0
    q_names.forEach(function(x){

        digimon.qualities.push(
        {
            "name": x,
            "rank": q_ranks[count]
        })
        count++
    })


    // document.querySelector('#digimonEpitaph').textContent = digimon['epitaph']
    document.querySelector('#digimonImage').src = digimon['image_url']
    document.querySelector('#digimonName').textContent = digimon['name']
    document.querySelector('#DigimonSynopsis').textContent = digimon['synopsis']
    try{
    create_other_forms(digimon)
    create_attack_div(digimon)
    area_value_div(digimon)
    create_quality_div(digimon)
    create_dodge_div(digimon)
    create_sidebar_data(digimon)
    }
    catch(err){console.log(err)}
}


function create_other_forms(selected_digimon){

    console.log(selected_digimon)
    let other_forms = all_digimon_forms.filter(function(x){
        return x['sheet'] == selected_digimon['sheet']})

                //Create Data in DOM for Dropdown

                document.querySelector('#digimon-dropdownmenu').innerHTML = ""

                other_forms.forEach(function(x){
                    let dropdownitem = create_element(
                        'li',
                        `<li>
                        <a digimon_id=${x["id"]} class="dropdown-item" href="#a">${x["name"]}</a>
                        </li>`,
                        )

                    document.querySelector('#digimon-dropdownmenu').append(dropdownitem)
                })
                //Adding Listener for digimon dropdown changes
                document.querySelectorAll('#digimon-dropdownmenu .dropdown-item').forEach(
                    function(x){

                        x.addEventListener('click', function (event) {
                            console.log(event)
                            let id = x.getAttribute('digimon_id')
                            selected_digimon = x
                            update_digimon_tab (id)
                            localStorage.setItem( 'activeDigimon', id)
                        })
                    }
                    )



                document.querySelector("#other_forms").innerHTML = ""
                other_forms.forEach(function(digimon){
                    
                    let new_element = create_element('li',
                        `<img src="${digimon['image_url']}" 
                        style="width:15%;
                        float:left;
                        object-fit: cover;
                        object-position: top;
                        aspect-ratio: 1 / 1"> 
                        <div> ${digimon['name']} </div>
                        <div> ${digimon['stage']} | ${digimon['size']} | ${digimon['attribute']} / ${digimon['type']} / ${digimon['field']} </div>`,
                        {"class": 'list-group-item list-group-item-action overflow-auto',
                        "digimon_id": digimon['id']} )

                    new_element.addEventListener('click', function (event) {
                        let id = new_element.getAttribute('digimon_id')
                        update_digimon_tab (id)
                        localStorage.setItem( 'activeDigimon', id)
                    })
                    document.querySelector("#other_forms").append(new_element)

                })

}

function create_partner_forms(tamers, tamer){

 document.querySelector('#tamer-dropdownmenu').innerHTML = ""
 document.querySelector("#human_images").innerHTML = ""
 document.querySelector("#partner_images").innerHTML = ""

    
    tamers.forEach(function(x){
    let dropdownitem = create_element(
            'li',
            `<li>
            <a tamer_id=${x["id"]} class="dropdown-item" href="#a">${x["name"]}</a>
            </li>`,
            )
    document.querySelector('#tamer-dropdownmenu').append(dropdownitem)
        
    let tamer_element = create_element('li',
                `<img
                src="${x['image_url']}"
                style="width:50%;
                height:100px;
                align-items: center;
                justify-content: center;
                object-fit: cover;
                object-position: top;
                aspect-ratio: 1 / 1"> 
                `,
                {"class": '',
                "tamer_id": x['id']} )

    tamer_element.addEventListener('click', function (event) {
            console.log(event)
                let id = tamer_element.getAttribute('tamer_id')
                update_tamer_tab(id)
                localStorage.setItem( 'activeTamer', id)
                localStorage.setItem('activecharacterTab', event.target.getAttribute('#tamerTab'))
                set_tabs("#tamerTab")
            })
    

    document.querySelector("#human_images").append(tamer_element)

    })

    

    document.querySelectorAll('#tamer-dropdownmenu .dropdown-item')
    .forEach(
        function(x){
            x.addEventListener('click', function (event) {
                let id = x.getAttribute('tamer_id')
                update_tamer_tab(id)
                localStorage.setItem( 'activeTamer', id)
            })
        }
        )

    


    let partner_forms = all_digimon_forms.filter(function(x){
        return x['sheet'] == tamer['sheet']
    })

    partner_forms.forEach(function(digimon){
        console.log(digimon)
        let new_element = create_element('li',
            `<img src="${digimon['image_url']}"
            style="width:50%;
                height:100px;
                align-items: center;
                justify-content: center;
                object-fit: cover;
                object-position: top;
                aspect-ratio: 1 / 1">`,
            {"class": '',
            "digimon_id": digimon['id']} )

        new_element.addEventListener('click', function (event) {
            // console.log(new_element.getAttribute('digimon_id'))
                let id = new_element.getAttribute('digimon_id')
                // digimon_tab.show
                update_digimon_tab (id)
                localStorage.setItem( 'activeDigimon', id)
                set_tabs("#digimonTab")
            })
        document.querySelector("#partner_images").append(new_element)
    })

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
    ['Dodge Pool', tamer['dodge_stat']],
    ['Armor', tamer['armor']]]

    let attributes = [
    ['Agility', tamer['agility'], 
        [
        ['Dodge', tamer['dodge'],  tamer['dodge_roll']], 
        ['Fight', tamer['fight'], tamer['fight_roll']], 
        ['Stealth', tamer['stealth'], tamer['stealth_roll']]
        ]
    ],
    ['Body', tamer['body'], 
        [
        ['Athletics', tamer['athletics'], tamer['athletics_roll']],
        ['Endurance', tamer['endurance'], tamer['endurance_roll']],
        ['Feats of Strength', tamer['feats of strength'], tamer['feats of strength_roll']]
        ]
    ],
    ['Charisma', tamer['charisma'], 
        [
        ['Manipulate', tamer['manipulate'], tamer['manipulate_roll']],
        ['Perform', tamer['perform'], tamer['perform_roll']],
        ['Persuade', tamer['persuade'], tamer['persuade_roll']]
        ]
    ],
    ['Intelligence', tamer['intelligence'], 
        [
        ['Computer', tamer['computer'], tamer['computer_roll']],
        ['Survival', tamer['survival'], tamer['survival_roll']],
        ['Knowledge', tamer['knowledge'], tamer['knowledge_roll']]
        ]
    ],
    ['Willpower', tamer['willpower'], 
        [
        ['Perception', tamer['perception'], tamer['perception_roll']],
        ['Decipher Intent', tamer['decipher intent'],tamer['decipher intent_roll']],
        ['Bravery', tamer['bravery'], tamer['bravery_roll']]
        ]
    ]
    ]





    clear_div('#tamer_stat_block_1')
    boxes.forEach(function(x) {create_bar(x, '#tamer_stat_block_1')})
    clear_div('#tamer_stat_block_2')
    stats.forEach(function(x) {create_bar(x, '#tamer_stat_block_2')})  
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
        `<h6><em>${tamer['major_aspect_name']}</em></h6><small> (Major Aspect ±4)</small><p>${tamer['major_aspect_description']}</p>`,
        {'class': "col-6"})
    
    document.querySelector(`${target_id}`).append(major_element)

    let minor_element = create_element(
        'div', 
        `<h6><em>${tamer['minor_aspect_name']}</em></h6><small> (Minor Aspect ±2) </small><p>${tamer['minor_aspect_description']}</p>`,
        {'class': "col-6"})
    
    document.querySelector(`${target_id}`).append(minor_element)

}

function create_torment_div (tamer){
     let tamer_torments = all_torments.filter(function(x){
        return x.tamer_id == tamer.id
    })

    // let tamer_torments = tamer['torments']
    let target_id = "#torments"
    clear_div(target_id)

    tamer_torments.forEach(function(x){

        let new_element = create_element(
            'div',
            `<h6><em>${x["name"]}</em></h6> <div>(${toTitleCase(x["type"])} |     ${x["marked_boxes"]}/${x["total_boxes"]} Boxes Marked)</div>
            <div>${x["description"]}</div>`,
            {"style": "padding-bottom:1%"})
        if(x.total_boxes != 0){document.querySelector(`${target_id}`).append(new_element)}
        
    })

}

function create_special_order_div (tamer){
    console.log(special_orders_list)

    
    let target_id = "#special_orders"
    clear_div(target_id)
    
    tamer.special_orders.forEach(function(x){

        let order = special_orders_list.filter(function(order){
            return order['name'] == x.trim()
        })[0]

        let desc = ""

        console.log(order)
        if(order != undefined){
            desc = `| ${order['action_type']} Action ${order['usage']}</h6></em><small> ${order['description']}`
        }
        let new_element = create_element(
            'div',
            `<h6><em>${x} ${desc}</small>`,
            {"style": "padding-bottom:1%"})

        document.querySelector(`${target_id}`).append(new_element)
        
    })

}


function create_sidebar_data(digimon){

    let small_container = create_element(
        'small',
        '',
        {
            'class': 'text-muted', 
            'style': "margin: 0 auto;"
        }
         )

    let stage_div = create_element('h4', digimon["stage"])
    let size_div = create_element('h4', digimon["size"])
    let container = create_element('div', "", {style:"display:flex; flex-direction: row; justify-content: space-evenly"})
    container.append(stage_div)
    container.append(size_div)

    let dp_div = create_element('div', `+${digimon["rewarded_dp"]} DP`)
    let type_div = create_element('div', digimon["jogress"])
    let misc = create_element('div', `${digimon["attribute"]} / ${digimon["type"]} / ${digimon["field"]}`)

    let character_sheet_div = create_element(
        'a', 
        `Character Sheet Link`,
        {'class': `character_info`,
        'href': digimon.sheet})

    let inside_divs = [container, misc, type_div, dp_div]

    inside_divs.forEach(function(x){small_container.appendChild(x)})

    clear_div('#digimoninfo')
    document.querySelector('#digimoninfo').appendChild(small_container)
    document.querySelector('#digimoninfo').appendChild(character_sheet_div)

    //

    let boxes = [
        ['Wound Boxes', digimon['wound_boxes']], 
        ['Movement', digimon['movement']], 
        ['Attack Range', `${digimon['range']}m | ${digimon['limit']}m`]
        ]

    let stats = [
        ['Health', digimon['health']], 
        ['Accuracy', digimon['accuracy']], 
        ['Damage', digimon['damage']],
        ['Dodge', digimon['dodge']],
        ['Armor', digimon['armor']]
        ]

    let derived = [
        ['Agility', digimon['agility']], 
        ['Body', digimon['body']],
        ['Brains', digimon['brains']]
        ]

    let specs = [
        ['RAM', digimon['ram']],
        ['CPU', digimon['cpu']],
        ['BIT', digimon['bit']]
        ]

    let attributes = [
        ['Agility', digimon['agility'], 
        [
        ['Dodge', digimon['dodge']],
        ['Fight', digimon['fight']],
        ['Stealth', digimon['stealth']]
        ]
        ],
        ['Body', digimon['body'], 
        [
        ['Athletics', digimon['dodge']],
        ['Endurance', digimon['fight']],
        ['Feats of Strength', digimon['feats of strength']]
        ]
        ],
        ['Charisma', digimon['charisma'], 
        [
        ['Manipulate', digimon['manipulate']],
        ['Perform', digimon['perform']],
        ['Persuade', digimon['persuade']]
        ]
        ],
        ['Intelligence', digimon['intelligence'], 
        [
        ['Computer', digimon['computer']],
        ['Survival', digimon['survival']],
        ['Knowledge', digimon['knowledge']]
        ]
        ],
        ['Willpower', digimon['willpower'], 
        [
        ['Perception', digimon['perception']],
        ['Decipher Intent', digimon['decipher intent']],
        ['Bravery', digimon['bravery']]
        ]
        ]
        
    ]

    clear_div('#digimon_stat_block_1')
    boxes.forEach(function(x) {create_bar(x, '#digimon_stat_block_1')})
    clear_div('#digimon_stat_block_2')
    stats.forEach(function(x) {create_bar(x, '#digimon_stat_block_2')})   
    clear_div('#digimon_stat_block_3')
    derived.forEach(function(x) {create_bar(x, '#digimon_stat_block_3')}) 
    
    clear_div('#digimon_stat_block_stage')
    create_bar(["Stage Bonus", digimon["stage_bonus"]], '#digimon_stat_block_stage')
    
    clear_div('#digimon_stat_block_4')
    specs.forEach(function(x) {create_bar(x, '#digimon_stat_block_4')})  
    clear_div('#digimon_stat_block_5')
    attributes.forEach(function(x) {create_attribute_bar(x, '#digimon_stat_block_5')})
}

function create_quality_div (digimon){
    let digimon_qualities = digimon['qualities']
    let target_id = "#digimon_qualities"
    clear_div(target_id)
    digimon_qualities.forEach(function(x){
        if(x.rank == undefined){x.rank = ""}
        
        let new_element = create_element('div', `<small>${x.name}</small> <small>${x.rank}</small>`)
        document.querySelector(`${target_id}`).append(new_element)
    })
}

function create_dodge_div (digimon){
    let digimon_dodges = digimon['dodges']
    let target_id = "#digimon_dodges"
    clear_div(target_id)

    digimon_dodges.forEach(function(x){

    let effect_duration = ""
    if(x['effect_duration'] != 0){
        effect_duration = `<small>Effect Duration: ${x['effect_duration']}</small>`
    } 

    
    let auto_successes = ""
    if(x['auto_success'] == 0){}
    else{
        auto_successes = `+${x['auto_success']}`
    }   

        let new_element = create_element('div', 
            `<div>${x['name']} (${x['roll']}d6${auto_successes})</div>
            <div>${x['tags']}</div>
            ${effect_duration}<hr>`,
            {'class': 'overflow-auto'})
        document.querySelector(`${target_id}`).append(new_element)
    })
}


function create_attack_div(digimon){

    let digimon_attacks = attacks.filter(function(x){
        return x['digimon_id'] == digimon.id
    })

    console.log(attacks)

    // let digimon_attacks = digimon['attacks']
    let target_id = "#digimon_attacks"
    clear_div(target_id)

    digimon_attacks.forEach(function(x){
        let new_element = create_element('li', 
            `<div>${x['Name']} (${x['Roll']})</div>
            <small>${x['Tags']}</small>
            <div style="white-space: pre-line;"><small>${x['Description']}</small><hr>`, 
            {'class': 'overflow-auto'})
        if(x.Roll){document.querySelector(`${target_id}`).append(new_element)}
        
})
}

function area_value_div(digimon){

    // let digimon_attacks = digimon['attacks']
    let target_id = "#area_value_div"
    clear_div(target_id)

    let new_element = create_element('div', 
            `<h6>Area Values: </h6> 
            <div>[Burst] Radius ${digimon['burst_m']}m | ${digimon['burst_r']}m</div>
            <div>[Blast] Diameter ${digimon['blast_m']}m | ${digimon['blast_r']}m</div>
            <div>[Close Blast] Radius ${digimon['clost_blast_m']}m | ${digimon['clost_blast_r']}m</div>
            <div>[Line] Dimension ${digimon['line_m']}m | ${digimon['line_r']}m</div>
            <div>[Cone] Length ${digimon['cone_m']}m | ${digimon['cone_r']}m</div>
            <div>[Pass] Movement ${digimon['pass_m']}m | ${digimon['pass_r']}m</div>`, 
            {'class': 'overflow-auto'})

    let combat_notes = "" 


    if(digimon.start_of_combat){
        combat_notes += `<h6>Start of Combat</h6><div>${digimon.start_of_combat}</div>`}
    else { 
        combat_notes += ""
    }

    if(digimon.start_of_round){
        combat_notes += `<h6>Start of Round</h6><div>${digimon.start_of_round}</div>`} 
    else { 
        combat_notes += ""
    }

    let element_2 = create_element('div', 
            combat_notes)
    
    console.log(digimon.misc_skill_rolls)
    if(digimon.misc_skill_rolls!="No Notes"){
        console.log(digimon.misc_skill_rolls)
    let misc_skills = digimon.misc_skill_rolls.split(',')
    let misc_descriptions = digimon.misc_skill_rolls_descriptions.split(',')
    let count = 0

    misc_skills.forEach(function(x){
        let name_elem = create_element('div', `<b>${x}</b>`)
        element_2.append(name_elem)

        let disc_elem = create_element('div', misc_descriptions[count])
        element_2.append(disc_elem)
        count++
    })

        
        document.querySelector(target_id).append(element_2)}

        document.querySelector(target_id).append(new_element)
     
}





function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}