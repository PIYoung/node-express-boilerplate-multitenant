export function isEmpty(value: any) {
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

export function isNotEmpty(value: any) {
  return !isEmpty(value);
}

export function pick(object: any, keys: string[]) {
  return keys.reduce((obj, key) => {
    if (isNotEmpty(object[key])) {
      obj[key] = object[key];
    }

    return obj;
  }, {} as any);
}
