// Set jest test timeout 30 seconds
jest.setTimeout(30 * 1000);

// collect garbage after each test suite
afterAll(() => {
  global.gc && global.gc();
});
