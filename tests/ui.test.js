const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock DOM elements and other globals
global.document = {
    getElementById: () => ({ value: '', checked: false }),
    createElement: () => ({ style: {}, appendChild: () => {} }),
    querySelectorAll: () => [],
    addEventListener: () => {}
};
global.localStorage = {
    getItem: () => null,
    setItem: () => {},
};
global.window = {
    addEventListener: () => {}
};

const uiCode = fs.readFileSync(path.join(__dirname, '..', 'ui.js'), 'utf8');
eval(uiCode);

describe('greekTitleCase', function() {
    it('should capitalize the first letter and lowercase the rest', function() {
        assert.strictEqual(greekTitleCase('γιώργος'), 'Γιώργος');
        assert.strictEqual(greekTitleCase('ΓΙΩΡΓΟΣ'), 'Γιωργος');
        assert.strictEqual(greekTitleCase('ΜΑΡΙΑ'), 'Μαρια');
        assert.strictEqual(greekTitleCase('νίκος'), 'Νίκος');
    });

    it('should return empty string for falsy input', function() {
        assert.strictEqual(greekTitleCase(''), '');
        assert.strictEqual(greekTitleCase(null), '');
        assert.strictEqual(greekTitleCase(undefined), '');
    });

    it('should uppercase the entire word if it contains a period (abbreviation)', function() {
        assert.strictEqual(greekTitleCase('α.'), 'Α.');
        assert.strictEqual(greekTitleCase('β.γ.'), 'Β.Γ.');
        assert.strictEqual(greekTitleCase('κ.λ.π.'), 'Κ.Λ.Π.');
    });

    it('should handle single characters', function() {
        assert.strictEqual(greekTitleCase('α'), 'Α');
        assert.strictEqual(greekTitleCase('Β'), 'Β');
    });

    it('should handle spaces or non-alphabetical characters correctly based on existing logic', function() {
        // the current implementation doesn't specifically handle multiple words,
        // it just capitalizes the very first char of the string.
        assert.strictEqual(greekTitleCase('δύο λέξεις'), 'Δύο λέξεις');
    });
});
