export interface Issue {
  id: string,
  name: string,
  message: string,
  status: 'open' | 'resolved',
  numEvents: number,
  numUsers: number,
  value: number,
}