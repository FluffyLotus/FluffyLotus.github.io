// From up to down, left to right
var side8 = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 }
];

// Start at top left and go clockwise
var side8rot = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: 1, y: 0 },
    { x: 1, y: 1 },
    { x: 0, y: 1 },
    { x: -1, y: 1 },
    { x: -1, y: 0 }
];

// From up to down, left to right
var sideCross = [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 }
];

// Start at top left and go clockwise
var sideCrossRot = [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 }
];

// Represent an index of the side8 location
var side8rotPossibilities = [
    [1],  // Single dot
    [1, 5],  // Vertical
    [1, 3, 5], // |-
    [1, 3, 5, 7],  // Cross
    [0, 1, 2, 3, 4, 5, 6, 7] // All 8
]

// min (included) and max (excluded)
function getRandInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}