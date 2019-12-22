export type MapActionsInterfacesToActions<Type> = {
  [Key in keyof Type]: { type: Key; payload: Type[Key] }
}[keyof Type];
