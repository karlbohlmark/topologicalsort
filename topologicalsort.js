/*
  {
    'a': ['b', 'c'],
    'b': ['d']
  }
*/

function topologicalSort (graph, normalized) {
  var indegrees = {};
  var resolvedQueue = [];
  var resultQueue = [];
  var dep;

  if ( !normalized ) {
    normalize(graph);
  }

  Object.keys(graph).forEach( function (name) {
    indegrees[name] = graph[name].length;
  });

  var cycleDetectBailout = Object.getOwnPropertyNames(indegrees).length;
  var cycleDetect = 0;

  while ( Object.getOwnPropertyNames(indegrees).length > 0) {
    for(var name in indegrees) {
      if ( indegrees[name] === 0 ) {
        delete indegrees[name];
        resolvedQueue.push(name);
      }
    }

    while (!!(dep = resolvedQueue.pop())) {
        for(var n in indegrees) {
          var index = graph[n].indexOf(dep);
          if (index !== -1) {
            indegrees[n]--; // 
            delete graph[name][index]; // 
          }
        }
        resultQueue.push(dep);
      }
    cycleDetect++;
    if ( cycleDetect > cycleDetectBailout ) {
      throw new Error('Graph cycle detected');
    }
  }

  return resultQueue;
}

function normalize (graph) {
  Object.keys(graph).forEach(function (name) {
    graph[name].forEach( function (dep) {
      if ( !graph.hasOwnProperty(dep) ) {
        graph[dep] = [];
      }
    });
  });
}

module.exports = topologicalSort;