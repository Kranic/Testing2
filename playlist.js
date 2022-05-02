var playlist = JSON.parse(localStorage.getItem('playlist_data')).playlist

function click_edit(playlist_id){
    console.log(playlist_id)
    song = playlist.find(song => song.id == playlist_id)
    console.log(playlist.indexOf(song))

    document.querySelector("#example_video").innerHTML = ""
    document.querySelector("#example_video").appendChild(create_song_embed(song))
    document.querySelector("#Edit_Song_Name").value = song.Name
    document.querySelector("#Edit_Song_Link").value = song.Link
    document.querySelector("#Edit_Song_Character_old").value =  song.Character_old
    document.querySelector("#Edit_Song_Character").value = song.Character
    document.querySelector("#Edit_Song_Tags").value = song.Tags
    document.querySelector("#Edit_Song_Source").value = song.Source
    document.querySelector("#edit_save_button").setAttribute("onClick", `save_changes(event, ${playlist.indexOf(song)+2})`)
}

function save_changes(event, index_id){
    
    event.preventDefault();

    let body = {
        "Name": document.querySelector('#Edit_Song_Name').value,
        "Link": document.querySelector("#Edit_Song_Link").value,
        "Character_old": document.querySelector("#Edit_Song_Character_old").value,
        "Character": document.querySelector("#Edit_Song_Character").value,
        "Tags": document.querySelector("#Edit_Song_Tags").value,
        "Source": document.querySelector("#Edit_Song_Source").value
        }


    

    Object.keys(body).forEach(function(k){
    console.log(body[k])
    playlist[index_id][k] = body[k]
});

    updated_song = create_song_a(playlist[index_id])
    old_song = document.querySelector(`#song-${playlist[index_id-2]["id"]}`)

    console.log(document.querySelector("#playlist-list"))
    old_song.replaceWith(updated_song)



    fetch(
        `https://api.sheetson.com/v2/sheets/playlist/${index_id}`,
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${api_key}`,
                "X-Spreadsheet-Id": spreadsheet_id,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)})
            .then(r => console.log(r))

    document.querySelector("#example_video").innerHTML = ""
    var myModalEl = document.getElementById('edit_song_modal')
    var modal = bootstrap.Modal.getInstance(myModalEl).hide()
}

//Need to add validation
function add_song(event){
    console.log(event)
    event.preventDefault();
    fetch(
        `https://api.sheetson.com/v2/sheets/playlist/`,
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${api_key}`,
                "X-Spreadsheet-Id": spreadsheet_id,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {"Name" : document.querySelector('#Song_Name').value,
                "Link": document.querySelector("#Song_Link").value,
                "Character_old": document.querySelector("#Song_Character_old").value,
                "Character": document.querySelector("#Song_Character").value,
                "Tags": document.querySelector("#Song_Tags").value,
                "Source": document.querySelector("#Song_Source").value
            })})
            .then(r => console.log(r))
}

function setup_playlist(tamers, digimon_list){

Promise.all([
  fetch(`https://api.sheetson.com/v2/sheets/playlist?limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/playlist?skip=100&limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
  fetch(`https://api.sheetson.com/v2/sheets/playlist?skip=200&limit=100`,
    {headers: {
    "Authorization": `Bearer ${api_key}`,
    "X-Spreadsheet-Id": spreadsheet_id
  }}).then(r => r.json()),
])
.then(([playlist_1, playlist_2, playlist_3]) => {
    return {
        "playlist_1": playlist_1.results,
        "playlist_2": playlist_2.results,
        "playlist_3": playlist_3.results,

    }
})
.then(result => {if (result.playlist_1 != undefined) {save_playlist([result, tamers, digimon_list])} else {save_playlist([undefined, tamers, digimon_list])}})
.catch((err) => {console.log(err)
});
}

function save_playlist([result, tamers, digimon_list]){
    if(result!=undefined){
        playlist = result.playlist_1.concat(result.playlist_2, result.playlist_3)
        localStorage.setItem( 'playlist_data', JSON.stringify(playlist))
    }
    
    setup_music_tab(tamers, digimon_list)

}

function create_song_a(x){
var song = document.createElement('a')
            song.setAttribute('id', `song-${x.id}`)
            song.setAttribute('class', 'list-group-item list-group-item-action overflow-auto')
            song.setAttribute('style', `display: inline-flex; justify-content: flex-end`)

            var text = document.createElement('div')
            text.setAttribute("style", "margin-right: auto;")
            text.setAttribute('onclick', `update_embed(${x.id})`)

            var footer = document.createElement('footer')
            footer.setAttribute('class', "blockquote-footer")
            text.textContent = `${x.Name} | ${x.Character_old} ${x.Tags}`
            song.appendChild(text)

            for(num in tamers){
                tamer = tamers[num]
                try{
                if(x.Character_old.includes(tamer.sheet_name)){
                   var img = document.createElement('img')
                   img.setAttribute("class", "rounded-circle icon")
                   img.setAttribute("style", "height:40px; width:40px;")
                   img.setAttribute("src", tamer.image_url) 
            
                   song.append(img)
                   }
               }
               catch(err){console.log(err)}

            }

            text.appendChild(footer)


                 for (num in all_digimon_forms){
            
                   digimon = all_digimon_forms[num]
            
            
                   if(x.Character_old.includes(digimon.name)){
                   var img = document.createElement('img')
                   img.setAttribute("class", "rounded-circle icon ")
                   img.setAttribute("style", "height:40px; width:40px;")
                   img.setAttribute("src", digimon.image_url)
            
                   song.append(img)
                   }
                 }

            let button = document.createElement('button')
            button.style = "width:10%;"
            button.class = "modal fade"
            button.setAttribute("type", "submit")
            button.setAttribute("data-bs-toggle", "modal")
            button.setAttribute("data-bs-target", "#edit_song_modal")
            button.setAttribute('onclick', `click_edit(${x.id})`)
            button.innerHTML = "Edit"


            song.appendChild(button)

            return song
}

function setup_music_tab(tamers, digimon_list){
        var parent_container = document.querySelector("#Playlist-Container")
        var clone = document.querySelector("#playlist-template").cloneNode(true)
        var playlist_tab = clone.content.querySelectorAll("div")[0]
        parent_container.appendChild(playlist_tab)

        var song_embed = playlist_tab.querySelector("#song_embed")

        

        playlist.forEach(x => {
            song = create_song_a(x)
            document.querySelector("#playlist-list").appendChild(song)
        })
}

        



        //Filterable list
        

        function update_embed(id){
            console.log(id)
            var song = playlist.find(x => x.id == id)
            console.log(song)
            document.querySelector("#currently_playing").innerHTML = ''
            document.querySelector("#currently_playing").appendChild(create_song_embed(song))
        }

        function search_filter(input_id, list_id) {

        // Declare variables
        var input, filter, list, item, a, i, txtValue;
            input = document.getElementById(input_id);
            filter = input.value.toLowerCase();
            list = document.getElementById(list_id);
            console.log(list_id)
            item = list.getElementsByTagName('a');

            // Loop through all itemst items, and hide those who don't match the search query
            for (i = 0; i < item.length; i++) {
                a = item[i].getElementsByTagName("a")[0];
                txtValue = item[i].textContent || item[i].innerText;
                if (txtValue.toLowerCase().indexOf(filter) > -1) {
                    item[i].classList.remove("d-none")
                } else {
                    item[i].classList.add("d-none")
                }
            }
        }


        function clear_currently_playing(){
            document.querySelector("#currently_playing").innerHTML = ''
        }

        //song embed
        function create_song_embed (song){
            console.log(song)
            var song_div = document.createElement('div')
            song_div.setAttribute('class', '')
            song_div.setAttribute('style', 'pointer-events:auto; width: 80%;justify-content: center;padding:20px;')

            var parent_div = document.createElement('div')

            var description = document.createElement('div')
            //        description.setAttribute('class', 'col-8')
            description.innerHTML = `<a href=${song.Link}>${song.Name}</a>`
            song_div.appendChild(description)

            //        var close_button = document.createElement('div')
            //        close_button.setAttribute('class', 'close col ms-auto text-right')
            //        close_button.setAttribute('onClick', 'clear_currently_playing()')
            //        close_button.innerHTML = "<span>&times;</span>"
            //        song_div.appendChild(close_button)

            if(song.Link.includes("youtube")){
                song.Link = song.Link.replace("watch?v=", "embed/")
                song_div.innerHTML += `<iframe width="100%" height="500vh" src="${song.Link+"?autoplay=1"}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            }

            else if(song.Link.includes("youtu.be")){
                song.Link = song.Link.replace("youtu.be", "youtube.com/embed")
                song_div.innerHTML += `<iframe width="100%" height=500vh" src="${song.Link+"?autoplay=1"}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            }

            else if(song.Link.includes("spotify")){
                song.Link = song.Link.replace("/track", "/embed/track")
                song_div.innerHTML += `<iframe width="100%" height=500vh" src="${song.Link}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
            }

            else {
                song_div.innerHTML +=   `<iframe width="100%" height="500vh" frameborder="0" allow="autoplay" src="${song.Link}"> </iframe>`
            }




            return song_div
        }
