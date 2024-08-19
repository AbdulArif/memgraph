from neo4j import GraphDatabase, basic_auth

URI = "neo4j+s://479b12e1.databases.neo4j.io:7687"

driver = GraphDatabase.driver(
  URI,
  auth=basic_auth("neo4j", "12345678"))

cypher_query = '''
MATCH (l:Location {address:$address})<-[r:OCCURRED_AT]-(c:Crime)
RETURN c.date as crimeDate
'''
driver.verify_connectivity()
print("----------------------------------------------------------------------")
print("Connection established successfully!")


# with driver.session(database="neo4j") as session:
#   results = session.read_transaction(
#     lambda tx: tx.run(cypher_query,
#                       address="Piccadilly").data())
#   for record in results:
#     print(record['crimeDate'])

# driver.close()