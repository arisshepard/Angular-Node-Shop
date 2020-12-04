// ===========================
// Base de datos
// ===========================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
	urlDB = 'mongodb://localhost:27017/shop';
} else {
	urlDB = process.env.MONGO_URI;
}

console.log('MongoDB URL: '.grey, urlDB.grey);

process.env.URLDB = urlDB;
