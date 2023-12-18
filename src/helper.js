export function checkPasswordStrength(password) {
  let isStrongAlready = isStrongPassword(password);
  if (isStrongAlready) return 0;

  let steps = 0;

  const stepsToAchieveRequiredDiversityInCharacters =
    countMissingTypes(password);

  const stepsToRemoveRepeats = countRepeatingSequence(password);
  console.log(" stromng" + stepsToRemoveRepeats);

  steps += Math.max(
    stepsToAchieveRequiredDiversityInCharacters,
    stepsToRemoveRepeats
  );

  return steps + countStepsToBringWithinRange(password);
}

function countStepsToBringWithinRange(password) {
  let steps = 0;

  // should be minimum 6 characters
  steps += Math.max(0, 6 - password.length);

  // Reduce length to 20 if it exceeds
  if (password.length > 20) {
    steps += password.length - 20;
  }

  return steps;
}

// check if password is strong
function isStrongPassword(password) {
  console.log(password);
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasRepeatingChars = /(.)\1\1/.test(password);
  return (
    password.length >= 6 &&
    password.length <= 20 &&
    hasLower &&
    hasUpper &&
    hasDigit &&
    !hasRepeatingChars
  );
}

// count unallowed repeats
function countRepeatingSequence(password) {
  console.log("entering loop");
  let repeats = 0;
  let i = 0;
  while (i < password.length) {
    let j = i;
    while (j < password.length) {
      if (password[j] === password[i]) {
        j++;
      } else {
        break;
      }
    }
    if (j - i >= 3) {
      repeats += Math.floor((j - i) / 3);
    }
    i = j;
  }
  console.log("exiting loop");
  return repeats;
}

// count missing character types
function countMissingTypes(password) {
  console.log("here i m");
  let missingTypes = 0;

  if (!/[a-z]/.test(password)) {
    missingTypes++;
  }

  if (!/[A-Z]/.test(password)) {
    missingTypes++;
  }

  if (!/\d/.test(password)) {
    missingTypes++;
  }

  return missingTypes;
}
