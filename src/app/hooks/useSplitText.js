import { useLayoutEffect, useState } from 'react';

function useSplitText(texts, type = 'char') {
  const [letters, setLetters] = useState([]);

  const runSplit = () => {
    if (type === 'char') {
      // Split into characters
      const chars = texts.split(' ').flatMap((word, wi, arr) => {
        const charObjs = word.split('').map((char, ci) => ({
          char,
          key: `${wi}-${ci}`,
        }));

        // Add space between words except the last word
        if (wi < arr.length - 1) {
          charObjs.push({ char: '\u00A0', key: `${wi}-space` });
        }

        return charObjs;
      });

      setLetters(chars);
    } else if (type === 'word') {
      // Split into words
      const words = texts.split(' ').flatMap((word, wi, arr) => {
        const wordObj = { char: word, key: `word-${wi}` };

        // Add space between words except the last word
        if (wi < arr.length - 1) {
          return [wordObj, { char: '\u00A0', key: `word-${wi}-space` }];
        }

        return [wordObj];
      });

      setLetters(words);
    }
  };

  useLayoutEffect(() => {
    runSplit();
  }, [texts, type]);

  return { letters };
}

export default useSplitText;
