export type ServerResponse = {
    code: number;
    data: {
        content: string;
        wordLength: number;
    };
};

/** Mock representation of a REST service */
export const fetchRandomWord = (length = 5): Promise<ServerResponse> => {
    return new Promise<ServerResponse>((resolve, reject) => {
        setTimeout(() => {
            // Simulate random server error
            if (randomInt(1, 5) === 5) {
                reject("500:Random Server Error");
                return;
            }

            if (!Object.keys(WORD_BANK).includes(`${length}`)) {
                reject("400:Provided word length not supported");
                return;
            }

            const randomWordIndex = randomInt(0, WORD_BANK[length].length - 1);
            const randomWord: string = WORD_BANK[length][randomWordIndex];

            resolve({
                code: 200,
                data: {
                    content: randomWord,
                    wordLength: length,
                },
            });
        }, 2000);
    });
};

/** Returns random number between min & max */
const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const WORD_BANK = {
    4: [
        "ache", "back", "bulk", "clip", "coin", "door", "dunk", "echo", "fake", "gain",
        "home", "land", "leaf", "left", "stow", "swap", "wine", "word", "zone", "zoom"
    ],
    5: [
        "apple", "beach", "brave", "candy", "chess", "dance", "earth", "flame", "grape", "happy",
        "house", "jolly", "karma", "light", "music", "novel", "ocean", "piano", "quilt", "rival",
        "sugar", "tiger", "unity", "vivid", "watch", "xenon", "young", "zebra", "after", "place",
        "water", "where", "think", "three", "years", "sound", "great", "again", "still", "every",
        "small", "found", "those", "never", "under", "might", "while", "brisk", "charm", "dough",
        "eager", "frown", "glide", "honor", "ideal", "joker", "knock", "lunar", "mirth", "noble",
        "oasis", "prism", "quark", "ranch", "sable", "trust", "umbra", "vortex", "whale", "yield",
        "arrow", "baker", "chalk", "dream", "eagle", "frost", "glove", "humor", "ivory", "jolly",
        "kneel", "latch", "mango", "north", "olive", "pearl", "quick", "rider", "shiny", "torch",
        "umbra", "vivid", "waltz", "xylor", "yacht", "zesty", "blaze", "chime", "drown", "exert",
        "frank", "grasp", "hover", "inbox", "jumbo", "knave", "lumen", "mirth", "nudge", "orbit",
        "pluck", "quirk", "rover", "steep", "truce", "usher", "verge", "wrist", "xenon", "youth"
    ],
    6: [
        "airbag", "latest", "matrix", "denial", "ransom", "tactic", "exotic", "zapped", "dancer", "theory",
        "omelet", "helper", "taxman", "lawman", "maggot", "reggae", "pelvis", "wishes", "outrun", "mesels"
    ],
};
