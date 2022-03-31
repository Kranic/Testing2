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