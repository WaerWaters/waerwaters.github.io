let address = document.getElementById("address")
let completeAmount = document.getElementById("complete_amount")

address.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.getElementById("btn").click();
    }
});

traitBonuses = {
    "Body": {
        "standard": 0,
        "brown": 1,
        "black": 1,
        "moss": 4,
        "bronze": 2,
        "silver": 3,
        "gold": 10,
        "ice": 4,
        "marble": 4,
        "galaxy": 15
    },
    "Eyes": {
        "none": 0,
        "blood": 5,
        "normal eyes": 1,
        "diamond eyes": 2,
        "lava eyes": 8,
        "Monocle": 2,
        "rope": 8,
        "xx eyes": 2,
        "stoned eyes": 2,
        "white shiny eyes": 2,
        "blood bandid": 10,
        "godly eyes": 9,
        "cardano eyes": 1,
        "evil eyes": 2,
        "fire eyes": 2,
        "gold lava eyes": 11,
        "brown eyes": 2
    },
    "Mouth": {
        "normal": 0,
        "smize": 2,
        "angry": 3,
        " joint": 4,
        "vampire": 9,
        "sewed up": 4,
        "vampire tongue": 10
    },
    "Earring": {
        "none": 0,
        "golden earcuff": 5,
        "cardano earring": 3,
        "moai earring": 4,
        "blood scratches": 2,
        "feather earring": 3
    },
    "Clothes": {
        "none": 0,
        "hawaii blouse": 1,
        "pirate blouse": 2,
        "traditional rapa nui": 4,
        "leaves": 4,
        "angel rope": 10,
        "cardano shirt": 3,
        "petroglyphs move moai": 3,
        "petroglyphs birdman": 2,
        "caveman": 3,
        "food offers": 4,
        "native shirt": 3,
        "monk dress": 3,
        "stone age shirt": 2,
        "petroglyphs rapa nui": 3,
        "cape": 7,
        "snakes": 10
    },
    "Head accessoires": {
        "none": 0,
        "crown": 4,
        "bandana blood": 2,
        "spiked crown": 1,
        "hawaii flowers": 1,
        "native hat": 1,
        "horns": 6,
        "floating crown": 5,
        "pukao": 1,
        "feather hat": 1,
        "birds nest": 1
    },
    "Back accessoires": {
        "none": 0,
        "angel wings": 10,
        "surfboard bird": 7,
        "devil wings": 10,
        "spear": 2,
        "spears crossed": 2,
        "bloody sword": 2,
        "round shield": 2,
        "canoe": 4,
        "paddle": 1
    },
    "Accessoires": {
        "none": 0,
        "cardano chain": 1,
        "leaves": 2,
        "shovel necklace": 2,
        "shark teeth necklace": 2,
        "moai necklace": 2,
        "bone necklace nose ring": 2,
        "barbed wire": 2,
        "diamond necklace": 2,
        "parrot": 5,
        "hawk": 7,
        "salamander": 3,
        "rope around neck": 4,
        "sundial": 2,
        "monkey": 10,
        "paddle necklace": 2
    },
    "Tribes": {
        "cora": 10,
        "cook": 0,
        "easter": 0,
        "palm": 0,
        "bird": 0
    },
    "Floating accessoires": {
        "none": 0,
        "cardano halo ring": 30,
        "ring of fire": 30
    }
}

async function calculate() {
    

    let stakeAddress
    await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/addresses/${address.value}`, {
        headers: {
            'project_id': 'mainnetymMePMQFraXEvwwLOZzCKuFpV971eEJ9'
        }
    })
    .then( res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error("Something went wrong");
    })
    .then( data => {
        document.getElementById("loading").style.visibility = "visible"
        document.getElementById("complete_amount").innerHTML = "Searching address"
        stakeAddress = data.stake_address
    })
    .catch( error => {
        document.getElementById("complete_amount").innerHTML = "Not an address, please paste an address"
        console.log(error)
    })

    let policies
    await fetch('https://labs-api.mutant-nft.com/stakes/assets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'stakeAddress': `${stakeAddress}`
        })
    })
    .then( res => res.json() )
    .then( data => policies = data[0].assetsPerPolicy );
    
    let moaiAssociation = "66ffb6f177f1ed667fc5483615d86f2e11270e80473ee0a00e4c9931"
    let moaiFirstClassBoatTickets = "2dc673790c60ebe51294f8d8c42556ebb419cc54668d910bb385216d"
    let moaiAbduction = "31b6bc76b386f81b70914c5b2f6938e85c172a61b7f50644cb0a1666"
    let moaiPolicies = [moaiAssociation, moaiFirstClassBoatTickets, moaiAbduction]
    completeAmountMoai = 0

    for (let i = 0; i < 3; i++) {
        let policyAmountMoai = 0
        let policy = policies[moaiPolicies[i]]
        for (let j = 0; j < policy.length; j++) {
            if (i == 0) {
                let metadata
                let asset = policy[j].asset
                await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/assets/${asset}`, {
                    headers: {
                        'project_id': 'mainnetymMePMQFraXEvwwLOZzCKuFpV971eEJ9'
                    }
                })
                .then( res => res.json() )
                .then( data => metadata = data.onchain_metadata);
                moai = 20
                console.log(metadata)
                for (let traitclass in traitBonuses) {
                    trait = metadata[traitclass]
                    traitclass = traitBonuses[traitclass]
                    bonus = traitclass[trait]
                    moai += bonus
                    //console.log(traitclass)
                    //console.log(trait)
                    //console.log(value)
                }

                console.log(moai)
                policyAmountMoai += moai
            } else if (i == 1) {
                policyAmountMoai += 200
            } else {
                policyAmountMoai += 100
            }
        }
        console.log(`complete amount of $moai from ${moaiPolicies[i]}: ${policyAmountMoai}`)
        completeAmountMoai += policyAmountMoai
    }
    document.getElementById("loading").style.visibility = "hidden"
    completeAmount.innerHTML = `Complete amount of $moai from all collections: ${completeAmountMoai}/day`
    console.log(`Complete amount of $moai from all collections: ${completeAmountMoai}/day`)
    console.log(address.value)


}

