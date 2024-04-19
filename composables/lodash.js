export function _set(obj, path, value) {
  const pathParts = path.split(".");
  let current = obj;

  for (let i = 0; i < pathParts.length; i++) {
    if (i === pathParts.length - 1) {
      current[pathParts[i]] = value;
    } else {
      current[pathParts[i]] = current[pathParts[i]] || {};
      current = current[pathParts[i]];
    }
  }

  return obj;
}

export function _get(obj, path, defaultValue) {
  const pathParts = path.split(".");
  let current = obj;

  for (let i = 0; i < pathParts.length; i++) {
    if (current[pathParts[i]] === undefined) {
      return defaultValue;
    } else {
      current = current[pathParts[i]];
    }
  }

  return current;
}
