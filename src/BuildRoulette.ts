interface Classes {
    [key: string]: number[]; // [current level, max level]
}

interface SubClasses {
    [key: string]: string[]; 
}

interface Races {
    [key: string]: string[];
}

const MAX_LEVEL = 12;
const ALL_CLASSES: Classes = {
    Barbarian: [0, 3],
    Bard: [0, 3],
    Cleric: [0, 1],
    Druid: [0, 2],
    Fighter: [0, 3],
    Monk: [0, 3],
    Paladin: [0, 1],
    Ranger: [0, 3],
    Rogue: [0, 3],
    Sorcerer: [0, 1],
    Warlock: [0, 1],
    Wizard: [0, 2]
}
const SUB_CLASSES: SubClasses = {
    Barbarian: ["Berserker", "Wildheart", "Wild Magic"],
    Bard: ["College of Lore", "College of Valor", "College of Swords"],
    Cleric: ["Life", "Light", "Trickery", "Knowledge", "Nature", "Tempest", "War"],
    Druid: ["Circle of the Land", "Circle of the Moon", "Circle of the Spores"],
    Fighter: ["Battle Master", "Eldritch Knight", "Champion"],
    Monk: ["Way of the Four Elements", "Way of the Open Hand", "Way of Shadow"],
    Paladin: ["Oath of the Ancients", "Oath of Devotion ", "Oath of Vengeance"],
    Ranger: ["Hunter", "Beast Master", "Gloom Stalker"],
    Rogue: ["Arcane Trickster", "Thief", "Assassin"],
    Sorcerer: ["Wild Magic", "Draconic Bloodline", "Storm Sorcery"],
    Warlock: ["The Fiend", "The Great Old One", "The Archfey"],
    Wizard: ["Abjuration School", "Conjuration School", "Divination School", "Enchantment School", "Evocation School", 
    "Illusion School", "Necromancy School", "Transmutation School"]
}

const ALL_RACES: Races = {
    Human: ["Human"],
    Elf: ["High Elf", "Wood Elf"],
    Drow: ["Lolth-Sworn Drow", "Seldarine Drow"],
    HalfElf: ["High Half-Elf", "Wood Half-Elf", "Drow Half-Elf"],
    HalfOrc: ["Half-Orc"],
    Halfling: ["Lightfoot Halfling", "Strongheart Halfling"],
    Dwarf: ["Gold Dwarf", "Shield Dwarf", "Duergar"],
    Gnome: ["Forest Gnome", "Deep Gnome", "Rock Gnome"],
    Tiefling: ["Asmodeus Tiefling", "Mephistopheles Tiefling", "Zariel Tiefling"],
    Githyanki: ["Githyanki"],
    Dragonborn: ["Black Dragonborn", "Blue Dragonborn", "Brass Dragonborn", "Bronze Dragonborn", "Copper Dragonborn", 
    "Gold Dragonborn", "Green Dragonborn", "Red Dragonborn", "Silver Dragonborn", "White Dragonborn"]
}


export class BuildRoulette {
    numClasses: number;
    classes: string[];
    race: string;

    constructor(numClasses: number) {
        this.numClasses = numClasses;
        this.classes = [];
        this.race = "";
    }

    getClasses(): string[] {
        return this.classes;
    }

    addClass(new_class: string): void {
        this.classes.push(new_class);
    }

    chooseClasses(): void {
        // Roll classes randomly from the list of all classes
        for (let i = 0; i < this.numClasses; i++) {
            let index = Math.floor(Math.random() * Object.keys(ALL_CLASSES).length);
            while (this.classes.includes(Object.keys(ALL_CLASSES)[index])) {
                index = Math.floor(Math.random() * Object.keys(ALL_CLASSES).length);
            }
            this.addClass(Object.keys(ALL_CLASSES)[index]);
        }
    }

    resetClassLevels(): void {
        // Reset ALL_CLASSES object
        Object.keys(ALL_CLASSES).forEach((key) => {
            ALL_CLASSES[key][0] = 0;
        });
    }

    distributeLevels(): void {
        // Distribute levels randomly among classes (summing to MAX_LEVEL)
        this.resetClassLevels();
        let remainingLevels = MAX_LEVEL
    
        // Give each class 1 level to start with
        this.classes.forEach((value: string) => {
            ALL_CLASSES[value][0] += 1;
            remainingLevels--;
        })
    
        // Distribute remaining levels randomly among classes
        while (remainingLevels > 0) {
            // Choose a random number of levels to add to a random class
            const randomClassIndex = Math.floor(Math.random() * this.numClasses);
            const randomClass = this.classes[randomClassIndex];
            const numLevels = Math.floor(Math.random() * remainingLevels) + 1;

            // Add the levels to the class
            ALL_CLASSES[randomClass][0] += numLevels;
            remainingLevels -= numLevels;
        }

        // Add the levels from ALL_CLASSES to this.classes
        this.classes.forEach((value: string) => {
            const numLevels = ALL_CLASSES[value][0];
            const index = this.classes.indexOf(value);
            if (ALL_CLASSES[value][0] >= ALL_CLASSES[value][1]) {
                const subClassIndex = Math.floor(Math.random() * SUB_CLASSES[value].length);
                this.classes[this.classes.indexOf(value)] += " (" + SUB_CLASSES[value][subClassIndex] + ")";
            }
            this.classes[index] += ": " + numLevels.toString();            
        })
    }

    chooseRace(): void {
        // Choose a random race from the list of race and subraces
        this.race = "";
        let index = Math.floor(Math.random() * Object.keys(ALL_RACES).length);
        const chosenRace = Object.keys(ALL_RACES)[index];

        const numSubRaces = ALL_RACES[chosenRace].length;
        index = Math.floor(Math.random() * numSubRaces);
        this.race = ALL_RACES[chosenRace][index];
    }

    getRace(): string {
        return this.race;
    }



    roll(): void {
        this.chooseRace();
        this.chooseClasses();
        this.distributeLevels();
    }
}
