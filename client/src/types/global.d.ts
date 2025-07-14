export { };

declare global {

  interface Ingredients {
    name: string,
    quantity: string
    unity: string
  }

  interface Steps {
    step_number: number,
    description: string
  }

  interface Comment {
    id: string
    author: string
    text: string
    date: number
  }

  interface Author {
    id: string
    username: string
  }

  interface RecipeProps {
    _id: string
    title: string
    type: string
    difficulty: string
    number_persons: number
    preparation_time: number
    price: string
    author: Author
    ingredients: Array<Ingredients>
    steps: Array<Steps>
    comments: Array<Comment>
    likes: number
    image?: any
  }

  interface User {
    _id: string
    favorites: Array<string>
    username: string
    email: string
    password: string
  };
}
