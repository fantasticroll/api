
// const jsonServer = require('json-server')

// const server = jsonServer.create()


// const fs = require('fs')
// const path = require('path')
// const filePath = path.join('products.json')
// const data = fs.readFileSync(filePath, "utf-8");
// const db = JSON.parse(data);
// const router = jsonServer.router(db)


// const middlewares = jsonServer.defaults()

// server.use(middlewares)

// server.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/blog/:resource/:id/show': '/:resource/:id'
// }))
// server.use(router)
// server.listen(3000, () => {
//     console.log('JSON Server is running')
// })

// module.exports = server

const jsonServer = require('json-server')
const fs = require('fs')
const path = require('path')

const server = jsonServer.create()

// List of JSON files to combine
const jsonFiles = ['products.json', 'catogories.json', 'companies.json'];
const combinedData = jsonFiles.reduce((acc, file) => {
  const filePath = path.join(__dirname, file);
  const data = fs.readFileSync(filePath, 'utf-8');
  const jsonData = JSON.parse(data);
  return { ...acc, ...jsonData };
}, {});

const router = jsonServer.router(combinedData)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))
server.use(router)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});
