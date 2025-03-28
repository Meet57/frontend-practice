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

            const randomWordIndex = randomInt(1, 20);
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

/** Returns random number between 1 & 5 */
const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const WORD_BANK = {
    4: [
        "ache",
        "back",
        "bulk",
        "clip",
        "coin",
        "door",
        "dunk",
        "echo",
        "fake",
        "gain",
        "home",
        "land",
        "leaf",
        "left",
        "stow",
        "swap",
        "wine",
        "word",
        "zone",
        "zoom",
    ],
    5: [
        "water",
        "after",
        "where",
        "right",
        "think",
        "three",
        "years",
        "place",
        "sound",
        "great",
        "again",
        "still",
        "every",
        "small",
        "found",
        "those",
        "never",
        "under",
        "might",
        "while",
    ],
    6: [
        "airbag",
        "latest",
        "matrix",
        "denial",
        "ransom",
        "tactic",
        "exotic",
        "zapped",
        "dancer",
        "theory",
        "omelet",
        "helper",
        "taxman",
        "lawman",
        "maggot",
        "reggae",
        "pelvis",
        "wishes",
        "outrun",
        "mesels",
    ],
};
