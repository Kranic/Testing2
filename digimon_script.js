

let all_digimon_forms = [
    {
        "id": 0,
        "name": "Bacomon",
        "epitaph": "A Box for Two",
        "image": "https://digisinobalichibi.s3.amazonaws.com/80+(1).png",
        "stage": "Child",
        "size": "Small", 
        "attribute": "Unknown",
        "type": "Unknown",
        "field": "Unknown",
        "jogress": null,
        "dp": 10,
        "used_dp": 9,
        "base_id": 0,
        "partner": "Xochi",
        "stats": {
            "health": 3,
            "accuracy": 4,
            "damage": 4,
            "dodge": 3,
            "armor": 3
        },
        "synopsis": "This is just some text",
        "derived_stats": {
            "current_wound_boxes": 4,
            "wound_boxes": 4,
            "movement": 10,
            "range": 10,   
            "range_limit": 10,
            "agility": 4,
            "body": 8,
            "brains": 5,
            "RAM": 1,
            "CPU": 3, 
            "BIT": 1
        },
        "attributes_skills": 
        {
        'Agility': 4,
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Body': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Charisma': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Intelligence': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Willpower': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2
        },
        "qualities": [
        "Data Optimization - Guardian",
        "Instinct",
        "Hide in Plain Sight ",
        "Technician ",
        "Prodigious Skill - Stealth ",
        "Improved Derived Stat - Agility ",
        "Mode Change ",
        "Speedy 3",
        "Teleport ",
        "Naturewalk - Darkness ",
        "Attack Effect: [Pull],"
        ],
        attacks: [
            {
                'name': 'Gum Roll',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Ranged] [Support] [Pull 2]',
                'description': 'Bacomon wraps the enemy in packing tape, slowing them down.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },  
            {
                'name': 'Basic Melee',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': `Default Attack when you can't use other attacks.`
            },  
            {
                'name': 'Throw',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Ranged] [Damage]',
                'description': `Default Attack when you can't use other attacks.`
            },

        ],
        dodges: [
            {
                'name': 'Melee Dodge',
                'roll': '3d6',
                'armor': '5',
                'auto_success': 0,
                'effect duration': 0,
                'tags': 'Vulnerable I',
            },
            {
                'name': 'Ranged Dodge',
                'roll': '3d6',
                'armor': '5',
                'auto_success': 0,
                'effect duration': 0,
                'tags': ' '
            },
            {
                'name': 'Positive Effect',
                'roll': '3d6',
                'auto_success': 0,
                'effect duration': 0,
                'tags': ' '
            },
        ]
    },
    {
        "id": 1,
        "epitaph": "A Big Dumbass",
        "name": "Ginkakumon",
        "image": "https://i.imgur.com/sdQFBbb.png",
        "stage": "Adult",
        "size": "Huge",
        "attribute": "Virus",
        "type": "Oni",
        "field": "Unknown",
        "jogress": null,
        "dp": 10,
        "used_dp": 9,
        "base_id": 0,
        "partner": "Xochi",
        "stats": {
            "health": 5,
            "accuracy": 4,
            "damage": 4,
            "dodge": 3,
            "armor": 10
        },
        "synopsis": "This is just some text but with some more.",
        "derived_stats": {
            "current_wound_boxes": 4,
            "wound_boxes": 22,
            "movement": 12,
            "range": 10,   
            "range_limit": 12,
            "agility": 4,
            "body": 8,
            "brains": 5,
            "RAM": 1,
            "CPU": 3, 
            "BIT": 1
        },
        "attributes_skills": 
        {
        'Agility': 4,
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Body': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Charisma': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Intelligence': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Willpower': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2
        },
        "qualities": [
        "Data Optimization - Guardian",
        "Instinct",
        "Hide in Plain Sight ",
        "Technician ",
        "Prodigious Skill - Stealth ",
        "Improved Derived Stat - Agility ",
        "Mode Change ",
        "Speedy 3",
        "Teleport ",
        "Naturewalk - Darkness ",
        "Attack Effect: [Pull],"
        ],
        attacks: [
            {
                'name': 'Gum Roll',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Ranged] [Support] [Pull 2]',
                'description': 'Bacomon wraps the enemy in packing tape, slowing them down.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },  
            {
                'name': 'Basic Melee',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': `Default Attack when you can't use other attacks.`
            },  
            {
                'name': 'Throw',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Ranged] [Damage]',
                'description': `Default Attack when you can't use other attacks.`
            },

        ],
        dodges: [
            {
                'name': 'Melee Dodge',
                'roll': '3d6',
                'armor': '5',
                'auto_success': 0,
                'effect duration': 0,
                'tags': 'Vulnerable I',
            },
            {
                'name': 'Ranged Dodge',
                'roll': '3d6',
                'armor': '5',
                'auto_success': 0,
                'effect duration': 0,
                'tags': ' '
            },
            {
                'name': 'Positive Effect',
                'roll': '3d6',
                'auto_success': 0,
                'effect duration': 0,
                'tags': ' '
            },
        ]
    },
    {
        "id": 2,
        "name": "Charismon",
        "epitaph": "Villain Hero",
        "image": "https://i.imgur.com/iAPVAK4.png",
        "stage": "Perfect",
        "size": "Huge",
        "attribute": "Virus",
        "type": "Unknown",
        "field": "Unknown",
        "jogress": null,
        "dp": 10,
        "used_dp": 9,
        "base_id": 0,
        "partner": "Xochi",
        "stats": {
            "health": 3,
            "accuracy": 4,
            "damage": 4,
            "dodge": 3,
            "armor": 3
        },
        "synopsis": "Not Canon",
        "derived_stats": {
            "current_wound_boxes": 4,
            "wound_boxes": 4,
            "movement": 10,
            "range": 10,   
            "range_limit": 10,
            "agility": 4,
            "body": 8,
            "brains": 5,
            "RAM": 1,
            "CPU": 3, 
            "BIT": 1
        },
        "attributes_skills": 
        {
        'Agility': 4,
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Body': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Charisma': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Intelligence': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2,
        'Willpower': 4, 
        'Dodge': 1,
        'Fight': 1,
        'Stealth': 2
        },
        "qualities": [
        "Data Optimization - Guardian",
        "Instinct",
        "Hide in Plain Sight ",
        "Technician ",
        "Prodigious Skill - Stealth ",
        "Improved Derived Stat - Agility ",
        "Mode Change ",
        "Speedy 3",
        "Teleport ",
        "Naturewalk - Darkness ",
        "Attack Effect: [Pull],"
        ],
        attacks: [
            {
                'name': 'Gum Roll',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Ranged] [Support] [Pull 2]',
                'description': 'Bacomon wraps the enemy in packing tape, slowing them down.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },
            {
                'name': 'Box Upper',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': 'Bacomon throws a light punch.'
            },  
            {
                'name': 'Basic Melee',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Melee] [Damage]',
                'description': `Default Attack when you can't use other attacks.`
            },  
            {
                'name': 'Throw',
                'roll': '3d6',
                'damage': '10',
                'tags': '[Ranged] [Damage]',
                'description': `Default Attack when you can't use other attacks.`
            },

        ],
        dodges: [
            {
                'name': 'Melee Dodge',
                'roll': '3d6',
                'armor': '5',
                'auto_success': 0,
                'effect duration': 0,
                'tags': 'Vulnerable I',
            },
            {
                'name': 'Ranged Dodge',
                'roll': '3d6',
                'armor': '5',
                'auto_success': 0,
                'effect duration': 0,
                'tags': ' '
            },
            {
                'name': 'Positive Effect',
                'roll': '3d6',
                'auto_success': 0,
                'effect duration': 0,
                'tags': ' '
            },
        ]
    }
    ]




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

    let dp_div = create_element('div', `${digimon["dp"]} DP`)
    let type_div = create_element('div', digimon["jogress"])
    let misc = create_element('div', `${digimon["attribute"]} / ${digimon["type"]} / ${digimon["field"]}`)

    let character_sheet_div = create_element(
        'div', 
        `<a onclick="show_digimon(1)">Partner: ${digimon["partner"]}`,
        {'class': `character_info`})

    let inside_divs = [container, misc, type_div, dp_div]

    inside_divs.forEach(function(x){small_container.appendChild(x)})

    clear_div('#digimoninfo')
    document.querySelector('#digimoninfo').appendChild(small_container)
    document.querySelector('#digimoninfo').appendChild(character_sheet_div)

    //


    let boxes = [
        ['Wound Boxes', `${digimon['derived_stats']['current_wound_boxes']} / ${digimon['derived_stats']['wound_boxes']}`], 
        ['Movement', digimon['derived_stats']['movement']], 
        ['Attack Range', `${digimon['derived_stats']['range']}m | ${digimon['derived_stats']['range_limit']}m`]
        ]

    let stats = [
        ['Health', 3], 
        ['Accuracy', 4], 
        ['Damage', 3],
        ['Dodge', 4],
        ['Armor', 3]]

    let derived = [
        ['Agility', 2], 
        ['Body', 2],
        ['Brains', 1]]

    let specs = [
        ['RAM', 1], ['CPU', 1], ['BIT', 1]
        ]

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

    function create_bar(x, target_id){
        let div = create_element('div')
        
        let new_element = create_element(
            'div', 
            `<div>${x[0]}</div><div>${x[1]}</div>`,
            {
                'class': 'd-flex justify-content-between mx-auto',
                'display': 'flex'
            }
            )

        let progress_bar = create_element(
        'div', 
        `<div class="progress-bar" role="progressbar" style="width:${x[1]/10*100}%"></div>`,
        {
            'class': 'progress',
            'style': 'height:5px'
        }
        )

        let target = document.querySelector(target_id)

        div.appendChild(new_element)
        div.appendChild(progress_bar)
        target.appendChild(div)
        }

    function create_attribute_bar(x, target_id){
        let div = create_element('div', "", {"style": "padding-bottom: 5%;"})
        let new_element = create_element(
            'div', 
            `<div>${x[0]}<small class="text-muted"> (3d6 + ${x[1]})</small></div>
            <div style="text-align: right">${x[1]}</div>  `,
            {
                'class': 'd-flex justify-content-between mx-auto',
                'display': 'flex'
            }
            )

        let progress_bar = create_element(
            'div', 
            `<div class="progress-bar ${x[0].toLowerCase()}" role="progressbar" style="width:${x[1]/10*100}%"></div>`,
            {
                'class': 'progress',
                'style': 'height:10px'
            })

        div.appendChild(new_element)
        div.appendChild(progress_bar)



        x[2].forEach(function(skill){
            let text_elem = create_element(
                'div',
                `<div>${skill[0]}<small class="text-muted">(3d6 + x)</small></div>
                <div>${skill[1]}</div>`,
                {   
                    'class': 'd-flex justify-content-between mx-auto',
                    'font-size': '12px'
                }
                )
            let progress_elem = create_element(
                'div',
                `<div class="progress-bar ${skill[0].toLowerCase()} role=" progressbar style="width:${skill[1]/10*100}%"></div>`,
                {   
                    'class': 'progress',
                    'style': `height: 5px`
                }
                )

            div.appendChild(text_elem)
            div.appendChild(progress_elem)
        })

        let target = document.querySelector(target_id)


        target.appendChild(div)    
    }




    clear_div('#digimon_stat_block_1')
    boxes.forEach(function(x) {create_bar(x, '#digimon_stat_block_1')})
    clear_div('#digimon_stat_block_2')
    stats.forEach(function(x) {create_bar(x, '#digimon_stat_block_2')})   
    clear_div('#digimon_stat_block_3')
    derived.forEach(function(x) {create_bar(x, '#digimon_stat_block_3')})  
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
        
        let new_element = create_element('div', `<small>${x}</small>`)
        document.querySelector(`${target_id}`).append(new_element)
    })
}

function create_dodge_div (digimon){
    let digimon_dodges = digimon['dodges']
    let target_id = "#digimon_dodges"
    console.log(digimon['dodges'])
    clear_div(target_id)
    digimon_dodges.forEach(function(x){
        let new_element = create_element('div', 
            `<div>${x['name']} (${x['roll']}+${x['auto_success']})</div>
            <small> Armor: ${x['armor']}</small>
            <small> | Effect Duration: +${x['effect duration']}</small>
            <small>${x['tags']}</small>
            <div style="white-space: pre-line;"><small>${x['description']}</small><hr>`,
            {'class': 'overflow-auto'})
        document.querySelector(`${target_id}`).append(new_element)
    })
}


function create_attack_div(digimon){
    let digimon_attacks = digimon['attacks']
    let target_id = "#digimon_attacks"
    clear_div(target_id)

    digimon_attacks.forEach(function(x){
        let new_element = create_element('li', 
            `<div>${x['name']} (${x['roll']})</div>
            <small>${x['tags']}</small>
            <div style="white-space: pre-line;"><small>${x['description']}</small><hr>`, 
            {'class': 'overflow-auto'})
        document.querySelector(`${target_id}`).append(new_element)
})
}

function update_digimon_tab(id){
    let digimon = all_digimon_forms.filter(function(x){ return x.id == id})[0]
    let selected_digimon = digimon
    document.querySelector('#digimonEpitaph').textContent = digimon['epitaph']
    document.querySelector('#digimonImage').src = digimon['image']
    document.querySelector('#digimonName').textContent = digimon['name']
    document.querySelector('#DigimonSynopsis').textContent = digimon['synopsis']

    create_attack_div(digimon)
    create_quality_div(digimon)
    create_dodge_div(digimon)


    create_sidebar_data(selected_digimon)
}

let selected_digimon = all_digimon_forms[0]
let activeDigimon = localStorage.getItem('activeDigimon') 

if(activeDigimon){
    update_digimon_tab(activeDigimon)
} else {
    update_digimon_tab(selected_digimon['id'])
}

//Create Data in DOM for Dropdown

all_digimon_forms.forEach(function(x){
    let dropdownitem = create_element(
        'li',
        `<li>
        <a digimon_id=${x["id"]} class="dropdown-item" href="#a">${x["name"]}</a>
        </li>`,
        )
    document.querySelector('#dropdownmenu').append(dropdownitem)

})

//Adding Listener for digimon dropdown changes
document.querySelectorAll('.dropdown-item').forEach(
    function(x){
    x.addEventListener('click', function (event) {
        let id = x.getAttribute('digimon_id')
        update_digimon_tab (id)
        localStorage.setItem( 'activeDigimon', id)
    })
    }
)

let other_forms = all_digimon_forms.filter(function(x){
    return x.base_id == selected_digimon.base_id
})


other_forms.forEach(function(digimon){
    let new_element = create_element('li',
    `<img src="${digimon['image']}" style="width:15%;float:left;"> 
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