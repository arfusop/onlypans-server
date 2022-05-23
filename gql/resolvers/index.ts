import { Query as UserQueries, Mutation as UserMutations } from './users'
import { Query as RecipeQueries, Mutation as RecipeMutations } from './recipes'

const Query = {
    ...UserQueries,
    ...RecipeQueries
}
const Mutation = {
    ...UserMutations,
    ...RecipeMutations
}
export { Query, Mutation }
