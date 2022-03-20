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
    console.log(dropdownitem)
    document.querySelector('#digimon-dropdownmenu').append(dropdownitem)
})

//Adding Listener for digimon dropdown changes
document.querySelectorAll('#digimon-dropdownmenu .dropdown-item').forEach(
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



// Functions --------------------------------------------------------------


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