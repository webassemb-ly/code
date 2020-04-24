/**
 * @author Hans Oksendahl
 */
class GetIt<T extends object> {
  /**
   * Create a new instance of Signal
   *
   * @returns Signal
   */
  static of<U extends object>(): GetIt<U> {
    return new GetIt<U>();
  }

  /**
   * Create a nested property getter for a pre-defined type
   *
   * @param prop - {string|string[]} a property or array of nested properties
   */
  public get<P extends keyof T>(prop: P): (ref: T) => T[P];

  public get<P extends [keyof T]>(props: P): (ref: T) => T[P[0]];

  public get<P extends [keyof T, keyof T[P[0]]]>(
    props: P,
  ): (ref: T) => T[P[0]][P[1]];

  public get<P extends [keyof T, keyof T[P[0]], keyof T[P[0]][P[1]]]>(
    props: P,
  ): (ref: T) => T[P[0]][P[1]][P[2]];

  public get<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
    ]
  >(props: P): (ref: T) => T[P[0]][P[1]][P[2]][P[3]];

  public get<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
      keyof T[P[0]][P[1]][P[2]][P[3]],
    ]
  >(props: P): (ref: T) => T[P[0]][P[1]][P[2]][P[3]][P[4]];

  public get<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
      keyof T[P[0]][P[1]][P[2]][P[3]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]],
    ]
  >(props: P): (ref: T) => T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]];

  public get<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
      keyof T[P[0]][P[1]][P[2]][P[3]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]],
    ]
  >(props: P): (ref: T) => T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]][P[6]];

  public get<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
      keyof T[P[0]][P[1]][P[2]][P[3]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]][P[6]],
    ]
  >(props: P): (ref: T) => T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]][P[6]][P[7]];

  public get(segments: any): (ref: T) => any {
    const props: string[] = [].concat(segments);

    return (ref: T) => {
      let currentRef: any = ref;

      if (currentRef) {
        /* eslint-disable-next-line no-restricted-syntax */
        for (const prop of props) {
          currentRef = currentRef[prop as keyof typeof currentRef];

          if (!currentRef) {
            break;
          }
        }
      }

      return currentRef;
    };
  }

  /**
   * Create a nested property setter for a pre-defined type
   *
   * @param prop - {string|string[]} a property or array of nested properties
   * @param value - {*} a value with the same type as the named property
   */
  set<P extends keyof T, U extends T[P]>(prop: P, value: U): (ref: T) => T;

  set<P extends [keyof T], U extends T[P[0]]>(
    props: P,
    value: U,
  ): (ref: T) => T;

  set<P extends [keyof T, keyof T[P[0]]], U extends T[P[0]][P[1]]>(
    props: P,
    value: U,
  ): (ref: T) => T;

  set<
    P extends [keyof T, keyof T[P[0]], keyof T[P[0]][P[1]]],
    U extends T[P[0]][P[1]][P[2]]
  >(props: P, value: U): (ref: T) => T;

  set<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
    ],
    U extends T[P[0]][P[1]][P[2]][P[3]]
  >(props: P, value: U): (ref: T) => T;

  set<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
      keyof T[P[0]][P[1]][P[2]][P[3]],
    ],
    U extends T[P[0]][P[1]][P[2]][P[3]][P[4]]
  >(props: P, value: U): (ref: T) => T;

  set<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
      keyof T[P[0]][P[1]][P[2]][P[3]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]],
    ],
    U extends T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]]
  >(props: P, value: U): (ref: T) => T;

  set<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
      keyof T[P[0]][P[1]][P[2]][P[3]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]],
    ],
    U extends T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]][P[6]]
  >(props: P, value: U): (ref: T) => T;

  set<
    P extends [
      keyof T,
      keyof T[P[0]],
      keyof T[P[0]][P[1]],
      keyof T[P[0]][P[1]][P[2]],
      keyof T[P[0]][P[1]][P[2]][P[3]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]],
      keyof T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]][P[6]],
    ],
    U extends T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]][P[6]][P[7]]
  >(props: P, value: U): (ref: T) => T;

  set(segments: any, value: any): (ref: T) => T {
    const props = [].concat(segments);

    const ancestors = props.slice(0, -1);
    const last = props[props.length - 1];

    return function (ref: T) {
      let currentRef: any = ref;

      if (currentRef) {
        for (const prop of ancestors) {
          currentRef = currentRef[prop as keyof typeof currentRef];

          if (!currentRef) {
            break;
          }
        }
      }

      currentRef[last] = value;
      return ref;
    };
  }

}

export default GetIt.of;