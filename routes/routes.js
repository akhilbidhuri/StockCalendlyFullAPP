const data = require('../controllers/databaseController')
module.exports = (app) => {
  app.get('/getData', data.fetchData)
  app.post('/updatePrice', data.updateDate)
  app.post('/deletePrice', data.deletePrice)
}