(async () => {
    var db = require('neo4j-driver');
  
    const URI = 'bolt://localhost:7687';
    const USER = '';
    const PASSWORD = '';
    let driver;
  
    try {
      driver = db.driver(URI, db.auth.basic(USER, PASSWORD));
      const serverInfo = await driver.getServerInfo();
      console.log('Connection established');
      console.log(serverInfo);
 
      const session = driver.session();
 
      try {
        // Clear the database
        await session.run("MATCH (n) DETACH DELETE n;");
        console.log("Database cleared.");
 
        // Create a user in the database
        await session.run("CREATE (:Person {name: 'Alice', age: 22});");
        console.log("Record created.");
 
        // Get all of the nodes
        const result = await session.run("MATCH (n) RETURN n;");
        console.log("Record matched.");
 
        const mark = result.records[0].get("n");
        const label = mark.labels[0];
        const name = mark.properties["name"];
        const age = mark.properties["age"];
 
        if (label != "Person" || name != "Alice" || age != 22) {
          console.error("Data doesn't match.");
        }
 
        console.log("Label: " + label);
        console.log("Name: " + name);
        console.log("Age: " + age);
      } catch (error) {
        console.error(error);
      } finally {
        session.close();
      }
 
      driver.close();
 
    } catch (err) {
      console.log(`Connection error\n${err}\nCause: ${err.cause}`);
      await driver.close();
      return;
    }
  
    await driver.close();
  })();

