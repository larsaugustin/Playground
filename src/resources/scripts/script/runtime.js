// Script Runtime

function run(input, c, v, f) {
  if (Array.isArray(input)) {
    for (i in input) {
      run(input[i], c, v, f);
    }
  } else {
    var args = [];
    if (input.value == undefined) {
      return;
    } else if (input.value.length == 0) {
      return;
    } else if (input.value[0].value == "def") {
      const variableName = input.value[1].value;
      f[variableName] = input.value[2].value;
    } else if (input.value[0].value == "if") {
      if (run(input.value[1], c, v, f)) {
        run(input.value[2], c, v, f);
      }
    } else if (input.value[0].value == "rep") {
      for (var i = 0; i < input.value[1].value; i++) {
        run(input.value[2], i, v, f);
      }
      return;
    } else {
      for (a in input.value) {
        var argument = input.value[a];
        if (argument.type == "function") {
          args.push(run(argument, c, v, f));
        } else {
          if (argument.value == "$") {
            args.push(c);
          } else {
            args.push(argument.value);
          }
        }
      }
      const functionName = args[0];
      args.shift();
      return runFunction(functionName, args, c, v, f);
    }
  }
}

// Editor Integration

function runText() {
  runtimeConsole = "";
  file.operations = [];
  var variableStack = {
    "@T": true,
    "@F": false,
    "@PI": Math.PI,
    "@TINTCOLOR": tintColor,
    "@TEXTCOLOR": "#FFFFFF",
  };
  var functionStack = {};
  const text = document.getElementById("main-textarea").value;
  run(parse(text), "null", variableStack, functionStack);
  draw();
}

function clearConsole() {
  runtimeConsole = "";
  draw();
}

runText();
