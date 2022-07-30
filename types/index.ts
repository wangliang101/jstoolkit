/**
 * sqrt
 */

export type Sqrt = (x: number) => number;

/**
 * formats a number using fixed-point notation.
 */

export declare type ToFixed = (num: number, digits?: number) => string;

/**
 *
 */

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

export declare type IsType = (val: Val, type: string) => boolean | string;
