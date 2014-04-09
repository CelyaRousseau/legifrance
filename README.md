legifrance
==========

Project d'aspiration et de data visualisation

## Neo4j

* install neo4j
`apt-get install neo4j`
* Start server neo4j
`service neo4j-service start`


### Problem
> ERROR! Neo4j cannot be started using java version 1.6.0_27.  
  Please use Oracle(R) Java(TM) 7 to run Neo4j Server.         

### Fix
install jdk7                                         
`apt-get install openjdk-7-jre`                             
change jdk manually to JAVA7                            
`update-alternatives --config java`                               

