let activeTab = localStorage.getItem('activeTab')
let activecharacterTab = localStorage.getItem('activecharacterTab')
let activetamerTab = localStorage.getItem('activetamerTab')
let activedigimonTab = localStorage.getItem('activedigimonTab')

let tab_array = [activeTab, activecharacterTab, activetamerTab, activedigimonTab]

// let all_digimon_forms = [
//     {
//         "id": 0,
//         "partner_tamer_id": 2,
//         "name": "Bacomon",
//         "epitaph": "A Box for Two",
//         "image": "https://digisinobalichibi.s3.amazonaws.com/80+(1).png",
//         "stage": "Child",
//         "size": "Small", 
//         "attribute": "Unknown",
//         "type": "Unknown",
//         "field": "Unknown",
//         "jogress": null,
//         "dp": 10,
//         "used_dp": 9,
//         "base_id": 0,
//         "partner": "Xochi",
//         "stats": {
//             "health": 3,
//             "accuracy": 4,
//             "damage": 4,
//             "dodge": 3,
//             "armor": 3
//         },
//         "synopsis": "This is just some text",
//         "derived_stats": {
//             "current_wound_boxes": 4,
//             "wound_boxes": 4,
//             "movement": 10,
//             "range": 10,   
//             "range_limit": 10,
//             "agility": 4,
//             "body": 8,
//             "brains": 5,
//             "RAM": 1,
//             "CPU": 3, 
//             "BIT": 1
//         },
//         "attributes_skills": 
//         {
//         'Agility': 4,
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2,
//         'Body': 4, 
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2,
//         'Charisma': 4, 
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2,
//         'Intelligence': 4, 
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2,
//         'Willpower': 4, 
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2
//         },
//         "qualities": [
//         "Data Optimization - Guardian",
//         "Instinct",
//         "Hide in Plain Sight ",
//         "Technician ",
//         "Prodigious Skill - Stealth ",
//         "Improved Derived Stat - Agility ",
//         "Mode Change ",
//         "Speedy 3",
//         "Teleport ",
//         "Naturewalk - Darkness ",
//         "Attack Effect: [Pull],"
//         ],
//         attacks: [
//             {
//                 'name': 'Gum Roll',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Ranged] [Support] [Pull 2]',
//                 'description': 'Bacomon wraps the enemy in packing tape, slowing them down.'
//             },
//             {
//                 'name': 'Box Upper',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Melee] [Damage]',
//                 'description': 'Bacomon throws a light punch.'
//             },
//             {
//                 'name': 'Box Upper',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Melee] [Damage]',
//                 'description': 'Bacomon throws a light punch.'
//             },
//             {
//                 'name': 'Box Upper',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Melee] [Damage]',
//                 'description': 'Bacomon throws a light punch.'
//             },  
//             {
//                 'name': 'Basic Melee',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Melee] [Damage]',
//                 'description': `Default Attack when you can't use other attacks.`
//             },  
//             {
//                 'name': 'Throw',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Ranged] [Damage]',
//                 'description': `Default Attack when you can't use other attacks.`
//             },

//         ],
//         dodges: [
//             {
//                 'name': 'Melee Dodge',
//                 'roll': '3d6',
//                 'armor': '5',
//                 'auto_success': 0,
//                 'effect duration': 0,
//                 'tags': 'Vulnerable I',
//             },
//             {
//                 'name': 'Ranged Dodge',
//                 'roll': '3d6',
//                 'armor': '5',
//                 'auto_success': 0,
//                 'effect duration': 0,
//                 'tags': ' '
//             },
//             {
//                 'name': 'Positive Effect',
//                 'roll': '3d6',
//                 'auto_success': 0,
//                 'effect duration': 0,
//                 'tags': ' '
//             },
//         ]
//     },
//     {
//         "id": 1,
//         "partner_tamer_id": 2,
//         "epitaph": "A Big Dumbass",
//         "name": "Ginkakumon",
//         "image": "https://i.imgur.com/sdQFBbb.png",
//         "stage": "Adult",
//         "size": "Huge",
//         "attribute": "Virus",
//         "type": "Oni",
//         "field": "Unknown",
//         "jogress": null,
//         "dp": 10,
//         "used_dp": 9,
//         "base_id": 0,
//         "partner": "Xochi",
//         "stats": {
//             "health": 5,
//             "accuracy": 4,
//             "damage": 4,
//             "dodge": 3,
//             "armor": 10
//         },
//         "synopsis": "This is just some text but with some more.",
//         "derived_stats": {
//             "current_wound_boxes": 4,
//             "wound_boxes": 22,
//             "movement": 12,
//             "range": 10,   
//             "range_limit": 12,
//             "agility": 4,
//             "body": 8,
//             "brains": 5,
//             "RAM": 1,
//             "CPU": 3, 
//             "BIT": 1
//         },
//         "attributes_skills": 
//         {
//         'Agility': 4,
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2,
//         'Body': 4, 
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2,
//         'Charisma': 4, 
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2,
//         'Intelligence': 4, 
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2,
//         'Willpower': 4, 
//         'Dodge': 1,
//         'Fight': 1,
//         'Stealth': 2
//         },
//         "qualities": [
//         "Data Optimization - Guardian",
//         "Instinct",
//         "Hide in Plain Sight ",
//         "Technician ",
//         "Prodigious Skill - Stealth ",
//         "Improved Derived Stat - Agility ",
//         "Mode Change ",
//         "Speedy 3",
//         "Teleport ",
//         "Naturewalk - Darkness ",
//         "Attack Effect: [Pull],"
//         ],
//         attacks: [
//             {
//                 'name': 'Gum Roll',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Ranged] [Support] [Pull 2]',
//                 'description': 'Bacomon wraps the enemy in packing tape, slowing them down.'
//             },
//             {
//                 'name': 'Box Upper',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Melee] [Damage]',
//                 'description': 'Bacomon throws a light punch.'
//             },
//             {
//                 'name': 'Box Upper',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Melee] [Damage]',
//                 'description': 'Bacomon throws a light punch.'
//             },
//             {
//                 'name': 'Box Upper',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Melee] [Damage]',
//                 'description': 'Bacomon throws a light punch.'
//             },  
//             {
//                 'name': 'Basic Melee',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Melee] [Damage]',
//                 'description': `Default Attack when you can't use other attacks.`
//             },  
//             {
//                 'name': 'Throw',
//                 'roll': '3d6',
//                 'damage': '10',
//                 'tags': '[Ranged] [Damage]',
//                 'description': `Default Attack when you can't use other attacks.`
//             },

//         ],
//         dodges: [
//             {
//                 'name': 'Melee Dodge',
//                 'roll': '3d6',
//                 'armor': '5',
//                 'auto_success': 0,
//                 'effect duration': 0,
//                 'tags': 'Vulnerable I',
//             },
//             {
//                 'name': 'Ranged Dodge',
//                 'roll': '3d6',
//                 'armor': '5',
//                 'auto_success': 0,
//                 'effect duration': 0,
//                 'tags': ' '
//             },
//             {
//                 'name': 'Positive Effect',
//                 'roll': '3d6',
//                 'auto_success': 0,
//                 'effect duration': 0,
//                 'tags': ' '
//             },
//         ]
//     }
//     ]


let set_tabs = function(activeTab){
    let link = document.querySelector(`[href="${activeTab}"]`)
    let selected_tab = new bootstrap.Tab(link)
    selected_tab.show()
}

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

let main_tabs = document.querySelectorAll('#navbarNav a[data-bs-toggle="tab"]')

let character_nav = document.querySelectorAll('#character_nav a[data-bs-toggle="tab"]')

    main_tabs.forEach(function (x){
        addEventListener('shown.bs.tab', function (event) {
        if(event.target.getAttribute('href') === x.getAttribute('href')) {
            localStorage.setItem('activeTab', event.target.getAttribute('href'))
        }
    })

    character_nav.forEach(function (x){
        addEventListener('shown.bs.tab', function (event) {
        if(event.target.getAttribute('href') === x.getAttribute('href')) {
            localStorage.setItem('activecharacterTab', event.target.getAttribute('href'))
        }
    })
    })    


})

if(activeTab && activeTab!='null'){tab_array.forEach(function(x){set_tabs(x)})}

function clear_div (id) {
    document.querySelector(id).innerHTML = ""
}


function create_element( 
    type, content = "", attributes = {}){
    
    let new_element = document.createElement(type)
    new_element.innerHTML = content

    function setAttributes(element, attributes) {
      Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr]);
      });
    }

    setAttributes(new_element, attributes)

    return new_element
}