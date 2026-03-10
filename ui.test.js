const test = require('node:test');
const assert = require('node:assert');

// Mock browser globals
global.window = {
    originalTexts: {},
    onload: null
};

global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {}
};

// Mock alert and document
global.alert = () => {};
global.document = {
    getElementById: () => ({ value: '', addEventListener: () => {}, classList: { add: () => {}, remove: () => {} }, style: {} }),
    querySelectorAll: () => []
};

// Now we can require the file
const { keepOnlyGreek } = require('./ui.js');

test('keepOnlyGreek - falsy inputs', () => {
    assert.strictEqual(keepOnlyGreek(null), '');
    assert.strictEqual(keepOnlyGreek(undefined), '');
    assert.strictEqual(keepOnlyGreek(''), '');
});

test('keepOnlyGreek - only Greek characters', () => {
    assert.strictEqual(keepOnlyGreek('Γιώργος'), 'Γιώργος');
    assert.strictEqual(keepOnlyGreek('ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ'), 'ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ');
    assert.strictEqual(keepOnlyGreek('αβγδεζηθικλμνξοπρστυφχψω'), 'αβγδεζηθικλμνξοπρστυφχψω');
});

test('keepOnlyGreek - mixed Greek and English characters', () => {
    assert.strictEqual(keepOnlyGreek('Γιώργος George'), 'Γιώργος');
    assert.strictEqual(keepOnlyGreek('Maria Μαρία'), 'Μαρία');
    assert.strictEqual(keepOnlyGreek('Test Αγγλικά English'), 'Αγγλικά');
});

test('keepOnlyGreek - Greek characters with numbers and symbols', () => {
    assert.strictEqual(keepOnlyGreek('Γιώργος 123!'), 'Γιώργος 123!');
    assert.strictEqual(keepOnlyGreek('Τ.Κ. 54622, Θεσσαλονίκη'), 'Τ.Κ. 54622, Θεσσαλονίκη');
    assert.strictEqual(keepOnlyGreek('Μαρία - 2023'), 'Μαρία - 2023');
});

test('keepOnlyGreek - only English characters', () => {
    assert.strictEqual(keepOnlyGreek('Hello World'), '');
    assert.strictEqual(keepOnlyGreek('John Doe'), '');
});

test('keepOnlyGreek - extra whitespace is trimmed', () => {
    assert.strictEqual(keepOnlyGreek('  Γιώργος   '), 'Γιώργος');
    assert.strictEqual(keepOnlyGreek('   Maria  Μαρία   '), 'Μαρία');
});
