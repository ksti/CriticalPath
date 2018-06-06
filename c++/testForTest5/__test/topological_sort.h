/************************************************************/
/*                程序作者：Willam                          */
/*                程序完成时间：2017/3/6                    */
/*                有任何问题请联系：2930526477@qq.com       */
/************************************************************/
//@尽量写出完美的程序

#pragma once
//#pragma once是一个比较常用的C/C++杂注，
//只要在头文件的最开始加入这条杂注，
//就能够保证头文件只被编译一次。

/*
拓扑排序必须是对有向图的操作
算法实现：
（1）Kahn算法
（2）DFS算法
采用邻接表存储图
*/
#include<iostream>
#include<string>
#include<stack>
#include <stdlib.h>
using namespace std;
//表结点
struct ArcNode {
    ArcNode * next; //下一个关联的边
    int adjvex;   //保存弧尾顶点在顶点表中的下标
};
struct Vnode {
    string data; //顶点名称
    ArcNode * firstarc; //第一个依附在该顶点边
};

class Graph_DG {
private:
    int vexnum; //图的顶点数
    int edge;   //图的边数
    int * indegree; //每条边的入度情况
    Vnode * arc; //邻接表
public:
    Graph_DG(int, int);
    ~Graph_DG();
    //检查输入边的顶点是否合法
    bool check_edge_value(int,int);
    //创建一个图
    void createGraph();
    //打印邻接表
    void print();
    //进行拓扑排序,Kahn算法
    bool topological_sort();
    //进行拓扑排序，DFS算法
    bool topological_sort_by_dfs();
    void dfs(int n,bool * & visit, stack<string> & result);
};