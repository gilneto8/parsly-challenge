print("Started Adding the Users.");
db = db.getSiblingDB("parslydb");
db.createUser({
  user: "parslyadmin",
  pwd: "parslypw",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, 
             { role: "dbAdminAnyDatabase", db: "admin" }, 
             { role: "readWriteAnyDatabase", db: "admin" } ],
             mechanisms:[  
  "SCRAM-SHA-1"
 ]
});
print("End Adding the User Roles.");
