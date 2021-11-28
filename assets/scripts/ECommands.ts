export enum CommandType{
    Go = 'Go',
    Genesis = 'Genesis',
    Turn = 'Turn',
    View = 'View',
    None = 'None'
}
export type Command = {
    command:CommandType,
    value:number
}

