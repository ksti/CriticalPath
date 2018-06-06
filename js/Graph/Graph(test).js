/**
 * Created by chenhaoact on 16/8/18.
 */
/**
 * 1.图
 * 图由边的集合及顶点的集合组成
 *
 * 环:由指向自身的顶点组成的路径称为环， 环的长度为 0
 * 圈:至少有一条边的路径， 且路径的第一个顶点和最后一个顶点相同
 * 简单圈:没有重复边或重复顶点的圈
 * 平凡圈:除了第一个和最后一个顶点以外， 路径的其他顶点有重复的圈
 * 顶点强相连:两个顶点之间有路径， 那么这两个顶点就是强连通
 *          如果有向图的所有的顶点都是强连通的， 那么这个有向图也是强连通的.
 *
 * 适用:
 * 对交通流量建模， 顶点可以表示街道的十字路口， 边可以表示街道。
 * 加权的边可以表示限速或者车道的数量。 判 最佳路线及最有可能堵车的街道。
 * 任何运输系统都可以用图来建模。
 * 航空公司可以用图来为其飞行系统建模。
 *
 * 包含局域网和广域网（ 如互联网） 在内的计算机网络， 同样经常用图来建模。
 *
 * 消费市场， 顶点可以用来表示供应商和消费者
 *
 * 常用于解决的问题:
 * 查找最短路径
 *
 * */

/**
 * 2.Vertex 类来保存顶点和边。
 * 这个类的作用与链表和二叉搜索树的 Node 类一样。
 * Vertex 类有两个数据成员：
 * label:一个用于标识顶点
 * wasVisited:顶点是否被访问过的布尔值
 * 将所有顶点保存到数组中， 在图类里， 可以通过它们在数组中的位置引用它们
 * */
function Vertex(label) {
  this.label = label;
}

/**
 * 3.
 * 构建图类
 *
 * 表示图的边的方法
 * 法一:邻接表(邻接表数组)。
 * 存储 每个顶点的所有相邻顶点的列表(数组) 构成的数组， 该顶点作为索引
 * 这样就知道了定点和哪些顶点连成边
 *
 * 法二:邻接矩阵。
 * 一个二维数组， 其中的元素表示两个顶点之间是否有一条边。
 *
 * 下面的图类:
 * 属性:
 * vertices 节点数, Graph(v)传入的v是节点数
 * edges 边数
 * adj (邻接表数组,这里使用了法一,一个二维数组,每个节点的邻接节点数组组成的数组)
 * marked 数组,存储已访问过的顶点
 * edgeTo 一个数组,保存从一个顶点到下一个顶点的所有边
 * 方法:
 * addEdge(节点1,节点2) 添加一条边
 * showGraph() 打印所有顶点及其相邻顶点列表的方式来显示图
 * dfs(节点) 深度优先的遍历得到该节点所有能到达的路径上的所有节点
 * bfs(节点) 广度优先的遍历得到该节点所有能到达的路径上的所有节点
 * */
function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  //通过 for 循环为数组中的每个元素添加一个子数组来存储所有的相邻顶点， 并将所有元素初始化为空字符串
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
    this.adj[i].push("");
  }

  this.marked = [];
  for (var i = 0; i < this.vertices; ++i ) {
    this.marked[i] = false;
  }
  this.edgeTo = [];

  this.addEdge = addEdge;
  this.showGraph = showGraph;
  this.dfs = dfs;
  this.bfs = bfs;
}

/**
 * 4.
 * 传入顶点 A 和 B 时， 函数会先查找顶点 A 的邻接表， 将顶点 B 添加到列
 * 表中， 然后再查找顶点 B 的邻接表， 将顶点 A 加入列表。 最后， 这个函数会将边数加 1
 * */
function addEdge(v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges++;
}

/**
 * 5.
 * 打印所有顶点及其相邻顶点列表的方式来显示图
 * */
function showGraph() {
  for (var i = 0; i < this.vertices; ++i) {
    putstr(i + "->");
    for (var j = 0; j < this.vertices; ++j) {
      if (this.adj[i][j] != undefined)
        putstr(this.adj[i][j] + ' ');
    }
    print();
  }
}

//测试
// g = new Graph(5);
// g.addEdge(0,1);
// g.addEdge(0,2);
// g.addEdge(1,3);
// g.addEdge(2,4);
// g.showGraph();

/*
 0 -> 1 2
 1 -> 0 3
 2 -> 0 4
 3 -> 1
 4 -> 2
 输出显示， 顶点 0 有到顶点 1 和顶点 2 的边； 顶点 1 有到顶点 0 和顶点 3 的边
* */

/**
 * 6.
 *
 * 深度优先搜索算法比较简单： 访问一个没有访问过的顶点， 将它标记为已访问， 再递归地
 * 去访问在初始顶点的邻接表中其他没有访问过的顶点,如此往复， 直到没有路径为止。 这不是在搜
 * 索特定的路径， 而是通过搜索来查看在图中有哪些路径可以选择
 *
 * dfs(节点): 深度优先的遍历该节点开始所有能到达的路径,并显示从该节点能到达(访问)的所有节点
 * */
function dfs(v) {
  this.marked[v] = true;
// 用于输出的 if 语句在这里不是必须的
  if (this.adj[v] != undefined)
    print("Visited vertex: " + v);
  for (var w in this.adj[v]) {
    if (!this.marked[w]) {
      this.dfs(w);
    }
  }
}

//测试深度优先 dfs()
// g = new Graph(5);
// g.addEdge(0, 1);
// g.addEdge(0,2);
// g.addEdge(1,3);
// g.addEdge(2,4);
// g.showGraph();
// g.dfs(0);

/*
 0 -> 1 2
 1 -> 0 3
 2 -> 0 4
 3 -> 1
 4 -> 2
 Visited vertex: 0
 Visited vertex: 1
 Visited vertex: 3
 Visited vertex: 2
 Visited vertex: 4
 从节点0开始能访问到的节点有 0 1 2 3 4
*/

//测试广度优先
// g = new Graph(5);
// g.addEdge(0, 1);
// g.addEdge(0, 2);
// g.addEdge(1, 3);
// g.addEdge(2, 4);
// g.showGraph();
// g.bfs(0);

/*
 0 -> 1 2
 1 -> 0 3
 2 -> 0 4
 3 -> 1
 4 -> 2
 Visited vertex: 0
 Visited vertex: 1
 Visited vertex: 2
 Visited vertex: 3
 Visited vertex: 4
* */
