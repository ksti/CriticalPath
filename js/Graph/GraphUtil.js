/**
 * Created by GJS on 18/5/30.
 */

import VertexNode from './VertexNode'
import EdgeNode from './EdgeNode'
import Graph from './Graph'

// 构建图
export const createGraph = function(obj){
  // 构建顶点
  // 解析数据
  let vertexArray = obj.data.vertexList;
  let vertexObjs = vertexArray;
  let vertexes = [];
  for (let i=0;i<vertexObjs.length;i++)
  {
    let vObj = vertexObjs[i];
    let v = new VertexNode();
    v.id = vObj.code;
    // v.data = vObj.data;
    v.data = Object.assign({name: vObj.code}, vObj);
    vertexes.push(v);
  }

  let g = new Graph(vertexes);

  let edgeArray = obj.data.edgeList;
  for (let i=0;i<edgeArray.length;i++)
  {
    let edge = edgeArray[i];
    let begin = edge.relation.startPoint;
    let end = edge.relation.endPoint;
    let weight = Number(edge.relation.length);
    let beginIndex = g.vertexIndexMap[begin];
    let endIndex = g.vertexIndexMap[end];
    let edgeData = Object.assign({weight: weight}, edge);
    g.addDirectedEdge(beginIndex, endIndex, edgeData);
  }

  return g;
}
// 关键路径
export const criticalPath = function(g: Graph){
  // 拓扑排序
  let valid = g.topSort();
  if (!valid)
  {
    console.log('此图有环，无拓扑序列')
    return [];
  }

  console.log('关键路径：')
  return g.criticalPath();
}
//
export const printGraph = function (g: Graph){
  console.log('打印图的邻接表逻辑结构：')
  g.showGraph();
}

export default graphUtil = {
  createGraph,
  criticalPath,
  printGraph
}
