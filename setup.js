var api_key="mHt46Ojvz2MQb1o6pML3fxxy2Q1WWKO4HIpaCt7L9TqtH4TuvFlxdc4canE"
var spreadsheet_id ="1Frm49d2BmVPbHwdMq1xYjfWJd2OWPAN68zossdaL2Pc"
let stored_character_data = JSON.parse(localStorage.getItem('character_data'))
let saved_quality_data = JSON.parse(localStorage.getItem('quality_list'))
let special_orders_list = []
let quality_list = {}
let page = {}

if(saved_quality_data==undefined){
    quality_list = {}
} else { quality_list = saved_quality_data }

// if(stored_character_data.tamers){load_page(stored_character_data)}

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
  fetch(`https://api.sheetson.com/v2/sheets/special_orders`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/campaign_info`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
])
.then(([tamer, torment, digimon, special_orders, campaign]) => {
    let package = {
        "tamers": tamer.results,
        "torments": torment.results,
        "digimons": digimon.results,
        "special_orders": special_orders.results,
        "campaign": campaign.results
    }
    return package
})
.then(result => {
    if (result.tamers != undefined) {
        load_page(result)
        localStorage.setItem( 'character_data', JSON.stringify(result))
    } else {
        console.log("Using Cache")
        load_page(stored_character_data)
    }
})
.catch((err) => {
    console.log(err)

        console.log("Using Cache")
    load_page(stored_character_data)
});


function load_page(result){
    // if(result!=undefined){
    //     localStorage.setItem( 'character_data', JSON.stringify(result))
    // }

    tamers = result.tamers
    if(tamers==undefined){
        tamers = JSON.parse(localStorage.getItem('character_data')).tamers
    } else {tamers.shift()}

    all_torments = result.torments
    special_orders_list = result.special_orders

    all_digimon_forms = result.digimons
    all_digimon_forms = all_digimon_forms.filter(all_digimon_forms => all_digimon_forms.sheet != ' ')
    if(all_digimon_forms==undefined){all_digimon_forms = []} else {all_digimon_forms.shift()}

    console.log(result)
    campaign = result.campaign[0]
    if(campaign==undefined){campaign = {'name': "DDA Campaign"}}
    document.querySelector('title').innerHTML = campaign['name']
    document.querySelector('#campaign_name').innerHTML = campaign['name']

    
    let selected_digimon = all_digimon_forms[0]

    // attacks = result.attacks
    
    tamers.forEach(function(tamer){
        tamer.xp = {}
        tamer.xp.rewarded = tamer.xp_rewarded
        tamer.xp.used = tamer.xp_used
        tamer.inspiration = {}
        tamer.inspiration.rewarded = tamer.inspiration_rewarded
        tamer.inspiration.used = tamer.inspiration_used
        tamer.special_orders = tamer['special orders'].split(',')

    tamer.boxes = [
        ['Wound Boxes', `${tamer['wound_boxes']}`], 
        ['Movement', tamer['movement']], 
        ]

    tamer.stats = [
    ['Accuracy Pool', tamer['accuracy']], 
    ['Damage', tamer['damage']],
    ['Dodge Pool', tamer['dodge_stat']],
    ['Armor', tamer['armor']]]

    tamer.attributes = [
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

    })

    all_digimon_forms.forEach(
        function(digimon){
        digimon['wound_boxes'] = digimon['wound_boxes']
        
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

    let q_names = []
    if(digimon.qualities_names){q_names = digimon.qualities_names.split(',')}
    
    
    let q_ranks = []
    if(digimon.quality_ranks){q_ranks = digimon.quality_ranks.split(',')}

    let count = 0
    q_names.forEach(function(x){
        if(x){
        target_quality = {
            "id": 0,
            "Name": x,
            "rank": q_ranks[count],

        }
        // console.log(quality_list)
        try{
            // console.log(quality_list[x])
            target_quality = quality_list[x]
            target_quality.rank = q_ranks[count]

        }catch(err){console.log(err)}

        // target_quality = quality_list[x]
        // console.log(target_quality)
        // target_quality["rank"] = q_ranks[count]
        
        digimon.qualities.push(target_quality)
        count++
    }})
        // console.log(digimon.qualities)
        digimon.qualities.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
        // console.log(digimon.qualities)


    digimon.boxes = [
        ['Wound Boxes', digimon['wound_boxes']], 
        ['Movement', digimon['movement']], 
        ['Attack Range', `${digimon['range']}m | ${digimon['limit']}m`]
        ]

    digimon.stats = [
        ['Health', digimon['health']], 
        ['Accuracy', digimon['accuracy']], 
        ['Damage', digimon['damage']],
        ['Dodge', digimon['dodge_stat']],
        ['Armor', digimon['armor']]
        ]

    digimon.derived = [
        ['Agility', digimon['agility']], 
        ['Body', digimon['body']],
        ['Brains', digimon['brains']]
        ]

    digimon.specs = [
        ['RAM', digimon['ram']],
        ['CPU', digimon['cpu']],
        ['BIT', digimon['bit']]
        ]

    digimon.attributes = [
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

        try{
        attack = []
        attacks = digimon['attacks_array'].split("|||")
        
        attacks.forEach(
            function(x){ 
                attack_values = x.split("|XXX|")

        final_attack = {
            "name": attack_values[0],
            "description": attack_values[1],
            "tags": attack_values[2],
            "roll": attack_values[3],
            "accuracy_bonus": attack_values[4],
            "damage_bonus": attack_values[5],
            "auto_successes": attack_values[6],
            "armor_ignored": attack_values[7]
        }

        
        attack.push(final_attack)

        }

        )    

        digimon['attacks'] = attack
        }catch(err){console.log(err)}

        
    })

    let activeTamer = localStorage.getItem('activeTamer')
    try{ update_tamer_tab(activeTamer)}
    catch{ update_tamer_tab(tamers[0]['id'])}

    let activeDigimon = localStorage.getItem('activeDigimon') 
    try{ update_digimon_tab(activeDigimon)}
    catch { update_digimon_tab(all_digimon_forms[0]['id'])}

    document.getElementById("home_page_tamer").innerHTML= ""
    tamers.forEach(function(x){create_home_tamer(x, "home_page_tamer")})

    document.getElementById("home_page_digimon").innerHTML= ""
    tamers.forEach(function(x){create_home_digimon(x, "home_page_digimon")})

    setup_playlist(tamers, all_digimon_forms)
    setup_qualities()

    
}



// Functions --------------------------------------------------------------

function create_home_tamer(tamer, element_id){
    let tamer_element = create_element('div', `<img 
                id="HometamerImage_${tamer.id}" 
                src="${tamer.image_url}" 
                class="card-img-top" 
                style="position:relative;
                        top: 0;
                        left: 0;
                        object-fit: cover;
                        object-position: top;
                        min-width: 200px;
                        max-width: 200px;
                        min-height: 200px;
                        height: 20vh;
                        margin-bottom: 1rem;">
                <div class="center" style="margin-left:5%;margin-right:5%;text-align: center">    
                <div><small class="text-muted" style="margin: 0 auto;">
                    <div>${tamer.gender} / ${tamer.age} / ${tamer.height}</div>
                    <div>${tamer.xp_used} / ${tamer.xp_rewarded} XP Used</div>
                    <div>${tamer.inspiration.rewarded - tamer.inspiration.used} / ${tamer.willpower} Inspiration</div></small>
                    ${'<i class="bi bi-star-fill"></i> '.repeat(tamer["inspiration"]["rewarded"] - tamer["inspiration"]["used"])}${'<i class="bi bi-star"></i> '.repeat((tamer["willpower"] - (tamer["inspiration"]["rewarded"] - tamer["inspiration"]["used"])))}
                
                <br>
                <a class="character_info"
                href="${tamer.sheet}">Character Sheet Link</a>
                <hr>
                </div>`, {style: "padding:1%"
                })

    let box_element = create_element('div', '', {id: `block_1_${tamer.id}`})
    tamer_element.append(box_element)
    tamer_element.append(document.createElement("hr"))

    let stats_element = create_element('div', '', {id: `block_2_${tamer.id}`})
    tamer_element.append(stats_element)
    tamer_element.append(document.createElement("hr"))

    let attributes_element = create_element('div', '', {id: `block_3_${tamer.id}`})
    tamer_element.append(attributes_element)

    document.getElementById(element_id).append(tamer_element)

    tamer.boxes.forEach(function(x) {create_bar(x, `#block_1_${tamer.id}`)})

    tamer.stats.forEach(function(x) {create_bar(x, `#block_2_${tamer.id}`)})

    tamer.attributes.forEach(function(x) {create_attribute_bar(x, `#block_3_${tamer.id}`)})    
}

function create_home_digimon(tamer, element_id, digimon_id=null){

    let all_digimon = all_digimon_forms.filter(all_digimon_forms => all_digimon_forms.sheet == tamer.sheet)
    if (digimon_id == null){
        digimon = all_digimon[0]}
    else{ 
        digimon = all_digimon.filter(all_digimon => all_digimon.id == digimon_id)[0]
        }
    


    let digimon_element = create_element('div', `<img 
                id="HomeDigimonImage_${digimon.id}" 
                src="${digimon.image_url}" 
                class="card-img-top" 
                style="position:relative;
                        top: 0;
                        left: 0;
                        object-fit: cover;
                        object-position: top;
                        min-width: 200px;
                        max-width: 200px;
                        min-height: 200px;
                        height: 20vh;
                        margin-bottom: 1rem;">
                <div class="center" style="margin-left:5%;margin-right:5%;text-align: center">    
                <div>
                <hr>
                </div>`, {
                    id: `home_digimon_div_tamer_${tamer.id}`,
                    style: "padding:1%"
                })

    let drop_down_container = create_element('div', `
        <button class="display-6 btn btn-light dropdown-toggle" type="button" id="digimonName_${digimon.id}" data-bs-toggle="dropdown" aria-expanded="false">${digimon.name}</button>`,
         {class: "dropdown"})

    let drop_down = create_element('ul', ``,
    {   "id": "digimon-dropdownmenu",
        "class": "dropdown-menu",
        "aria-labelledby": "dropdownMenuButton1"}
        )
    
    drop_down_container.append(drop_down)

    all_digimon.forEach(function(x){
        let form = create_element('a', `${x.name}`,
        {
            digimon_id: x.id,
            class: "dropdown-item",
            href: "#a"
        })
        form.addEventListener('click', function (event) {
                            create_home_digimon(tamer, element_id, x.id)
                        })
        drop_down.append(form)
    })

    digimon_element.prepend(drop_down_container)

    let box_element = create_element('div', '', {id: `digimon_block_1_${digimon.id}`})
    digimon_element.append(box_element)
    digimon_element.append(document.createElement("hr"))

    let stat_element = create_element('div', '', {id: `digimon_block_2_${digimon.id}`})
    digimon_element.append(stat_element)
    digimon_element.append(document.createElement("hr"))

    let derived_element = create_element('div', '', {id: `digimon_block_3_${digimon.id}`})
    digimon_element.append(derived_element)
    digimon_element.append(document.createElement("hr"))

    let stage_element = create_element('div', '', {id: `digimon_block_stage_${digimon.id}`})
    digimon_element.append(stage_element)
    digimon_element.append(document.createElement("hr"))

    let specs_element = create_element('div', '', {id: `digimon_block_4_${digimon.id}`})
    digimon_element.append(specs_element)
    digimon_element.append(document.createElement("hr"))

    let attribute_element = create_element('div', '', {id: `digimon_block_5_${digimon.id}`})
    digimon_element.append(attribute_element)
    digimon_element.append(document.createElement("hr"))

    


    if(document.getElementById(`home_digimon_div_tamer_${tamer.id}`)){
        document.getElementById(`home_digimon_div_tamer_${tamer.id}`).parentNode.replaceChild(digimon_element, document.getElementById(`home_digimon_div_tamer_${tamer.id}`));
    }
        else (document.getElementById(element_id).append(digimon_element))
    

    digimon.boxes.forEach(function(x) {create_bar(x, `#digimon_block_1_${digimon.id}`)})
    digimon.stats.forEach(function(x) {create_bar(x, `#digimon_block_2_${digimon.id}`)}) 
    digimon.derived.forEach(function(x) {create_bar(x, `#digimon_block_3_${digimon.id}`)})
    create_bar(["Stage Bonus", digimon["stage_bonus"]], `#digimon_block_stage_${digimon.id}`, 5)
    digimon.specs.forEach(function(x) {create_bar(x, `#digimon_block_4_${digimon.id}`)})  
    digimon.attributes.forEach(function(x) {create_attribute_bar(x, `#digimon_block_5_${digimon.id}`)})
    
    let quality_element = create_element('div', '', {id: `digimon_qualities_${digimon.id}`})
    
    digimon.qualities.forEach(function(x) {
        if(x){
        let quality = create_element('div', `${x.Name} ${x.rank}`)
        quality_element.append(quality)}}
        )

    digimon_element.append(quality_element)
}



function update_tamer_tab(id){
    let tamer = tamers.filter(function(x){ return x.id == id})[0]
    document.getElementById("tamerName").textContent = tamer.name;
    document.getElementById("tamerEpitaph").textContent = "- " + tamer.title;
    document.getElementById("tamerUsername").textContent = '[' + tamer.username + ']'
    document.getElementById("tamerImage").src = tamer.image_url;
    document.getElementById("tamer_background").src = tamer.background_image;
    document.getElementById("tamerSynopsis").textContent = tamer.characterSynopsis.trim();
    document.getElementById("tamer_initiative").textContent =  `3d6 + ${tamer.initiative_bonus}`;
    document.getElementById("tamer_recovery").textContent = `3d6 + ${tamer.recovery_bonus}`;
   
    try{
    
    create_partner_forms(tamers, tamer)
    create_tamer_sidebar_data(tamer)
    create_aspect_div(tamer)
    create_torment_div(tamer)
    create_special_order_div(tamer)
    }
    catch(err){
        console.log(tamer)
        console.log(err)}

}


function update_digimon_tab(id){
    let digimon = all_digimon_forms.filter(function(x){ return x.id == id})[0]
    let selected_digimon = digimon
    if(digimon==undefined){digimon=all_digimon_forms[0]}

    if(digimon["synopsis"] == ""){digimon["synopsis"] = "Click to add a Synopsis"}


    document.querySelector('#digimonEpitaph').textContent =  "- " + digimon['title']
    document.querySelector('#digimonImage').src = digimon['image_url']
    document.querySelector('#digimonName').textContent = digimon['name']
    document.getElementById("digimon_initiative").textContent =  `3d6 + ${digimon.initiative}`;
    document.getElementById("digimon_recovery").textContent = `3d6 + ${digimon["recovery pool"]}`;
    document.querySelector('#DigimonSynopsis_Text').textContent = digimon["synopsis"]
    document.querySelector('#DigimonSynopsis_Form').textContent = digimon["synopsis"]

    document.querySelector('#DigimonSynopsis_Text').addEventListener('click', function (event) {
        document.querySelector('#DigimonSynopsis_Form').value = digimon["synopsis"]
        document.querySelector('#DigimonSynopsis_Form').style.display = "";
        document.querySelector('#DigimonSynopsis_Text').style.display = "none";
        document.querySelector('#DigimonSynopsis_Form').focus()
})
    document.querySelector('#DigimonSynopsis_Form').onblur = function(){
            document.querySelector('#DigimonSynopsis_Text').innerHTML = document.querySelector('#DigimonSynopsis_Form').value
            document.querySelector('#DigimonSynopsis_Form').style.display = "none";
            document.querySelector('#DigimonSynopsis_Text').style.display = "";
                
            console.log(digimon)
            console.log(digimon["synopsis_index"])

            if(digimon["synopsis_index"] != ""){

                if(document.querySelector('#DigimonSynopsis_Form').value != digimon["synopsis"]){
                fetch(
                    `https://api.sheetson.com/v2/sheets/digimon_synopsis/${digimon["synopsis_index"]}`, 
                {method: "PUT",
                headers: {
                    "Authorization": `Bearer ${api_key}`,
                    "X-Spreadsheet-Id": spreadsheet_id,
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({"synopsis_description" : document.querySelector('#DigimonSynopsis_Form').value})})
                .then(r => r.json()).then(r => {

                    digimon["synopsis"] = document.querySelector('#DigimonSynopsis_Form').value
                    console.log("PUT: " + document.querySelector('#DigimonSynopsis_Form').value)
                    console.log(r)})
            }}
            else{
                
                fetch(
                    `https://api.sheetson.com/v2/sheets/digimon_synopsis`, 
                
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${api_key}`,
                            "X-Spreadsheet-Id": spreadsheet_id,
                            "Content-Type": "application/json"
                          },
                        body: JSON.stringify(
                            {
                                "digimon_id": digimon["id"],
                                "synopsis_description": document.querySelector('#DigimonSynopsis_Form').value
                            }
                            )
                    }
                )
                .then(r => r.json()).then(r => {

                    digimon["synopsis"] = document.querySelector('#DigimonSynopsis_Form').value
                    console.log("POST")
                    console.log(r)
                })
            }


        }


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
                style="width:100%;
                height:50px;
                align-items: center;
                justify-content: center;
                object-fit: cover;
                object-position: top;"> 
                `,
                {"class": 'zoom',
                "tamer_id": x['id']} )

    tamer_element.addEventListener('click', function (event) {
            console.log(event)
                let id = tamer_element.getAttribute('tamer_id')
                update_tamer_tab(id)
                localStorage.setItem( 'activeTamer', id)
                localStorage.setItem('activecharacterTab', '#tamerTab')
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
                localStorage.setItem('activecharacterTab', '#tamerTab')
            })
        }
        )

    


    let partner_forms = all_digimon_forms.filter(function(x){
        return x['sheet'] == tamer['sheet']
    })

    partner_forms.forEach(function(digimon){
        // console.log(digimon)
        let new_element = create_element('li',
            `<img src="${digimon['image_url']}"
            style="width:100%;
                height:50px;
                align-items: center;
                justify-content: center;
                object-fit: cover;
                object-position: top;
                aspect-ratio: 1 / 1">`,
            {"class": 'zoom',
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

    let xp_div = create_element('div', `${tamer["xp"]["used"]} / ${tamer["xp"]["rewarded"]} XP Used`)
    let misc = create_element('div', `${tamer["gender"]} / ${tamer["age"]} / ${tamer["height"]}`)
    let inspiration_div = create_element('div', `${tamer["inspiration"]["rewarded"] - tamer["inspiration"]["used"]} Inspiration | 
        ${'<i class="bi bi-star-fill"></i> '.repeat(tamer["inspiration"]["rewarded"] - tamer["inspiration"]["used"])}${'<i class="bi bi-star"></i> '.repeat((tamer["willpower"] - (tamer["inspiration"]["rewarded"] - tamer["inspiration"]["used"])))}`)
    let small_container = create_element(
        'small',
        '',
        {
            'class': 'text-muted', 
            'style': "margin: 0 auto;"
        }
        )

    let character_sheet_link = create_element(
        'a', 
        `Character Sheet Link`,
        {'class': `character_info`,
        'href': tamer.sheet})


    create_tamerRight(tamer)

    let inside_divs = [misc, xp_div, inspiration_div]

    inside_divs.forEach(function(x){small_container.appendChild(x)})

    clear_div('#tamerinfo')
    document.querySelector('#tamerinfo').appendChild(small_container)
    document.querySelector('#tamerinfo').appendChild(character_sheet_link)

    // clear_div('#tamer_stat_block_1')
    // tamer.boxes.forEach(function(x) {create_bar(x, '#tamer_stat_block_1')})
    // clear_div('#tamer_stat_block_2')
    // tamer.stats.forEach(function(x) {create_bar(x, '#tamer_stat_block_2')})  
    // clear_div('#tamer_stat_block_3')
    // tamer.attributes.forEach(function(x) {create_attribute_bar(x, '#tamer_stat_block_3')})
}

function create_tamerRight(tamer){
    let character_sheet_link = create_element(
        'a', 
        `Character Sheet Link`,
        {'class': `character_info`,
        'href': tamer.sheet})

    clear_div('#tamer_stat_block_1')
    tamer.boxes.forEach(function(x) {create_bar(x, '#tamer_stat_block_1')})
    clear_div('#tamer_stat_block_2')
    tamer.stats.forEach(function(x) {create_bar(x, '#tamer_stat_block_2')})  
    clear_div('#tamer_stat_block_3')
    tamer.attributes.forEach(function(x) {create_attribute_bar(x, '#tamer_stat_block_3')})

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
        `<h6><em>${tamer['major_aspect_name']}</em></h6><small> (Major Aspect | ±4 to roll)</small><p>${tamer['major_aspect_description']}</p>`,
        {'class': "col-6"})
    
    document.querySelector(`${target_id}`).append(major_element)

    let minor_element = create_element(
        'div', 
        `<h6><em>${tamer['minor_aspect_name']}</em></h6><small> (Minor Aspect | ±2 to roll) </small><p>${tamer['minor_aspect_description']}</p>`,
        {'class': "col-6"})
    
    document.querySelector(`${target_id}`).append(minor_element)

}

function create_torment_div (tamer){
     let tamer_torments = all_torments.filter(function(x){

        return x.tamer_id == tamer.id && x.name != "Torment Name" 
    })

    // let tamer_torments = tamer['torments']
    let target_id = "#torments"
    clear_div(target_id)

    tamer_torments.forEach(function(x){

        let new_element = create_element(
            'div',
            `<div style="display:inline-flex; justify-content: space-between;width:100%;">
            <div><h6><em>${x["name"]}</em></h6><div>(${toTitleCase(x["type"])} | ${x["marked_boxes"]}/${x["total_boxes"]} Boxes Marked  | 3d6 + ${x.roll})</div></div>
            <div style=" text-align: right;">${'<i class="bi bi-check-square-fill"></i> '.repeat(x["marked_boxes"])}${'<i class="bi bi-square"></i> '.repeat(x["total_boxes"]-x["marked_boxes"])}</div>
            </div>
            
            <div>${x["description"]}</div>`,
            {"style": "padding-bottom:1%"})
        if(x.total_boxes != 0){document.querySelector(`${target_id}`).append(new_element)}
        
    })

}

function create_special_order_div (tamer){
    // console.log(special_orders_list)

    
    let target_id = "#special_orders"
    clear_div(target_id)
   
     tamer.special_orders.forEach(function(x){

        let order = special_orders_list.filter(function(order){
            return order['name'] == x.trim()
        })[0]

        let desc = ""

        // console.log(order)
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

    let box = '☐' // Try edit me
    let size =1 
    let size_key = {
        "Large": 2,
        "Huge": 3,
        "Gigantic": 4   
    }
    console.log(size_key[digimon["size"]])
    if(size_key[digimon["size"]]){
        size = size_key[digimon["size"]]
    }



    box = (box + '').repeat(size)
    box = (box + `
        `).repeat(size)

    let stage_div = create_element('h4', digimon["stage"])
    let size_div = create_element('div', `<hr><h4> ${digimon["size"]}</h4> <div style = "z-index:-1;white-space: pre-line;line-height: 1; " >${box}</div><div>${size}x${size} </div><hr>`,
    {})


    let container = create_element('div', "", {style:"display:flex; flex-direction: column; justify-content: space-evenly"})
    container.append(stage_div)
    container.append(size_div)

    let dp_div = create_element('div', `+${digimon["rewarded_dp"]} DP`)
    let type_div = create_element('div', digimon["jogress"])
    let misc = create_element('div', `<div>${digimon["attribute"]}</div>
        <div>${digimon["type"]}</div>
        <div>${digimon["field"]}</div>`)

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

    clear_div('#digimon_stat_block_1')
    digimon.boxes.forEach(function(x) {create_bar(x, '#digimon_stat_block_1')})
    clear_div('#digimon_stat_block_2')
    digimon.stats.forEach(function(x) {create_bar(x, '#digimon_stat_block_2')})   
    clear_div('#digimon_stat_block_3')
    digimon.derived.forEach(function(x) {create_bar(x, '#digimon_stat_block_3')}) 
    
    clear_div('#digimon_stat_block_stage')
    create_bar(["Stage Bonus", digimon["stage_bonus"]], '#digimon_stat_block_stage')
    
    clear_div('#digimon_stat_block_4')
    digimon.specs.forEach(function(x) {create_bar(x, '#digimon_stat_block_4')})  
    clear_div('#digimon_stat_block_5')
    digimon.attributes.forEach(function(x) {create_attribute_bar(x, '#digimon_stat_block_5')})
}

function create_quality_div (digimon){
    let digimon_qualities = digimon['qualities']
    let target_id = "#digimon_qualities"
    clear_div(target_id)
    clear_div(`#quality-description`)
    digimon_qualities.forEach(function(x){
        if(x.rank == undefined || x.rank == "I" ){x.rank = ""}
        
        let new_element = create_element('div', `<small>${x.Name}</small> <small>${x.rank}</small>`, {"style":"padding-bottom: 3%;"})
        document.querySelector(`${target_id}`).append(new_element)

        let quality_description = create_element('div', `<div><b>${x.Name} ${x.rank}</b> ${x["Type"]}</div>
            <div><small>${x.Description}</small></div>`,
            {style: "white-space: pre-line;"})
        document.querySelector(`#quality-description`).append(quality_description)
    })
}

function create_dodge_div (digimon){
    let digimon_dodges = digimon['dodges']
    let target_id = "#digimon_dodges"
    clear_div(target_id)

    let dodge_div = create_element('div', '', {'class': 'row'})
    document.querySelector(target_id).append(dodge_div)

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


    if(x['tags'] ==""){
        x['tags'] = "No Tags"
     }

        let new_element = create_element('div', 
            `<div style="display:flex; justify-content:space-between"><div><b>${x['name']}</b></div>
            <div><h4>${x['roll']}d6${auto_successes}</h4></div></div>
            </div>
            <div><small>${x['tags']}</small></div>
            ${effect_duration}<hr>`,
            {'class': 'overflow-auto'})
        if(x.name=="vs Ranged" || x.name=="vs Melee"){
            new_element.classList.add("col-6")
            dodge_div.append(new_element)
        }
        else{
            document.querySelector(target_id).append(new_element)
        }
        
    })
}


function create_attack_div(digimon){
    let digimon_attacks = digimon.attacks

    let target_id = "#digimon_attacks"
    clear_div(target_id)



    digimon_attacks.forEach(function(x){
        // console.log(x)
        let new_element = create_element('li', 
            `<div style="display:flex; justify-content:space-between"><div><b>${x['name']}</b></div>
            <div><h4>${x['roll']}</h4></div></div>
            <small>${x['tags']}</small>
            <div style="white-space: pre-line;"><small>${x['description']}</small><hr>`, 
            {'class': 'overflow-auto'})
        if(x.roll){document.querySelector(`${target_id}`).append(new_element)}
        
})
}

function area_value_div(digimon){

    // let digimon_attacks = digimon['attacks']
    let target_id = "#area_value_div"
    clear_div(target_id)
    clear_div("#combat_notes_div")

    if(digimon['clost_blast_m'] == "-" || digimon['clost_blast_m']==""){digimon['clost_blast_m']=""}
    else{digimon['clost_blast_m']+="m"}

    if(digimon['pass_r'] == "-" || digimon['pass_r'] == ""){digimon['pass_r']=""}
    else{digimon['pass_r']+="m"}

    let new_element = create_element('div', 
            `<table class="">
              <thead>
                <tr>
                  <th scope="col">Area Value</th>
                  <th scope="col">Melee</th>
                  <th scope="col">Ranged</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>[Burst] Radius</td>
                  <td>${digimon['burst_m']}m</td>
                  <td>${digimon['burst_r']}m</td>
                </tr>
                <tr>
                  <td>[Blast] Diameter</td>
                  <td>${digimon['blast_m']}m</td>
                  <td>${digimon['blast_r']}m</td>
                </tr>
                <tr>
                  <td>[Close Blast] Radius</td>
                  <td>${digimon['clost_blast_m']}</td>
                  <td>${digimon['clost_blast_r']}m</td>
                </tr>
                <tr>
                  <td>[Line] Dimension</td>
                  <td>${digimon['line_m']}m</td>
                  <td>${digimon['line_r']}m</td>
                </tr>
                <tr>
                  <td>[Cone] Length</td>
                  <td>${digimon['cone_m']}m</td>
                  <td>${digimon['cone_r']}m</td>
                </tr>
                <tr>
                  <td>[Pass] Movement</td>
                  <td>${digimon['pass_m']}m</td>
                  <td>${digimon['pass_r']}</td>
                </tr>
              </tbody>
            </table>`, 
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
    console.log(combat_notes=="")
    if(combat_notes==""){combat_notes = "No Combat Notes <hr>"}
    console.log(combat_notes)

    let element_2 = create_element('div', combat_notes)
    
    if(digimon.misc_skill_rolls!="No Notes"){
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
        
        element_2.append(create_element('hr'))
        document.querySelector("#combat_notes_div").append(element_2)}

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