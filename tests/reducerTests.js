import subject from '../src/reducers/hangmanReducers';

describe('hangman reducers testing', () => {
  let state;

  beforeEach(() => {
    state = {
      // default state
      letters: {},
      gameStore: [
        [['It is the thing you might cut yourself on if you reach out to touch the world like a ball'],
          ['m', 'o', 'u', 'n', 't', 'a', 'i', 'n'],
          ['_', '_', '_', '_', '_', '_', '_', '_']],


        [["It's breezy."],
          ['f', 'l', 'i', 'g', 'h', 't', 'y'],
          ['_', '_', '_', '_', '_', '_', '_']],


        [['It hangs in the sky, before it falls, but you do not want to avoid it.'],
          ['a', 'p', 'p', 'l', 'e'],
          ['_', '_', '_', '_', '_']],
      ],
      clue: 'loading',
      answer: [],
      disp: [],
      hang: [
        "I'm having a great day and nothing can go wrong.",
        "Who? Me? I didn't do anything.",
        "Oh. What's that?",
        "Who's on trial?",
        "I'm on trial?",
        "I'm guilty?",
        "No. I don't believe it.",
        'Ahh. Help!!',
        'Glugg.',
        'The End,',
      ],
      numFailedGuesses: 0,
    };
    for (let i = 65; i < 91; i += 1) {
      state.letters[String.fromCharCode(65)] = false;
    }
  });

  describe('default/initialized state', () => {
    it('should return the default state when no arguemnts/inputs are given', () => {
      expect(subject(undefined, { type: undefined })).toEqual(state);
    });
  });
});
