use plp_book_store
// Create a collection named "books"
db.books.insertMany([
 {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    published_year: 1960,
    price: 12.99,
    in_stock: true,
    pages: 336,
    publisher: 'J. B. Lippincott & Co.'
  },
  {
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    published_year: 1949,
    price: 10.99,
    in_stock: true,
    pages: 328,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    published_year: 1925,
    price: 9.99,
    in_stock: true,
    pages: 180,
    publisher: 'Charles Scribner\'s Sons'
  },
  {
    title: 'Brave New World',
    author: 'Aldous Huxley',
    genre: 'Dystopian',
    published_year: 1932,
    price: 11.50,
    in_stock: false,
    pages: 311,
    publisher: 'Chatto & Windus'
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1937,
    price: 14.99,
    in_stock: true,
    pages: 310,
    publisher: 'George Allen & Unwin'
  },
  {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    published_year: 1951,
    price: 8.99,
    in_stock: true,
    pages: 224,
    publisher: 'Little, Brown and Company'
  },
  {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    published_year: 1813,
    price: 7.99,
    in_stock: true,
    pages: 432,
    publisher: 'T. Egerton, Whitehall'
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    published_year: 1954,
    price: 19.99,
    in_stock: true,
    pages: 1178,
    publisher: 'Allen & Unwin'
  },
  {
    title: 'Animal Farm',
    author: 'George Orwell',
    genre: 'Political Satire',
    published_year: 1945,
    price: 8.50,
    in_stock: false,
    pages: 112,
    publisher: 'Secker & Warburg'
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    published_year: 1988,
    price: 10.99,
    in_stock: true,
    pages: 197,
    publisher: 'HarperOne'
  },
  {
    title: 'Moby Dick',
    author: 'Herman Melville',
    genre: 'Adventure',
    published_year: 1851,
    price: 12.50,
    in_stock: false,
    pages: 635,
    publisher: 'Harper & Brothers'
  },
  {
    title: 'Wuthering Heights',
    author: 'Emily Brontë',
    genre: 'Gothic Fiction',
    published_year: 1847,
    price: 9.99,
    in_stock: true,
    pages: 342,
    publisher: 'Thomas Cautley Newby'
  }
]);
// finding specific genre
db.books.find({genre:"Fiction"});
// books published after a certain year
db.books.find({published_year:{$gt:1847}});
// finding  books by a specific author
db.books.find({author:"George Orwell"});
// updating  the price of a specific book
db.books.updateOne({
  title: 'Wuthering Heights'},
                   {$set:{  price:400}});
// deleting a book by its title
db.books.deleteOne({title: 'Wuthering Heights'});
// task 3
db.books.find(
  {in_stock: true, published_year: {$gt: 2010}},
  {_id: 0, title: 1,author: 1, price: 1}
).sort({price: 1}).skip(0).limit(5)


db.books.find(
  {in_stock: true, published_year: {$gt: 2010}},
  {_id: 0, title: 1,author: 1, price: 1}
).sort({price: -1}).skip(0).limit(5)

// task 4
db.books.aggregate([
  {
$group: {
_id: "$genre",
average_price:{$avg: "$price"}
}
}])

db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [ { $floor: { $divide: ["$publishedYear", 10] } }, 10 ] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      totalBooks: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 } // Optional: sorts decades chronologically
  }
])



db.books.createIndex({title: 1})
db.books.find({title: "The Lord of the Rings" }).explain("executionStats")
db.books.createIndex({author: 1, published_year: -1})
db.books.find({author: 'George Orwell', published_year: 1949 }).explain("executionStats")
