/**
 * sqrt
 */

export type Sqrt = (x: number) => number;

/**
 * formats a number using fixed-point notation.
 */

export declare type ToFixed = (num: number, digits?: number) => string;

type Val =
  | string
  | number
  | boolean
  | undefined
  | symbol
  | object
  | []
  | Function
  | Date
  | File
  | Blob
  | Buffer
  | FormData
  | ArrayBufferView;
/**
 *  判断val是不是传入的type类型，反回boolean/unknow type.
 */
export declare type IsType = (
  val:
    | string
    | number
    | boolean
    | undefined
    | symbol
    | object
    | any[]
    | Function
    | Date
    | File
    | Blob
    | Buffer
    | FormData
    | ArrayBufferView,
  type: string,
) => boolean | string;
