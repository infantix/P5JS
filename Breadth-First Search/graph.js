
function Graph() {
    this.graph = {};
}

Graph.prototype.addNode = function (node) {
    let value = node.value;
    this.graph[value] = node;
}

Graph.prototype.getNode = function (value) {
    return this.graph[value];
}


Graph.prototype.breadthFirstSearch = function(start, end) {

    //FIFO queue
    let openSet = [];

    //an empty set to maintain visited nodes
    let closedSet = [];

    // a dictionary to maintain meta information (used for path formation)
    // key -> (parent state, action to reach child)
    let meta = {};

    //initialize
    let startNode = this.graph[start];
    let endNode = this.graph[end];
    openSet.push(startNode.value);

    // For each node on the current level expand and process, if no children (leaf) then unwind
    while(openSet.length != 0) {
        let subtreeRoot = this.getNode(openSet.shift());

        //We found the node we wanted so stop and emit a path.
        if (subtreeRoot == endNode) {
            return constructPath(endNode, meta);
        }

        //For each child of the current tree process
        for(let i = 0; i < subtreeRoot.edges.length; i++) {
            let node = subtreeRoot.edges[i];
            
            if(closedSet.indexOf(node.value) > -1) {
                //The node has already been processed, so skip over it
                continue;
            }

            //The child is not enqueued to be processed, so enqueue this level of children to be expanded
            if(openSet.indexOf(node.value) <= -1) {
                meta[node.value] = subtreeRoot;
                openSet.push(node.value);
            }
        }

        //We finished processing the root of this subtree, so add it to the closed set
        closedSet.push(subtreeRoot.value);

    }

    function constructPath (subtreeRoot, meta, path = []) {

        path.push(subtreeRoot);

        let nextNode = meta[subtreeRoot.value];
        
        if(!nextNode) {
            return path.reverse();
        }

        return constructPath (nextNode, meta, path);
    }
}