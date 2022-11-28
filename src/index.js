const NodeGraph = require("./NodeGraph/NodeGraph_class.js");

let graph = new NodeGraph();

let root = graph.addNode("root");
let dep1 = graph.addNode("dep-1","./dep1.js");
let dep2 = graph.addNode("dep-2","./dep-2.js");
let dep3 = graph.addNode("dep-3", "./dep-3.js");

dep3.addParent(dep2);

root.addParent(dep1);
root.addParent(dep2);
root.addParent(dep3);

console.log(graph);
console.log("Dependency sequence:");
graph.getNodeDependencySequence().map( n => console.log(n.name));