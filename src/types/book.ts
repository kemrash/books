export interface IBook {
  id: number
  title: string
  author: string
  publication_year: number
  description: string
  cover_image: string
}

export interface IStatus {
  id: number
  favorite?: boolean
  status?: 'read' | 'finish'
}
