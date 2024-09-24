import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import db from './db.js';

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_, args) {
      return db.reviews.find((review) => review.id === args.id);
    },
    author(_, args) {
      return db.authors.find((author) => author.id === args.id);
    },
    game(_, args) {
      return db.games.find((game) => game.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return db.reviews.filter((review) => review.game_id === parent.id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((review) => review.author_id === parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((game) => game.id === parent.game_id);
    },
    author(parent) {
      return db.authors.find((author) => author.id === parent.author_id);
    },
  },

  Mutation: {
    deleteGame(_, args) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },

    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000).toString(),
      };

      db.games.push(game);
      return game;
    },

    updateGame(_, args) {
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }

        return g;
      });

      return db.games.find((game) => game.id === args.id);
    },

    deleteAuthor(_, args) {
      db.authors = db.authors.filter((author) => author.id !== args.id);
      return db.games;
    },

    addAuthor(_, args) {
      let author = {
        ...args.author,
        id: Math.floor(Math.random() * 1000).toString(),
      };

      db.authors.push(author);
      return author;
    },

    updateAuthor(_, args) {
      db.authors = db.authors.map((a) => {
        if (a.id === args.id) {
          return { ...a, ...args.edits };
        }

        return a;
      });

      return db.authors.find((a) => a.id === args.id);
    },

    deleteReview(_, args) {
      db.reviews = db.reviews.filter((review) => review.id !== args.id);
      return db.games;
    },
    addReview(_, args) {
      let review = {
        ...args.review,
        id: Math.floor(Math.random() * 1000).toString(),
      };

      db.reviews.push(review);
      return review;
    },

    updateReview(_, args) {
      db.reviews = db.reviews.map((r) => {
        if (r.id === args.id) {
          return { ...r, ...args.edits };
        }

        return r;
      });

      return db.reviews.find((r) => r.id === args.id);
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log('Server listining at port 4000');
