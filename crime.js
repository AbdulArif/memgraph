const neo4j = require('neo4j-driver');
// const driver = neo4j.driver('bolt://localhost:7687',
//                   neo4j.auth.basic('', ''), 
//                   {});
const URI = 'bolt://localhost:7687';
const USER = 'neo4j';
const PASSWORD = '12345678';
let driver;
driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
const serverInfo =  driver.getServerInfo();
console.log('Connection established');
// console.log(serverInfo);


const query =
    `
  MATCH (l:Location {address:$address})<-[r:OCCURRED_AT]-(c:Crime)
  RETURN c.date as crimeDate
  `;

const params = { "address": "Piccadilly" };

const session = driver.session({ database: "neo4j" });


session.run(query, params)
    .then((result) => {
        result.records.forEach((record) => {
            console.log(record.get('crimeDate'));
        });
        session.close();
        driver.close();
    })
    .catch((error) => {
        console.error(error);
    });