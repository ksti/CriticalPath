#include <iostream>
#include <string>

using namespace std;

#include"topological_sort.cpp"

/*
// 根据以上分析，给出拓扑排序算法的具体描述为：
void Toposort(adjlist GL, int n)
//对用邻接表GL表示的有向图进行拓扑排序
{
    int i, j, k, top, m = 0; //m用来统计拓扑序列中的顶点数
    edgenode *p;
    //定义存储图中每个顶点入度的一维整型数组d
    int *d = new int[n];
    //初始化数组d中的每个元素值为0
    for (i = 0; i < n; i++)
        d[i] = 0;
    //利用数组d中的对应元素统计出每个顶点的入度
    for (i = 0; i < n; i++)
    {
        p = GL[i];
        while (p != NULL)
        {
            j = p->adjvex;
            d[j]++;
            p = p->next;
        }
    }

    //初始化用于链接入度为0的元素的栈的栈顶指针top为-1

    top = -1;

    //建立初始化栈
    for (i = 0; i < n; i++)
        if (d[i] == 0)
        {
            d[i] = top;
            top = i;
        }
    //每循环一次删除一个顶点及所有出边
    while (top != -1)
    {
        j = top; //j的值为一个入度为0的顶点序号
        top = d[top]; //删除栈顶元素
        cout << j << ' '; //输出一个顶点
        m++; //输出的顶点个数加1
        p = GL[j]; //p指向vj邻接点表的第一个结点
        while (p != NULL)
        {
            k = p->adjvex; //vk是vj的一个邻接点
            d[k]--; //vk的入度减1
            if (d[k] == 0)
            { //把入度为0的元素进栈
                d[k] = top;
                top = k;
            }
            p = p->next; //p指向vj邻接点表的下一个结点
        }
    }

    cout << endl;

    if (m < n)
        //当输出的顶点数小于图中的顶点数时，输出有回路信息
        cout << "The network has a cycle!" << endl;
}
*/

//检验输入边数和顶点数的值是否有效，可以自己推算为啥：
//顶点数和边数的关系是：((Vexnum*(Vexnum - 1)) / 2) < edge
bool check(int Vexnum, int edge) {
    if (Vexnum <= 0 || edge <= 0 || ((Vexnum*(Vexnum - 1)) / 2) < edge)
        return false;
    return true;
}
int testAlgorithmToposort() {
    int vexnum; int edge;


    cout << "输入图的顶点个数和边的条数：" << endl;
    cin >> vexnum >> edge;
    while (!check(vexnum, edge)) {
        cout << "输入的数值不合法，请重新输入" << endl;
        cin >> vexnum >> edge;
    }
    Graph_DG graph(vexnum, edge);
    graph.createGraph();
    graph.print();
    graph.topological_sort();
    graph.topological_sort_by_dfs();
    // system("pause");
    // 按任意键继续...
    cout << "Press any key to continue . . ." << endl;
    cin.get();
    return 0;

}