

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


setup_human(human_template){
	let human_template_2 = JSON.parse(JSON.stringify(human_template))
	human_template_2.id = "3"
	human_template_2.name = "Xochitl 2"

	let response = {
	"humans": [human_template, human_template_2],
}
}


let all_digimon_forms = [
    {
        "id": 0,
        "partner_tamer_id": 2,
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
        "partner_tamer_id": 2,
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
        "partner_tamer_id": 2,
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

setup_digimon(all_digimon_forms)
