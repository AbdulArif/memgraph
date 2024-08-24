from neo4j import GraphDatabase

# Define correct URI and AUTH arguments (no AUTH by default)
URI = "bolt://localhost:7687"
AUTH = ("", "")
with GraphDatabase.driver(URI, auth=AUTH) as client:
    # Check the connection
    client.verify_connectivity()

    # Clear the database
    client.execute_query("MATCH (n) DETACH DELETE n;")

    # Create users in the database
    users = [
        {"name": "John", "password": "pass"},
        {"name": "Paul", "password": "pass"},
        {"name": "Alice", "password": "pass"},
        {"name": "Alena", "password": "pass"},
        {"name": "Eve", "password": "pass"},
        {"name": "Evan", "password": "pass"},
        {"name": "Lily", "password": "pass"},
    ]

    for user in users:
        records, summary, keys = client.execute_query(
            "CREATE (u:User {name: $name, password: $password}) RETURN u.name AS name;",
            name=user["name"],
            password=user["password"],
            database_="memgraph",
        )

        # # Get the result
        # for record in records:
        #     print("----------------------------")
        #     print(record["name"])

        # # Print the query counters
        # print("==================")
        # print(summary.counters)

    # Find all users in the database
    records, summary, keys = client.execute_query(
        "MATCH (u:User) RETURN u.name AS name",
        database_="memgraph",
    )

    # # Get the result
    for record in records:            
        # print("+++++++++++++++++++++++++++++")cls
        
        print(record["name"])

    # # Print the query
    # print("....................")
    print(summary.query)