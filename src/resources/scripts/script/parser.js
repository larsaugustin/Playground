// Script Parser

function parse(input) {
  var workingString = input;
  var tokens = [];
  while (workingString.length != 0) {
    workingString = workingString.trim();

    if (workingString.startsWith("(")) {
      // Function Start
      const parsed = parse(workingString.substring(1));
      tokens.push({ type: "function", value: parsed[0] });
      workingString = parsed[1];
    } else if (workingString.startsWith(")")) {
      // Function End
      return [tokens, workingString];
    } else if (workingString.startsWith(";")) {
      // Comment
      const endIndex = workingString.indexOf("\n");
      if (endIndex == -1) {
        workingString = "";
      } else {
        workingString = workingString.substring(endIndex + 1);
      }
    } else if (workingString.startsWith('"')) {
      // String
      const endIndex = workingString.substring(1).indexOf('"');
      const newString = workingString.substring(1, endIndex + 1);
      tokens.push({ type: "string", value: newString });
      workingString = workingString.substring(endIndex + 1);
    } else if (isNumber(workingString[0])) {
      // Number
      var currentIndex = 1;
      while (
        isNumber(workingString[currentIndex]) ||
        workingString[currentIndex] == "."
      ) {
        currentIndex += 1;
      }
      tokens.push({
        type: "number",
        value: parseFloat(workingString.substring(0, currentIndex)),
      });
      workingString = workingString.substring(currentIndex - 1);
    } else if (isLetter(workingString[0])) {
      // Name
      var currentIndex = 1;
      while (isLetter(workingString[currentIndex])) {
        currentIndex += 1;
      }
      tokens.push({
        type: "name",
        value: workingString.substring(0, currentIndex),
      });
      workingString = workingString.substring(currentIndex - 1);
    }

    workingString = workingString.substring(1);
  }
  return [tokens, workingString];
}

// Utilities

function isNumber(input) {
  return input >= "0" && input <= "9";
}

function isLetter(input) {
  return (
    (input >= "a" && input <= "z") ||
    (input >= "A" && input <= "Z") ||
    input == "$" ||
    input == "@"
  );
}
