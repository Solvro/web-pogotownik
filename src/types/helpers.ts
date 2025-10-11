import type { ReactNode } from "react";

export type SynchronousReactNode = Exclude<ReactNode, Promise<ReactNode>>;

export type Promisish<T> = T | Promise<T>;
