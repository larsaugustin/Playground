# Syntax

This project uses a LISP dialect. In addition to the basic syntax described here, functions in the [standard library](Standard_Library.md) as well as in the [graphics library](Graphics_Library.md) are available.

## Functions

Functions can be defined with the `def` function. The declaration of a function includes its name and the function body.

<pre>(def **NAME** **BODY**)</pre>

To call a function, use the `call` function with the name of the function along with arguments passed to the function. The arguments will be available as variables named with a dollar sign and the index of the argument (`$0`, `$1`, `$2`, …).

<pre>(run **NAME** **ARGUMENTS**)</pre>

## Variables

Variables can be declared and modified with the `set` function. It takes the name for the variable as well as a value as arguments.

<pre>(set **NAME** **VALUE**)</pre>

The values of variables can be retrieved with the `get` function. Unlike most other programming languages, you can’t directly get the value of a variable. The function returns the value of the variable if it’s declared, otherwise it returns a null value.

<pre>(get **NAME**) → **VALUE**</pre>

## Conditions

A function can be called conditionally with the `if` function.

<pre>(if **BOOL** **BODY**)</pre>

Alternatively, you can use the `ife` function, which conditionally returns a value depending on if the condition is met. Use this function only for conditionally getting a value, not for calling a certain function.

<pre>(ife **BOOL** **BODY** **BODY**) → **VALUE**</pre>

### True & False

Unlike most other languages, `TRUE`and `FALSE` aren’t names, but constants which are always available. To get the `TRUE`- or `FALSE`-value, use the `get` function along with `@T` or `@F`. As these constants are pre-defined, they are prefixed with `@`.

<pre>
(get @T)
(get @F)
</pre>

## Repetition

For repetition, use the `rep`-function. It takes the number of repetitions as an argument, as well as the action to execute.

<pre>(rep **INT** **BODY**)</pre>

The current iteration is passed to the body as a constant named `$`. This is distinct from function arguments, which start at `$0`.

<pre>
(rep 7
  (log **$**)
)
</pre>

## Comments

Comments are prefixed with a semicolon `;`.

<pre>(**BODY**) *; this is a comment*</pre>
