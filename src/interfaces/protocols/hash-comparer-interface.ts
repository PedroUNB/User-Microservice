export interface HashComparer {
  compare: (hashedValue: string, text: string) => Promise<boolean>
}
