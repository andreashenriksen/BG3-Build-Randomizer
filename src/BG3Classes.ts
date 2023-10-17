interface Classes {
    [key: string]: string[]; 
}

interface Races {
    [key: string]: string[];
}

const CLASSES: Classes = {
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

const RACES: Races = {
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

export class BG3Classes {
    allClasses: string[];
    allRaces: string[];

    constructor() {
        this.allClasses = Object.keys(CLASSES);
        this.allRaces = Object.keys(RACES);
    }

    getClasses(): string[] {
        return this.allClasses;
    }

    getClassesLength(): number {
        return this.allClasses.length;
    }

    getSubClasses(className: string): string[] {
        return CLASSES[className];
    }

    getSubClassesLength(className: string): number {
        return CLASSES[className].length;
    }

    getRaces(): string[] {
        return this.allRaces;
    }

    getRacesLength(): number {
        return this.allRaces.length;
    }

    getSubRaces(raceName: string): string[] {
        return RACES[raceName];
    }

    getSubRacesLength(raceName: string): number {
        return RACES[raceName].length;
    }
}
