export default async function teardown() {
  if (globalThis.__POSTGRES__) {
    await globalThis.__POSTGRES__.close();
  }

  global.__APP__ = null;

  globalThis.__POSTGRES__ = null;
}
