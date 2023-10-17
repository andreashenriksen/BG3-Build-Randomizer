import { BG3Classes } from './BG3Classes';

interface ClassLevels {
    [key: string]: number[];
}

const MAX_LEVEL = 12;
const CLASS_LEVELS: ClassLevels = {
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

export class BuildRoulette {
    numClasses: number;
    selectedClasses: string[];
    selectedRace: string;
    BG3Classes: BG3Classes;

    constructor(numClasses: number) {
        this.numClasses = numClasses;
        this.selectedClasses = [];
        this.selectedRace = "";
        this.BG3Classes = new BG3Classes();
    }

    getSelectedClasses(): string[] {
        return this.selectedClasses;
    }

    addClass(new_class: string): void {
        this.selectedClasses.push(new_class);
    }

    chooseClasses(): void {
        // Roll classes randomly from the list of all classes
        for (let i = 0; i < this.numClasses; i++) {
            let index = Math.floor(Math.random() * this.BG3Classes.getClassesLength());
            while (this.selectedClasses.includes(this.BG3Classes.getClasses()[index])) {
                index = Math.floor(Math.random() * this.BG3Classes.getClassesLength());
            }
            this.addClass(this.BG3Classes.getClasses()[index]);
        }
    }

    resetClassLevels(): void {
        // Reset CLASS_LEVELS object
        this.BG3Classes.getClasses().forEach((key) => {
            CLASS_LEVELS[key][0] = 0;
        });
    }

    distributeLevels(): void {
        // Distribute levels randomly among classes (summing to MAX_LEVEL)
        this.resetClassLevels();
        let remainingLevels = MAX_LEVEL
    
        // Give each class 1 level to start with
        this.selectedClasses.forEach((value: string) => {
            CLASS_LEVELS[value][0] += 1;
            remainingLevels--;
        })
    
        // Distribute remaining levels randomly among classes
        while (remainingLevels > 0) {
            // Choose a random number of levels to add to a random class
            const randomClassIndex = Math.floor(Math.random() * this.numClasses);
            const randomClass = this.selectedClasses[randomClassIndex];
            const numLevels = Math.floor(Math.random() * remainingLevels) + 1;

            // Add the levels to the class
            CLASS_LEVELS[randomClass][0] += numLevels;
            remainingLevels -= numLevels;
        }

        // Add the levels from CLASS_LEVELS to this.classes
        this.selectedClasses.forEach((value: string) => {
            const numLevels = CLASS_LEVELS[value][0];
            const index = this.selectedClasses.indexOf(value);
            if (CLASS_LEVELS[value][0] >= CLASS_LEVELS[value][1]) {
                const subClassIndex = Math.floor(Math.random() * this.BG3Classes.getSubClassesLength(value));
                this.selectedClasses[this.selectedClasses.indexOf(value)] += " (" + this.BG3Classes.getSubClasses(value)[subClassIndex] + ")";
            }
            this.selectedClasses[index] += ": " + numLevels.toString();            
        })
    }

    chooseRace(): void {
        // Choose a random race from the list of race and subraces
        this.selectedRace = "";
        let index = Math.floor(Math.random() * this.BG3Classes.getRacesLength());
        const chosenRace = this.BG3Classes.getRaces()[index];

        const numSubRaces = this.BG3Classes.getSubRacesLength(chosenRace);
        index = Math.floor(Math.random() * numSubRaces);
        this.selectedRace = this.BG3Classes.getSubRaces(chosenRace)[index];
    }

    getRace(): string {
        return this.selectedRace;
    }



    roll(): void {
        this.chooseRace();
        this.chooseClasses();
        this.distributeLevels();
    }
}
