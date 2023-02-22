export function isEmpty(value: object | string | null | undefined) {
  if (
    value == '' ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == 'object' && !Object.keys(value).length)
  ) {
    return true;
  }

  return false;
}

export function isNotEmpty(value: object) {
  return !isEmpty(value);
}

export function pick(object: { [key: string]: any }, keys: string[]) {
  return keys.reduce((obj, key) => {
    if (isNotEmpty(object[key])) {
      obj[key] = object[key];
    }

    return obj;
  }, {} as any);
}
