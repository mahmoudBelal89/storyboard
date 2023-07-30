function add(s1: string, s2?: string) {
  return s2 ? s1 + ' ' + s2 : s1;
}

export { add };
