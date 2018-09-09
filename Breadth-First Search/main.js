let data;
let graph;
let path;

let dropDownActor1;
let dropDownActor2;

function preload() {
    data = loadJSON('bacon.json');
}

function setup() {
    createCanvas(600, 600);
    path = [];
    initDropDown();
    initGraph();
}

function initGraph() {
    graph = new Graph();

    let movies = data.movies;

    movies.forEach(movie => {
        let title = movie.title;
        let cast = movie.cast;

        let movieNode = new Node(title);
        graph.addNode(movieNode);

        cast.forEach(actor => {
            
            let actorNode = graph.getNode(actor);
            
            if(!actorNode) {
                addActorToDropDown(actor);
                actorNode = new Node(actor);
                graph.addNode(actorNode);
            }
            
            movieNode.addEdge(actorNode);
            actorNode.addEdge(movieNode);
        });
    });
}

function initDropDown() {
    dropDownActor1 = createSelect();
    dropDownActor1.changed(executeBFS) ;
    
    dropDownActor2 = createSelect();
    dropDownActor2.changed(executeBFS) ;
}

function addActorToDropDown(actor) {
    dropDownActor1.option(actor);
    dropDownActor2.option(actor);
}

function executeBFS() {
    let start = dropDownActor1.value();
    let end = dropDownActor2.value();

    path = graph.breadthFirstSearch(start, end);
}

function draw() {
    background(255);
    fill(50);
    
    let xCoord = 50;
    let yCoord = 100;

    path.forEach(node => {
        text(node.value, xCoord, yCoord, 200, 15);
        yCoord += 50;
    });
}