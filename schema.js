export const typeDefs = `#graphql
    type Game {
        id: ID!,
        title: String!,
        platform: [String!]!
        reviews: [Review!]
    }

    type Review {
        id: ID!
        rating:Int!,
        content: String!
        game: Game!
        author: Author!

    }

    type Author {
        id:  ID!,
        name: String!,
        verified: Boolean
        reviews: [Review!]
    }

    type Query {
        reviews: [Review]
        review(id: ID): Review
        games: [Game]
        game(id: ID): Game
        authors: [Author]
        author(id: ID): Author
        
    }

    type Mutation{
        deleteGame(id: ID!): [Game]
        addGame(game: AddGameInput!): Game
        updateGame(id: ID!, edits: EditGameInput!): Game

        deleteAuthor(id: ID!): [Author]
        addAuthor(author: AddAuthorInput!): Author
        updateAuthor(id: ID!, edits: EditAuthorInput): Author

        deleteReview(id: ID!): [Review]
        addReview(review: AddReviewInput!): Review
        updateReview(id: ID!, edits: EditReviewInput): Review
    }

    input EditGameInput{
        title: String,
        platform: [String!]
    }

    input AddGameInput{
        title: String!,
        platform: [String!]!
    }

    input AddAuthorInput{
        name: String!,
        verified: Boolean
    }

    input EditAuthorInput{
        name: String,
        verified: Boolean
    }
    input AddReviewInput{
        rating:Int!,
        content: String!
    }

    input EditReviewInput{
        rating:Int,
        content: String
    }

`;
