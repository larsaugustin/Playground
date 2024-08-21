// Libraries

function runFunction(name, args, c, v, f) {
  if (name == "seq") {
    return 0;
  } else if (name == "run") {
    return stdRun(args, c, v, f);
  } else if (name == "set") {
    return stdSet(args, v);
  } else if (name == "get") {
    return stdGet(args, v);
  } else if (name == "l") {
    return stdPrint(args);
  } else if (name == "not") {
    return stdNot(args);
  } else if (name == "and") {
    return stdAnd(args);
  } else if (name == "or") {
    return stdOr(args);
  } else if (name == "ife") {
    return stdIfElse(args);
  } else if (name == "eql") {
    return stdEqual(args);
  } else if (name == "sml") {
    return stdSmaller(args);
  } else if (name == "big") {
    return stdBigger(args);
  } else if (name == "add") {
    return stdAdd(args);
  } else if (name == "sub") {
    return stdSub(args);
  } else if (name == "mul") {
    return stdMul(args);
  } else if (name == "div") {
    return stdDiv(args);
  } else if (name == "pow") {
    return stdPow(args);
  } else if (name == "log") {
    return stdLog(args);
  } else if (name == "sqr") {
    return stdSqr(args);
  } else if (name == "sqt") {
    return stdSqt(args);
  } else if (name == "mod") {
    return stdMod(args);
  } else if (name == "sin") {
    return stdSin(args);
  } else if (name == "size") {
    return stdResize(args);
  } else if (name == "fill") {
    return stdFill(args);
  } else if (name == "stroke") {
    return stdStroke(args);
  } else if (name == "rect") {
    return stdRect(args);
  } else if (name == "circ") {
    return stdCircle(args);
  } else if (name == "text") {
    return stdText(args);
  } else {
    return 0;
  }
}

// Standard Library

function stdRun(args, c, v, f) {
  if (typeof f[args[0]] === "undefined") {
    return 0;
  } else {
    const functionCall = f[args[0]];
    args.shift();
    for (var a = 0; a < args.length; a++) {
      v["$" + a] = args[a];
    }
    run({ type: "function", value: functionCall }, c, v, f);
  }
}

function stdSet(args, v) {
  v[args[0]] = args[1];
  return v[1];
}

function stdGet(args, v) {
  if (typeof v[args[0]] === "undefined") {
    return 0;
  } else {
    return v[args[0]];
  }
}

function stdPrint(args) {
  for (a in args) {
    runtimeConsole += args[a] + "\n";
  }
  return 0;
}

function stdNot(args) {
  return !args[0];
}

function stdAnd(args) {
  return args[0] && args[1];
}

function stdOr(args) {
  return args[0] || args[1];
}

function stdIfElse(args) {
  if (args[0]) {
    return args[1];
  } else {
    return args[2];
  }
}

function stdSmaller(args) {
  return args[0] < args[1];
}

function stdEqual(args) {
  return args[0] == args[1];
}

function stdBigger(args) {
  return args[0] > args[1];
}

function stdAdd(args) {
  var finalValue = 0;
  if (typeof args[0] == "string") {
    finalValue = args[0];
  }
  for (a in args) {
    finalValue += args[a];
  }
  return finalValue;
}

function stdSub(args) {
  var finalValue = args[0];
  args.shift();
  for (a in args) {
    finalValue -= args[a];
  }
  return finalValue;
}

function stdMul(args) {
  var finalValue = 1;
  for (a in args) {
    finalValue *= args[a];
  }
  return finalValue;
}

function stdDiv(args) {
  var finalValue = args[0];
  args.shift();
  for (a in args) {
    finalValue /= args[a];
  }
  return finalValue;
}

function stdPow(args) {
  return Math.pow(args[0], args[1]);
}

function stdLog(args) {
  return Math.log(args[0]) / Math.log(args[1]);
}

function stdSqr(args) {
  return args[0] * args[0];
}

function stdSqt(args) {
  return Math.sqrt(args[0]);
}

function stdMod(args) {
  return args[0] % args[1];
}

function stdSin(args) {
  return Math.sin(args[0]);
}

// Graphic Library

function stdResize(args) {
  file.width = args[0];
  file.height = args[1];
  return 0;
}

function stdFill(args) {
  file.operations.push({
    type: "fill",
    color: args[0],
    path: args[1],
  });
}

function stdStroke(args) {
  file.operations.push({
    type: "stroke",
    width: args[0],
    color: args[1],
    path: args[2],
  });
}

function stdRect(args) {
  return {
    type: "rect",
    x: args[0],
    y: args[1],
    w: args[2],
    h: args[3],
  };
}

function stdCircle(args) {
  return {
    type: "circle",
    x: args[0],
    y: args[1],
    r: args[2],
  };
}

function stdText(args) {
  return {
    type: "text",
    t: args[0],
    x: args[1],
    y: args[2],
    s: args[3],
  };
}
