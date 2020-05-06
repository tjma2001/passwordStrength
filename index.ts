export const passwordStrength = (props: { password }): number => {
  const { password: p } = props;
  const sequentialLetters = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i;
  const sequentialNumbers = /(?:123|234|345|456|567|678|789|890)/i;
  // eslint-disable-next-line no-useless-escape
  const sequentialSymbols = /(?:!@#|@#\$|#$%|\$\%\^|%\^&|\^&\*|&\*\(|\*\(\)|\(\)_|\)_\+)/i;

  const upperCaseLetters = p.replace(/[^A-Z]/gm, '');
  const lowerCaseLetters = p.replace(/[^a-z]/gm, '');

  const positiveScore = [
    p.length * 4, // number of characters

    /**
     * 0 ^ x converts 1 to 0 and 0 to 1
     * Here we want to only want p.length to have a value when the number of uppercase letters
     * is greater than 0
     */
    (0 ** (0 ** upperCaseLetters.length) * p.length - upperCaseLetters.length) * 2, // upper case letters
    (0 ** (0 ** lowerCaseLetters.length) * p.length - lowerCaseLetters.length) * 2, // lower case letters
    p.replace(/[^0-9]/gm, '').length * 4, // numbers
    p.replace(/[^!@#$%^&*()\-_=+:'",<.>[\]]/gm, '').length * 6, // Symbols
  ];

  const negativeScore = [
    /**
     * Here we only want p.length to have value when the number of characters found that
     * are not letters is greater than 0.
     */
    0 ** p.replace(/[a-zA-Z]/gm, '').length * p.length, // only characters
    0 ** p.replace(/[0-9]/gm, '').length * p.length, // only numbers
    Math.floor(Math.E * (p.length - p.replace(/(\w)(?=.*\1)/gm, '').length)), // repeating characters
    (p.split(/[A-Z]{2,}/gm).length - 1) * 2, // consecutive uppercase letters
    (p.split(/[a-z]{2,}/gm).length - 1) * 2, // consecutive lowercase letters
    (p.split(/[0-9]{2,}/gm).length - 1) * 2, // consecutive numbers letters
    (p.split(sequentialLetters).length - 1) * 3,
    (p.split(sequentialNumbers).length - 1) * 3,
    (p.split(sequentialSymbols).length - 1) * 3,
  ];

  return negativeScore.reduce(
    (acc, curr) => acc - curr,
    positiveScore.reduce((acc, curr) => acc + curr, 0),
  );
}
