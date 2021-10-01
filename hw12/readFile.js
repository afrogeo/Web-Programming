
const fs = require('fs');
const fastcsv = require('fast-csv');
const MongoClient = require('mongodb').MongoClient;

let url = "mongodb+srv://comp20:nikodeedo@cluster0.jyaa0.mongodb.net/companies?retryWrites=true&w=majority"
let stream = fs.createReadStream("companies.csv");
let csvData = [];
let csvStream = fastcsv
    .parse()
    .on("data",function(data) {
        csvData.push({
            Company: data[0],
            Ticker: data[1]
        });
    })
    .on("end", function() {
        csvData.shift();
    
        console.log(csvData);

        MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
            (err,client) => {
                if(err) throw err;
                client
                    .db("companies")
                    .collection('companies')
                    .insertMany(csvData, (err, res) => { 
                        if (err) throw err;
                        console.log('inserted:' + res.insertedCount + 'rows');
                        client.close();
                    });
            }
        );
    });
    stream.pipe(csvStream);

