export interface RocketNodeI {
  [key: string]: RocketNodeI|number;
}

export interface NewNodeRequest {
  path: string,
  value: string
}