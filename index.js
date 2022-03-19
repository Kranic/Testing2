let activeTab = localStorage.getItem('activeTab')
let activecharacterTab = localStorage.getItem('activecharacterTab')
let activetamerTab = localStorage.getItem('activetamerTab')
let activedigimonTab = localStorage.getItem('activedigimonTab')

let tab_array = [activeTab, activecharacterTab, activetamerTab, activedigimonTab]

let set_tabs = function(activeTab){
    let link = document.querySelector(`[href="${activeTab}"]`)
    let selected_tab = new bootstrap.Tab(link)
    selected_tab.show()
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
    console.log( document.querySelector(id))
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




let party_data = ["Xochi", "Sam", "Sheridan", "Harold", "Yuzuru", "Tobi"]

let tamer_data = [
{"Name": "Xochi", "Partner": ["Bacomon", "Eyesmon", "Ginkakumon"]}
]