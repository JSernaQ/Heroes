/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

const database = 'prueba';
const collection = 'peliculas';

// Select the database to use.
use(database);

// Insert a few documents into the sales collection.
db.getCollection(collection).insertMany([
  { 'titulo': 'titulo5', 'descripcion': 'descripcion1', 'imagen': 'unaimagen1.jpg', 'fecha_lanzamiento': new Date('2003-03-01T08:00:00Z') },
  { 'titulo': 'titulo6', 'descripcion': 'descripcion2', 'imagen': 'unaimagen2.jpg', 'fecha_lanzamiento': new Date('2003-03-02T08:00:00Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const resultado = db.getCollection(collection).find({
  fecha_lanzamiento: { $gte: new Date('2000-01-01'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${resultado} registros en la coleccion ${collection} `);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.

//db.getCollection(collection).aggregate([
  // Find all of the sales that occurred in 2014.
//  { $match: { fecha_lanzamiento: { $gte: new Date('2000-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
//  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
//]);
