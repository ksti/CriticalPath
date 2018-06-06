/**
 * Created by GJS on 18/5/30.
 */

import Stack from './Stack'
import VertexNode from './VertexNode'
import EdgeNode from './EdgeNode'

/**
 typedef struct EdgeNode
 {
   int adjvex;            // 邻接点域，存储该顶点对应的下标
   int weight;            // 边的权值
   struct EdgeNode *next; // 链域
 } EdgeNode;

 typedef struct VertexNode
 {
   int inNum;           // 顶点入度值
   int data;            // 顶点数值欲
   EdgeNode *firstedge; // 边表头指针
 } VertexNode, AdjList[MAXVEX];

 typedef struct
 {
   AdjList adjList;
   int numVertexes, numEdges; // 图中当前顶点数和边数（对于本案例，已经存在宏定义）
 } graphAdjList, *GraphAdjList;

 // 构建节点
 EdgeNode *BuyNode()
 {
   EdgeNode *p = (EdgeNode *)malloc(sizeof(EdgeNode));
   p->adjvex = -1;
   p->next = NULL;
   return p;
 }
 */

/**
 // 创建图
 void CreateGraph(graphAdjList &g)
 {
     int i = 0, begin = 0, end = 0, weight = 0;
     EdgeNode *pNode = NULL;
     cout << "输入10个顶点信息（顶点 入度）:" << endl;
     for (i = 0; i < MAXVEX; ++i)
     {
         cin >> g.adjList[i].data >> g.adjList[i].inNum;
     }
     cout << "输入13条弧的信息（起点 终点 权值）：" << endl;
     for (i = 0; i < MAXEDGE; ++i)
     {
         cin >> begin >> end >> weight;
         pNode = BuyNode();
         pNode->adjvex = end;
         pNode->weight = weight;
         pNode->next = g.adjList[begin].firstedge;
         g.adjList[begin].firstedge = pNode;
     }
 }
 */

// 定义类:图(邻接表形式)
export default function Graph(vertexList:Array<VertexNode> = []){
  // 全局栈
  this.sQ2 = new Stack();
  this.vertices = vertexList.length; // 顶点数目
  this.vertexList = vertexList;
  this.edges = 0;
  this.adj = [];
  this.vertexIndexMap = {};
  this.pEtv = [];
  this.pLtv = [];
  this.marked = [];
  for(let i=0;i<this.vertices;++i){
    this.marked[i] = false;
    let v = vertexList[i];
    this.adj[i] = v;
    this.vertexIndexMap[v.id] = i;
  };
  // 方法
  this.addEdge = addEdge;
  this.addDirectedEdge = addDirectedEdge;
  this.showGraph = showGraph;
  this.dfs = dfs;    // 深度优先
  this.bfs = bfs;     // 广度优先
  this.edgeTo = [];   // 最短距离，保存一个顶点到下一个顶点的所有边
  this.pathTo = pathTo;
  this.hasPathTo = hasPathTo;
  this.topSort = topSort; // 拓扑序列
  this.criticalPath = criticalPath; // 关键路径
}

// 类对应的方法
/*
// 添加无向边
function addEdge(v,w,weight){
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges++;
}

// 添加有向边
function addDirectedEdge(v,w,weight){
  this.adj[v].push(w);
  this.edges++;
}
*/
// 添加无向边
// 输入弧的信息（起点 终点 权值）
function addEdge(v:Number, w:Number, data:Object){
  this.addDirectedEdge(v,w,data);
  this.addDirectedEdge(w,v,data);
  this.edges--; // 因为上面加了两次(双向)，这里任务应该是一条边
}

// 添加有向边
// 输入弧的信息（起点 终点 权值）
function addDirectedEdge(v:Number, w:Number, data:Object){
  let begin = v, end = w;
  let pNode = null; // EdgeNode *pNode = NULL;
  this.adj[w].inNum++;
  pNode = new EdgeNode();
  pNode.adjvex = end;
  pNode.weight = data.weight;
  pNode.data = data;
  pNode.next = this.adj[begin].firstedge;
  this.adj[begin].firstedge = pNode;
  this.edges++;
}

/**
 // 打印输入信息的逻辑图
 void PrintGraph(graphAdjList &g)
 {
     cout << "打印AOE网的邻接表逻辑图：" << endl;
     for (int i = 0; i < MAXVEX; ++i)
     {
         cout << " " << g.adjList[i].inNum << " " << g.adjList[i].data << " ";
         EdgeNode *p = g.adjList[i].firstedge;
         cout << "-->";
         while (p != NULL)
         {
             int index = p->adjvex;
             cout << "[" << g.adjList[index].data << " " << p->weight << "] ";
             p = p->next;
         }
         cout << endl;
     }
 }
 */

// 用于显示符号名字而非数字的新函数,打印所有顶点及其相邻顶点列表
function showGraph() {
  let visited = [];
  for (let i = 0; i < this.vertices; ++i) {
    console.log(" 顶点:" + this.adj[i].data.name + " 入度:" + this.adj[i].inNum + " ");
    console.log('-->');
    let p = this.adj[i].firstedge;
    while (p !== null)
    {
      let index = p.adjvex;
      console.log("[" + this.adj[index].data.name + " " + p.weight + "] ");
      p = p.next;
    }
  }
}
//深度优先
function dfs(v) {
  this.marked[v] = true;
  if (this.adj[v] !== undefined) {
    console.log("Visited vertex: " + v + '(' + this.adj[v].data.name + ')');
  }
  let p = this.adj[v].firstedge;
  while (p !== null)
  {
    let index = p.adjvex;
    p = p.next;
    if (!this.marked[index]) {
      this.dfs(index);
    }
  }
}
//广度优先
function bfs(s){
  let queue = [];    //队列
  this.marked[s] = true;
  queue.push(s);    //添加到队尾,如果用unshift则会由右往左遍历，显示0 2 1 3 4
  while(queue.length > 0){
    let v = queue.shift(); //从队首移除
    console.log("Visited vertex:" + v);
    let p = this.adj[v].firstedge;
    while (p !== null)
    {
      let index = p.adjvex;
      if(!this.marked[index]){
        this.edgeTo[index] = v;
        this.marked[index] = true;
        queue.push(index);
      }
      p = p.next;
    }
  }
}


function pathTo(startVertices,v) {
  let source = startVertices;             //bfs遍历的开始的点，根据调用bfs传入的参数修改
  if (!this.hasPathTo(v)) {
    return undefined;
  }
  let path = [];
  for (let i = v; i != source; i = this.edgeTo[i]) {
    path.push(i);
  }
  path.push(source);
  return path;
}
function hasPathTo(v) {
  return this.marked[v];
}
//显示最短距离路径显示的函数
function showShortDiatance(paths){
  let str = '';                 //以下都为输出顺序的显示
  while (paths.length > 0) {
    if (paths.length > 1) {
      str += paths.pop() + '-';
    }
    else {
      str += paths.pop();
    }
  }
  console.log(str);
}

/**
 // 求拓扑序列
 bool TopologicalSort(graphAdjList g, int *pEtv)
 {
     EdgeNode *pNode = NULL;
     int i = 0, k = 0, gettop = 0;
     int nCnt = 0;
     stack<int> sQ1; // 用于排序的临时栈
     for (i = 0; i < MAXVEX; ++i)
     {
         if (0 == g.adjList[i].inNum)
             sQ1.push(i);
     }
     for (i = 0; i < MAXVEX; ++i)
     {
         pEtv[i] = 0;
     }
     while (!sQ1.empty()) // 如果栈为空，则结束循环
     {
         gettop = sQ1.top();
         sQ1.pop(); // 保存栈顶元素，并且栈顶元素出栈
         ++nCnt; // 操作数加一，计数用于标记循环次数
         sQ2.push(gettop); // 将弹出的顶点序号压入拓扑序列的栈
         if (MAXVEX == nCnt)
         { //去掉拓扑路径后面的-->
             cout << g.adjList[gettop].data << endl;
             break;
         }
         cout << g.adjList[gettop].data << "-->";
         pNode = g.adjList[gettop].firstedge;
         while (pNode != NULL)
         {
             k = pNode->adjvex;
             --g.adjList[k].inNum;
             if (0 == g.adjList[k].inNum)
                 sQ1.push(k);
             if (pEtv[gettop] + pNode->weight > pEtv[k])
                 pEtv[k] = pEtv[gettop] + pNode->weight;
             pNode = pNode->next;
         }
     }
     return nCnt != MAXVEX;
 }
 */
// 拓扑排序返回有序数组(若图有环，则无拓扑序列，返回空数组[])
function topSort() {
  let pNode = null;
  let pEtv = new Array(this.vertices);
  let i = 0, k = 0, gettop = 0;
  let nCnt = 0;
  let sQ1 = new Stack(); // 用于排序的临时栈
  for (i = 0; i < this.vertices; ++i)
  {
    pEtv[i] = 0;

    if (0 == this.adj[i].inNum)
      sQ1.push(i);
  }
  let printStr = '拓扑序列:';
  while (!sQ1.empty()) // 如果栈为空，则结束循环
  {
    gettop = sQ1.top();
    sQ1.pop(); // 保存栈顶元素，并且栈顶元素出栈
    ++nCnt; // 操作数加一，计数用于标记循环次数
    this.sQ2.push(gettop); // 将弹出的顶点序号压入拓扑序列的栈
    if (this.vertices === nCnt)
    { //去掉拓扑路径后面的-->
      printStr += this.adj[gettop].data.name;
      break;
    }
    printStr += this.adj[gettop].data.name + "-->";
    pNode = this.adj[gettop].firstedge;
    while (pNode !== null)
    {
      k = pNode.adjvex;
      --this.adj[k].inNum;
      if (0 == this.adj[k].inNum)
        sQ1.push(k);
      if (pEtv[gettop] + pNode.weight > pEtv[k])
        pEtv[k] = pEtv[gettop] + pNode.weight;
      pNode = pNode.next;
    }
  }

  this.pEtv = pEtv;
  console.log(printStr);
  return nCnt === this.vertices;
}

/**
 // 关键路径
 void CriticalPath(graphAdjList g, int *pEtv, int *pLtv)
 {
     // pEtv  事件最早发生时间
     // PLtv  事件最迟发生时间
     EdgeNode *pNode = NULL;
     int i = 0, gettop = 0, k = 0, j = 0;
     int ete = 0, lte = 0; // 声明活动最早发生时间和最迟发生时间变量
     int eTime = pEtv[sQ2.top()];
     for (i = 0; i < g.adjList.size(); ++i)
     {
         pLtv[i] = eTime; // 初始化
     }
     while (!sQ2.empty())
     {
         gettop = sQ2.top();
         sQ2.pop();                           // 将拓扑序列出栈，后进先出
         pNode = g.adjList[gettop].firstedge; // 边表头指针,pNode即改顶点后面连接的边表上的表头
         while (pNode != NULL)
         { // 求各顶点事件的最迟发生时间pLtv值
             k = pNode->adjvex;
             int lTime = pLtv[k];
             int newLTime = lTime - pNode->weight;
             if (pLtv[k] - pNode->weight < pLtv[gettop])
                 pLtv[gettop] = pLtv[k] - pNode->weight;
             pNode = pNode->next;
         }
     }
     // 求 ete, lte, 和 关键路径
     for (j = 0; j < g.adjList.size(); ++j)
     {
         pNode = g.adjList[j].firstedge;
         while (pNode != NULL)
         {
             k = pNode->adjvex;
             ete = pEtv[j];                 // 活动最早发生时间
             lte = pLtv[k] - pNode->weight; // 活动最迟发生时间
             if (ete == lte)
                 cout << "<V" << g.adjList[j].data << ",V" << g.adjList[k].data << "> :" << pNode->weight << endl;
             pNode = pNode->next;
         }
     }
 }
 */
// 关键路径
function criticalPath() {
  // pEtv  事件最早发生时间
  // PLtv  事件最迟发生时间
  let pNode = null;
  if (this.pEtv.length === 0) {
    this.topSort();
  }
  let pEtv = this.pEtv;
  let pLtv = new Array(this.vertices);
  let cPath = [];
  let cPathEdges = [];
  let i = 0, gettop = 0, k = 0, j = 0;
  let ete = 0, lte = 0; // 声明活动最早发生时间和最迟发生时间变量
  let eTime = pEtv[this.sQ2.top()];
  for (i = 0; i < this.vertices; ++i)
  {
    pLtv[i] = eTime; // 初始化
  }
  while (!this.sQ2.empty())
  {
    gettop = this.sQ2.top();
    this.sQ2.pop(); // 将拓扑序列出栈，后进先出
    pNode = this.adj[gettop].firstedge; // 边表头指针,pNode即改顶点后面连接的边表上的表头
    while (pNode !== null)
    { // 求各顶点事件的最迟发生时间pLtv值
      k = pNode.adjvex;
      if (pLtv[k] - pNode.weight < pLtv[gettop])
        pLtv[gettop] = pLtv[k] - pNode.weight;
      pNode = pNode.next;
    }
  }
  // 求 ete, lte, 和 关键路径
  for (j = 0; j < this.vertices; ++j)
  {
    pNode = this.adj[j].firstedge;
    while (pNode !== null)
    {
      k = pNode.adjvex;
      ete = pEtv[j];                 // 活动最早发生时间
      lte = pLtv[k] - pNode.weight; // 活动最迟发生时间
      if (ete === lte)
      {
        console.log("<" + this.adj[j].data.name + "," + this.adj[k].data.name + "> :" + pNode.weight);
        // if (cPath.length === 0) cPath.push(j)
        //   cPath.push(k);
        // 添加点
        if (cPath.length === 0) cPath.push(this.adj[j])
          cPath.push(this.adj[k]);
        // 添加边
        cPathEdges.push(pNode);
      }

      pNode = pNode.next;
    }
  }

  return {
    cPathByVertexes: cPath,
    cPathByEdges: cPathEdges
  };
}

//测试拓扑结构
/*g = new Graph(6);
g.addEdge(1, 2);
g.addEdge(2, 5);
g.addEdge(1, 3);
g.addEdge(1, 4);
g.addEdge(0, 1);
g.vertexList = ["CS1", "CS2", "Data Structures",
"Assembly Language", "Operating Systems",
"Algorithms"];
g.showGraph();
g.topSort();*/

//测试其他函数
/*g = new Graph(5);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(1,3);
g.addEdge(2,4);
var startVertices = 0;*/
//console.time('dfs');
//g.dfs(startVertices);            //用时4ms
//console.timeEnd('dfs');
//console.time('bfs');
//g.bfs(startVertices);              //用时16ms
//console.timeEnd('bfs');
//var endVertices = 2;   //从bfs的起点到vertex的最短路径
//var paths = g.pathTo(startVertices,endVertices);
//showShortDiatance(paths);
