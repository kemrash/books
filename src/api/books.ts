import type { IBook } from '@/types/book'

export async function getBooks(): Promise<IBook[]> {
  try {
    const fetchResponse = await fetch('https://freetestapi.com/api/v1/books')
    const responce = await fetchResponse.json()

    return responce
  } catch (err) {
    throw new Error('books response was not ok')
  }
}
