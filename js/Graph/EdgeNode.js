/**
 * Created by GJS on 18/5/30.
 */

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

// 定义边节点
export default function EdgeNode(){
  this.adjvex = -1;      // 邻接点域，存储该顶点对应的下标
  this.weight = 0;       // 边的权值
  this.data = {};        // 边附加信息
  this.next = null;      // 链域
}
