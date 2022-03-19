//let response = fetch("https://api.sheety.co/844ac9dcb8bf4dae1e9fe884e803f27e/ddaPartySheetDb/humans")
let response = {
"humans": [
{
"id": 2,
"sheet": "https://docs.google.com/spreadsheets/d/1zBWe14UF89XjdDGEEByMOq9bUPpvjRdpKJBHExv42lQ/edit#gid=637703777/",
"sheetName": "Xochi",
"name": "Xochitl Vega",
"title": "Monstrous Hacker",
"image": "https://i.imgur.com/f0vkqrG.png",
"partner": "Bacomon",
"partnerId": 1,
"inspiration": 1,
"campaignLevel": "Teenager",
"rewardedXp": 20,
"age": 15,
"gender": "Female",
"height": "5'6\"",
"characterSynopsis": "Xyz is a 15 year old girl living in Southern California as a seemingly regular highschool student. An incredibly bright girl, Xyz spends most of her time online, a brilliant young hacker - either researching the most current ways of defusing the secrets of the web or stalking the internet for a subject to shitpost, it can really 50/50 with her. \n\nXyz is very level headed, especially for her age, calm and calculating, always questioning the systems that are at work around her. If you assign a task to Xyz, you can trust that it will be done, and it will be done well. She is very guarded about her personal information, usually going by an alias if ever possible (note: Xyz is an alias in itself) and tends to make subtle moves to keep her distance from people. Surprisingly Xyz can still be fairly sociable, with a dry, sassy wit when dealing with people, either endearing people to her or a building tension the girl knowingly ignores. She isn’t the usual stereotype of an introvertive hacker, though at her core that is what she is, she just knows how to play different roles and the values of being able to be more than just what you’re defined as. \n\nXyz is a teenage girl who stands at about 5'6. She has long straight hair with bangs covering her forehead. Generally on the thin side due to her mostly inactive lifestyle and youth.  She has a dark complexion with subtle freckles crossing her nose. Her ethnicity is a bit of a mystery, that even Xyz doesn’t quite know herself, though through her last name she knows she has some spanish heritage, though her look generally guides to some native and black touches. Ultimately she just thinks of herself as some flavor of afrolatino mutt. \n\nXyz is  almost always found in a bulky blue and yellow hoodie (with her signature X across the front), a red skirt, tights, and a pair of \"smart sneakers\". She has a single X shaped gold earring, that she particularly likes as well. For fun she wears yellow prescription contact, with her ordinary eye color being hazel. \n",
"majorAspect": "Prodigious Mind",
"majorDescription": "Xochi is very talented with computers, sneaking, problem solving, and general logical processing. ",
"minorAspect": "Solitary Miss",
"minorDescription": "Xochi prefers working alone and finds herself to be much more efficent in solitary settings.",
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
"accuracy": 4,
"damage": 3,
"dodgeStat": 4,
"armor": 3,
"woundBoxes": 3,
"movement": 5
}]}

console.log(response)

let tamer = response["humans"][0]

document.getElementById("tamerName").textContent = tamer.name;
document.getElementById("tamerEpitaph").textContent = tamer.title;
document.getElementById("tamerImage").src = tamer.image;
document.getElementById("characterSheetLink").href = tamer.sheet;

document.getElementById("tamerSynopsis").textContent = tamer.characterSynopsis;

document.getElementById("majorAspect").textContent = tamer.majorAspect;
document.getElementById("majorDescription").textContent = tamer.majorDescription;
document.getElementById("minorAspect").textContent = tamer.minorAspect;
document.getElementById("minorDescription").textContent = tamer.minorDescription;
