# Graphics Library

## Canvas

<code>(size **NUMBER** **NUMBER**)</code> Set the width and height of the canvas

## Paths

- <code>(rect **NUMBER** **NUMBER** **NUMBER** **NUMBER**)</code> Create a rectangle path (x, y, width, height)
- <code>(circ **NUMBER** **NUMBER** **NUMBER** **NUMBER**)</code> Create a circle path (x, y, radius)
- <code>(text **STRING** **NUMBER** **NUMBER** **NUMBER**)</code> Create a text path (text, x, y, size)

## Operations

- <code>(fill **STRING** **PATH**)</code> Fill a path with a color, which is provided as a string
- <code>(stroke **NUMBER** **STRING** **PATH**)</code> Stroke a path with a line width and a color, which is provided as a string

## Default Values

- <code>(get **@TINTCOLOR**)</code> Returns the default tint color
- <code>(get **@TEXTCOLOR**)</code> Returns the default text color
