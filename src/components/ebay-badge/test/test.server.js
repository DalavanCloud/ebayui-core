const expect = require('chai').expect;
const testUtils = require('../../../common/test-utils/server');

test('renders defaults', context => {
    const input = { number: 5 };
    const $ = testUtils.getCheerio(context.render(input));
    const badge = $('.badge');
    expect(badge.length).to.equal(1);
    expect(badge.text()).to.equal('5');
});

test('renders a11y text', context => {
    const input = { number: 5, a11yText: '5 items' };
    const $ = testUtils.getCheerio(context.render(input));
    const a11yText = $('.badge .clipped');
    expect(a11yText.length).to.equal(1);
    expect(a11yText.text()).to.equal('5 items');
});

describe('given number is a string', () => {
    test('renders number with coerced string', context => {
        const input = { number: '5' };
        const $ = testUtils.getCheerio(context.render(input));
        const badge = $('.badge');
        expect(badge.length).to.equal(1);
        expect(badge.text()).to.equal('5');
    });

    test('does not renders with an invalid string', context => {
        const input = { number: 'five' };
        const $ = testUtils.getCheerio(context.render(input));
        const badge = $('.badge');
        expect(badge.length).to.equal(0);
    });
});

test('truncates when the value is greater than 99', context => {
    const input = { number: 150 };
    const $ = testUtils.getCheerio(context.render(input));
    const badge = $('.badge');
    expect(badge.length).to.equal(1);
    expect(badge.text()).to.equal('99+');
});
