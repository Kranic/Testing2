var playlist = JSON.parse(localStorage.getItem('character_data')).playlist

// var playlist = [
//         {
//             "id": 2,
//             "Character_old": "Team",
//             "Name": "Counterstrike",
//             "Tags": "Battle, Intense, Determined",
//             "Source": "Persona 5S",
//             "Link": "https://youtu.be/D8Nw53ytCxQ",
//             "Character": "Team"
//         }
//         ]

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



        //Filterable list
        var parent_container = document.querySelector("#Playlist-Container")
        var clone = document.querySelector("#playlist-template").cloneNode(true)
        var playlist_tab = clone.content.querySelectorAll("div")[0]
        parent_container.appendChild(playlist_tab)

        var song_embed = playlist_tab.querySelector("#song_embed")

        function update_embed(id){
            console.log(id)
            var song = playlist.find(x => x.id == id)
            console.log(song)
            document.querySelector("#currently_playing").innerHTML = ''
            document.querySelector("#currently_playing").appendChild(create_song_embed(song))
        }


        playlist.forEach(x => {
            var song = document.createElement('a')
            song.setAttribute('id', 'list-settings-list')
            song.setAttribute('class', 'list-group-item list-group-item-action overflow-auto')
            song.setAttribute('onclick', `update_embed(${x.id})`)

            var text = document.createElement('div')
            //                    text.textContent = 

            var footer = document.createElement('footer')
            footer.setAttribute('class', "blockquote-footer")
            text.textContent = `${x.Name} | ${x.Character_old} ${x.Tags}`

            song.appendChild(text)
            //                    text.appendChild(footer)

            //        for (key in global_data["Humans"]){
            //
            //        tamer = global_data["Humans"][key]
            //
            //
            //        if(x.Character.includes(tamer.Name)){
            //        var img = document.createElement('img')
            //        img.setAttribute("class", "rounded-circle icon float-right")
            //        img.setAttribute("style", "height:40px; width:40px;")
            //        img.setAttribute("src", tamer.Image)
            //
            //        song.appendChild(img)
            //        }
            //      }

            //      for (key in global_data["Digimon"]){
            //
            //        digimon = global_data["Digimon"][key]
            //
            //
            //        if(x.Character.includes(digimon.Name)){
            //        var img = document.createElement('img')
            //        img.setAttribute("class", "rounded-circle icon float-right")
            //        img.setAttribute("style", "height:40px; width:40px;")
            //        img.setAttribute("src", digimon.Image)
            //
            //        song.appendChild(img)
            //        }
            //      }



            document.querySelector("#playlist-list").appendChild(song)
        })

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
