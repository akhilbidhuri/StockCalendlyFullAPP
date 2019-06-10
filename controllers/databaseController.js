var Airtable = require('airtable');
var base = new Airtable({apiKey: 'keyQrcSgoXiPCYzw3'}).base('appvuLczlKodBCzE1');

module.exports = {
    
    fetchData(req, res) {
        let r = []
        base('stockCalendly').select({
            view: "Grid view"
        }).eachPage(function page(records, fetchNextPage) {
            // This function (`page`) will get called for each page of records.
        
            records.forEach(function(record) {
                //console.log(record.id,'Retrieved', record.get('date'), record.get('stockPrice'));
                r.push({'id':record.id,'date':record.get('date'), 'price':record.get('stockPrice')})
            });
        
            // To fetch the next page of records, call `fetchNextPage`.
            // If there are more records, `page` will get called again.
            // If there are no more records, `done` will get called.
            fetchNextPage();
        
        }, function done(err) {
            if (err) { console.error(err);  
                res.send({'msg':'error'});
            }
            res.send({'msg':'success', 'data':r})
        })
    },
    updateDate(req, res){
        base('stockCalendly').update(req.body.id, {
            "date": req.body.date,
            "stockPrice": req.body.price
          }, function(err, record) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(record.get('date'));
            res.send({'msg':'success'})
          });
    },
    deletePrice(req, res){
      console.log(req.body)
        base('stockCalendly').update(req.body.id, {
            "date": req.body.date,
            "stockPrice": "null"
          }, function(err, record) {
            if (err) {
              console.error(err);
              return;
            }
            console.log(req.body.date)
            //console.log(record.get('date'));
            res.send({'msg':'success'})
          });
    }
}