
    let human_template = {
    "id": 2,
    "sheet": "https://docs.google.com/spreadsheets/d/1zBWe14UF89XjdDGEEByMOq9bUPpvjRdpKJBHExv42lQ/edit#gid=637703777/",
    "sheetName": "Xochi",
    "name": "Xochitl Vega",
    "title": "Monstrous Hacker",
    "image": "https://i.imgur.com/f0vkqrG.png",
    "xp": {"rewarded": 10, "used": 0},
    "inspiration": {"rewarded": 1, "used": 0},
    "aspects": {
        "major": {"name": "Prodigious Mind",
                  "description": "Xochi is very talented with computers, sneaking, problem solving, and general logical processing."},
        "minor": {"name": "Solitary Miss",
                  "description": "Xochi prefers working alone and finds herself to be much more efficent in solitary settings."},
    },
    "torments": [
        {"name": "Monster Abandoned",
        "type": "Major",
        "total_boxes": 7,
        "marked_boxes": 4,
        "description": "As an orphan who no one really cared up about, Xochi grew up hearing repeated promises of things that would never be, leading to a deep feeling of rejection from the world and the feeling that she was a monster deserving of it."},
        {"name": "Monstrous Torment",
        "type": "Terrible",
        "total_boxes": 7,
        "marked_boxes": 3,
        "description": "Words an orphan who no one really cared up about, Xochi grew up hearing repeated promises of things that would never be, leading to a deep feeling of rejection from the world and the feeling that she was a monster deserving of it."}
        ],
    "partner": "Bacomon",
    "partnerId": 1,
    "campaign": "Standard",
    "age": 15,
    "gender": "Female",
    "height": "5'6\"",
    "characterSynopsis": "Xyz is a 15 year old girl living in Southern California as a seemingly regular highschool student. An incredibly bright girl, Xyz spends most of her time online, a brilliant young hacker - either researching the most current ways of defusing the secrets of the web or stalking the internet for a subject to shitpost, it can really 50/50 with her. \n\nXyz is very level headed, especially for her age, calm and calculating, always questioning the systems that are at work around her. If you assign a task to Xyz, you can trust that it will be done, and it will be done well. She is very guarded about her personal information, usually going by an alias if ever possible (note: Xyz is an alias in itself) and tends to make subtle moves to keep her distance from people. Surprisingly Xyz can still be fairly sociable, with a dry, sassy wit when dealing with people, either endearing people to her or a building tension the girl knowingly ignores. She isn’t the usual stereotype of an introvertive hacker, though at her core that is what she is, she just knows how to play different roles and the values of being able to be more than just what you’re defined as. \n\nXyz is a teenage girl who stands at about 5'6. She has long straight hair with bangs covering her forehead. Generally on the thin side due to her mostly inactive lifestyle and youth.  She has a dark complexion with subtle freckles crossing her nose. Her ethnicity is a bit of a mystery, that even Xyz doesn’t quite know herself, though through her last name she knows she has some spanish heritage, though her look generally guides to some native and black touches. Ultimately she just thinks of herself as some flavor of afrolatino mutt. \n\nXyz is  almost always found in a bulky blue and yellow hoodie (with her signature X across the front), a red skirt, tights, and a pair of \"smart sneakers\". She has a single X shaped gold earring, that she particularly likes as well. For fun she wears yellow prescription contact, with her ordinary eye color being hazel. \n",
    "attributes_skills":{
        "agility": 4,
        "dodge": 0,
        "fight": 0,
        "stealth": 4,
        "body": 3,
        "athletics": 0,
        "endurance": 0,
        "featsOfStrength": 0,
        "charisma": 5,
        "manipulate": 0,
        "perform": 0,
        "persuade": 2,
        "intelligence": 5,
        "computer": 5,
        "survival": 1,
        "knowledge": 4,
        "willpower": 4,
        "perception": 3,
        "decipherIntent": 1,
        "bravery": 1,
    },
    "derived_stats":{
        "current_wound_boxes": 3,
        "wound_boxes": 3,
        "movement": 5,
        "accuracy": 4,
        "damage": 3,
        "dodge": 4,
        "armor": 3,
    }
}

let human_template_2 = JSON.parse(JSON.stringify(human_template))
human_template_2.id = "3"
human_template_2.name = "Xochitl 2"

let response = {
"humans": [human_template, human_template_2],
}

    let tamers = response["humans"]
    let selected_tamer = response["humans"][0]
    let activeTamer = localStorage.getItem('activeTamer') 

    if(activeTamer){
        update_tamer_tab(activeTamer)
    } else {
        update_tamer_tab(selected_tamer['id'])
    }

    update_tamer_tab(selected_tamer.id)

    tamers.forEach(function(x){
        let dropdownitem = create_element(
            'li',
            `<li>
            <a tamer_id=${x["id"]} class="dropdown-item" href="#a">${x["name"]}</a>
            </li>`,
            )
        document.querySelector('#tamer-dropdownmenu').append(dropdownitem)
    })

    document.querySelectorAll('#tamer-dropdownmenu .dropdown-item').forEach(
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
        return x.partner_tamer_id == selected_tamer.id
    })


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



// Functions --------------------------------------------------------------

function update_tamer_tab(id){
    let tamer = tamers.filter(function(x){ return x.id == id})[0]
    let selected_tamer = tamer

    document.getElementById("tamerName").textContent = selected_tamer.name;
    // document.getElementById("tamerEpitaph").textContent = selected_tamer.title;
    document.getElementById("tamerImage").src = selected_tamer.image;
    document.getElementById("tamerSynopsis").textContent = selected_tamer.characterSynopsis;


    create_tamer_sidebar_data(selected_tamer)
    create_aspect_div(selected_tamer)
    create_torment_div(selected_tamer)
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
         'href': selected_tamer.sheet})

    let inside_divs = [misc, xp_div, inspiration_div]

    inside_divs.forEach(function(x){small_container.appendChild(x)})

    clear_div('#tamerinfo')
    document.querySelector('#tamerinfo').appendChild(small_container)
    document.querySelector('#tamerinfo').appendChild(character_sheet_link)


    console.log(selected_tamer)
    let boxes = [
        ['Wound Boxes', `${selected_tamer['derived_stats']['wound_boxes']} / ${selected_tamer['derived_stats']['wound_boxes']}`], 
        ['Movement', selected_tamer['derived_stats']['movement']], 
        ]

    let stats = [
        ['Accuracy Pool', selected_tamer['derived_stats']['accuracy']], 
        ['Damage', selected_tamer['derived_stats']['damage']],
        ['Dodge Pool', selected_tamer['derived_stats']['dodge']],
        ['Armor', selected_tamer['derived_stats']['armor']]]

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
    let tamer_aspects = tamer['aspects']
    let target_id = "#aspects"
    clear_div(target_id)

    let major_element = create_element(
        'div', 
        `<em>${tamer['aspects']['major']['name']}</em><small> (Major Aspect ±4)</small><p>${tamer['aspects']['major']['description']}</p>`,
        {'class': "col-6"})
    
    document.querySelector(`${target_id}`).append(major_element)

    let minor_element = create_element(
        'div', 
        `<em>${tamer['aspects']['minor']['name']}</em><small> (Minor Aspect ±2) </small><p>${tamer['aspects']['minor']['description']}</p>`,
        {'class': "col-6"})
    
    document.querySelector(`${target_id}`).append(minor_element)

}

function create_torment_div (tamer){
    let tamer_torments = tamer['torments']
    let target_id = "#torments"
    clear_div(target_id)

        tamer_torments.forEach(function(x){
        
        let new_element = create_element(
            'div',
            `${x["name"]} <small>(${x["type"]} Torment |     ${x["marked_boxes"]}/${x["total_boxes"]} Boxes Marked)</small>
            <div>${x["description"]}</div>`,
            {"style": "padding-bottom:1%"})
        document.querySelector(`${target_id}`).append(new_element)
    })

}