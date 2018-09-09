function Node(value) {
    this.value = value;
    this.edges = [];
}

Node.prototype.addEdge = function(node) {
    this.edges.push(node);
}