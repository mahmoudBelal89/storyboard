function isTypeOf<T>(obj: any, type: string): obj is T {
  return obj.___type__type___ === type;
}

export { isTypeOf };
