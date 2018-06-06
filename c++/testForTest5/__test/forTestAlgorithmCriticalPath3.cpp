#include <iostream>
#include <stack>
#include <stdlib.h>
#include <stdio.h>
#include <string>
#include <vector>
#include <map>
#include <sstream>
using namespace std;

#include "rapidjson/document.h"
#include "rapidjson/prettywriter.h"
#include "rapidjson/stringbuffer.h"
#include <cstdio>
#include "rapidjson/filereadstream.h"
#include "rapidjson/filewritestream.h"
#include <rapidjson/writer.h>
using namespace rapidjson;

#define MAXVEX 10
#define MAXEDGE 13

// 全局栈
stack<int> sQ2;

typedef struct EdgeNode
{
    int adjvex;            // 邻接点域，存储该顶点对应的下标
    int weight;            // 边的权值
    struct EdgeNode *next; // 链域
} EdgeNode;

typedef struct VertexNode
{
    int inNum;           // 顶点入度值
    string data;         // 顶点数值域
    EdgeNode *firstedge; // 边表头指针
} VertexNode;

typedef struct
{
    map<string, int> vertexIndexMap;
    vector<VertexNode> adjList;
    int numVertexes, numEdges; // 图中当前顶点数和边数
} graphAdjList, *GraphAdjList;

// 构建节点
EdgeNode *BuyNode()
{
    EdgeNode *p = (EdgeNode *)malloc(sizeof(EdgeNode));
    p->adjvex = -1;
    p->next = NULL;
    return p;
}
// 添加有向边
// 输入弧的信息（起点 终点 权值）
void addDirectedEdge(graphAdjList &g, int begin, int end, int weight)
{
    EdgeNode *pNode = NULL;
    pNode = BuyNode();
    pNode->adjvex = end;
    pNode->weight = weight;
    pNode->next = g.adjList[begin].firstedge;
    g.adjList[begin].firstedge = pNode;
    g.adjList[end].inNum++;
}
// 初始化图
void InitGraph(graphAdjList &g, int v)
{
    cout << "输入" << v << "个顶点信息（比如“事件0”）:" << endl;
    for (int i = 0; i < v; ++i)
    {
        VertexNode vertex;
        vertex.firstedge = NULL;
        vertex.inNum = 0;
        g.adjList.push_back(vertex);
        cin >> g.adjList[i].data;
    }
}
// 创建图
void CreateGraph(graphAdjList &g, int v, int e)
{
    InitGraph(g, v);
    int i = 0, begin = 0, end = 0, weight = 0;
    cout << "输入" << e << "条弧的信息（起点 终点 权值）：" << endl;
    for (i = 0; i < e; ++i)
    {
        cin >> begin >> end >> weight;
        addDirectedEdge(g, begin, end, weight);
    }
}
// 打印输入信息的逻辑图
void PrintGraph(graphAdjList &g)
{
    cout << "打印AOE网的邻接表逻辑图：" << endl;
    for (int i = 0; i < g.adjList.size(); ++i)
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
// 求拓扑序列
bool TopologicalSort(graphAdjList g, int *pEtv)
{
    EdgeNode *pNode = NULL;
    int i = 0, k = 0, gettop = 0;
    int nCnt = 0;
    stack<int> sQ1; // 用于排序的临时栈
    for (i = 0; i < g.adjList.size(); ++i)
    {
        pEtv[i] = 0;
        if (0 == g.adjList[i].inNum)
            sQ1.push(i);
    }
    while (!sQ1.empty()) // 如果栈为空，则结束循环
    {
        gettop = sQ1.top();
        sQ1.pop();        // 保存栈顶元素，并且栈顶元素出栈
        ++nCnt;           // 操作数加一，计数用于标记循环次数
        sQ2.push(gettop); // 将弹出的顶点序号压入拓扑序列的栈
        if (g.adjList.size() == nCnt)
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
    return nCnt == g.adjList.size();
}
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

int testJson()
{
    // 1. 把 JSON 解析至 DOM。
    const char *json = "{\"project\":\"rapidjson\",\"stars\":10}";
    Document d;
    d.Parse(json);
    // 2. 利用 DOM 作出修改。
    Value &s = d["stars"];
    s.SetInt(s.GetInt() + 1);
    // 3. 把 DOM 转换（stringify）成 JSON。
    StringBuffer buffer;
    Writer<StringBuffer> writer(buffer);
    d.Accept(writer);
    // Output {"project":"rapidjson","stars":11}
    std::cout << buffer.GetString() << std::endl;

    /*
    生成如下格式的json，并输出字符串
    {
      "name":"chenzuhuang",
      "sites":["http://www.chenzuhuang.com","http://blog.chenzuhuang.com"]
    }
    */
    Document document;
    Document::AllocatorType &allocator = document.GetAllocator();

    //根
    Value root(kObjectType);

    //一个值，类型为string
    Value name(kStringType);
    //设置value的值
    name.SetString("chenzuhuang", allocator);
    //将值name放到root中，并用"name"作为key
    root.AddMember("name", name, allocator);

    //一个值，类型为数组
    Value sites(kArrayType);
    //往数组里放元素
    sites.PushBack("http://www.chenzuhuang.com", allocator).PushBack("http://blog.chenzuhuang.com", allocator);
    //将数组放到root中，并用"sites"作为key
    root.AddMember("sites", sites, allocator);

    //输出字符串
    StringBuffer buffer2;
    Writer<StringBuffer> writer2(buffer2);
    root.Accept(writer2);
    string reststring = buffer2.GetString();
    cout << reststring << endl;

    // 测试文件流
    // FileReadStream（输入）
    FILE *fp;
#ifdef DEBUG
    // ./ 是工程根目录 等同于 ${workspaceRoot} 或 ${workspaceFolder} ？
    fp = fopen("./resources/big.json", "r"); // "rb"); // 非 Windows 平台使用 "r"
#else
    // 和 out 目录同层级
    fp = fopen("../resources/big.json", "r"); // "rb"); // 非 Windows 平台使用 "r"
#endif
    char readBuffer[65536];
    FileReadStream is(fp, readBuffer, sizeof(readBuffer));
    d.ParseStream(is);
    fclose(fp);
    Value &obj = d["data"]["edgeList"][0];

    //输出字符串
    StringBuffer buffer3;
    Writer<StringBuffer> writer3(buffer3);
    obj.Accept(writer3);
    cout << "first object of list:" << buffer3.GetString() << endl;
    // FileWriteStream（输出）
#ifdef DEBUG
    // ./ 是工程根目录 等同于 ${workspaceRoot} 或 ${workspaceFolder} ？
    fp = fopen("./resources/output.json", "w"); // "wb"); // 非 Windows 平台使用 "w"
#else
    // 和 out 目录同层级
    fp = fopen("../resources/output.json", "w"); // "wb"); // 非 Windows 平台使用 "w"
#endif
    char writeBuffer[65536];
    FileWriteStream os(fp, writeBuffer, sizeof(writeBuffer));
    Writer<FileWriteStream> writer4(os);
    d.Accept(writer4);
    fclose(fp);

    return 0;
}

// 从 json 初始化图
void InitGraphFromDocument(graphAdjList &g, Document &d)
{
    SizeType v = 0;
    Value &vertexList = d["data"]["vertexList"];
    if (vertexList.IsArray())
    {
        v = vertexList.Size();
    }
    else
    {
        return;
    }
    for (SizeType i = 0; i < v; ++i)
    {
        Value &item = vertexList[i];
        VertexNode vertex;
        vertex.data = item["code"].GetString();
        vertex.inNum = 0;
        vertex.firstedge = NULL;
        g.adjList.push_back(vertex);
        g.vertexIndexMap[vertex.data] = i;
    }
}
// 从 json 创建图
void CreateGraphFromDocument(graphAdjList &g, Document &d)
{
    InitGraphFromDocument(g, d);
    SizeType e = 0;
    Value &edgeList = d["data"]["edgeList"];
    if (edgeList.IsArray())
    {
        e = edgeList.GetArray().Size();
    }
    else
    {
        return;
    }
    string begin, end;
    int beginIndex = 0, endIndex = 0, weight = 0;
    EdgeNode *pNode = NULL;
    for (SizeType i = 0; i < e; i++) // 使用 SizeType 而不是 size_t
    {
        Value &item = edgeList[i];
        begin = item["relation"]["startPoint"].GetString();
        end = item["relation"]["endPoint"].GetString();
        stringstream stream(item["relation"]["length"].GetString());
        stream >> weight;
        beginIndex = g.vertexIndexMap[begin];
        endIndex = g.vertexIndexMap[end];
        addDirectedEdge(g, beginIndex, endIndex, weight);
    }
    cout << " 总顶点数:" << g.adjList.size() << " 总边数:" << e << endl;
}
void CreateGraphFromJson(graphAdjList &g, string jsonString)
{
    Document d;
    d.Parse(jsonString.c_str());
    CreateGraphFromDocument(g, d);
}
// 从文件读取 json 创建图
void CreateGraphFromJsonFile(graphAdjList &g, string filePath)
{
    Document d;
    // FileReadStream（输入）
    FILE *fp;
#ifdef DEBUG
    // ./ 是工程根目录 等同于 ${workspaceRoot} 或 ${workspaceFolder} ？
    fp = fopen(filePath.c_str(), "r"); // "rb"); // 非 Windows 平台使用 "r"
#else
    // 和 out 目录同层级
    fp = fopen(filePath.c_str(), "r"); // "rb"); // 非 Windows 平台使用 "r"
#endif
    char readBuffer[65536];
    FileReadStream is(fp, readBuffer, sizeof(readBuffer));
    d.ParseStream(is);
    fclose(fp);
    CreateGraphFromDocument(g, d);
}

int testAlgorithmCriticalPathFromJson()
{
    graphAdjList myg;
    cout << "创建图：" << endl;
#ifdef DEBUG
    // ./ 是工程根目录 等同于 ${workspaceRoot} 或 ${workspaceFolder} ？
    string filePath = "./resources/big.json";
#else
    // 和 out 目录同层级
    string filePath = "../resources/big.json";
#endif
    CreateGraphFromJsonFile(myg, filePath);
    cout << "打印图的邻接表逻辑结构：" << endl;
    PrintGraph(myg);

    int size = myg.adjList.size();
    int *pEtv = new int[size];
    int *pLtv = new int[size];

    cout << "求拓扑序列(全局栈sQ2的值)：" << endl;
    bool valid = TopologicalSort(myg, pEtv);
    if (!valid)
    {
        cout << "此图有环，无拓扑序列" << endl;
        return -1;
    }
    cout << "打印数组pEtv(各个事件的最早发生时间)：" << endl;
    for (int i = 0; i < size; ++i)
    {
        cout << pEtv[i] << " ";
    }
    cout << endl
         << "关键路径：" << endl;

    CriticalPath(myg, pEtv, pLtv);
    cout << endl;
    cout << "打印数组pLtv(各个事件的最晚发生时间)：" << endl;
    for (int i = 0; i < size; ++i)
    {
        cout << pLtv[i] << " ";
    }
    cout << endl;
    return 0;
}

int testAlgorithmCriticalPath()
{
    graphAdjList myg;
    int vNum = MAXVEX, eNum = MAXEDGE;
    cout << "请先画VOE(Activity On Edge)网图: 边表示活动的网。AOE网是一个带权的有向无环图。" << endl;
    cout << "(点代表事件，边代表活动，方向代表先后顺序，边上的权重可以代表活动计划用时)" << endl;
    cout << "然后根据VOE图输入数据" << endl;
    cout << "比如\n"
        "输入顶点数和边数:\n"
        "10 13\n"
        "输入10个顶点信息（比如“事件0”）:\n"
        "0\n"
        "1\n"
        "2\n"
        "3\n"
        "4\n"
        "5\n"
        "6\n"
        "7\n"
        "8\n"
        "9\n"
        "输入13条弧的信息（起点 终点 权值）：\n"
        "0 1 3\n"
        "0 2 4\n"
        "1 3 5\n"
        "1 4 6\n"
        "2 3 8\n"
        "2 5 7\n"
        "3 4 3\n"
        "4 6 9\n"
        "4 7 4\n"
        "5 7 6\n"
        "6 9 2\n"
        "7 8 5\n"
        "8 9 3\n" << endl;
    cout << "输入顶点数和边数:" << endl;
    cin >> vNum >> eNum;
    cout << "创建图：" << endl;
    CreateGraph(myg, vNum, eNum);
    cout << "打印图的邻接表逻辑结构：" << endl;
    PrintGraph(myg);

    int size = myg.adjList.size();
    int *pEtv = new int[size];
    int *pLtv = new int[size];

    cout << "求拓扑序列(全局栈sQ2的值)：" << endl;
    TopologicalSort(myg, pEtv);
    cout << "打印数组pEtv(各个事件的最早发生时间)：" << endl;
    for (int i = 0; i < size; ++i)
    {
        cout << pEtv[i] << " ";
    }
    cout << endl
         << "关键路径：" << endl;

    CriticalPath(myg, pEtv, pLtv);
    cout << endl;
    cout << "打印数组pLtv(各个事件的最晚发生时间)：" << endl;
    for (int i = 0; i < size; ++i)
    {
        cout << pLtv[i] << " ";
    }
    cout << endl;
    return 0;
}
/*
创建图：
输入10个顶点信息（顶点 入度）:
0 0
1 1
2 1
3 2
4 2
5 1
6 1
7 2
8 1
9 2
输入13条弧的信息（起点 终点 权值）：
0 1 3
0 2 4
1 3 5
1 4 6
2 3 8
2 5 7
3 4 3
4 6 9
4 7 4
5 7 6
6 9 2
7 8 5
8 9 3
打印图的邻接表逻辑结构：
打印AOE网的邻接表逻辑图：
0 0 -->[2 4] [1 3]
1 1 -->[4 6] [3 5]
1 2 -->[5 7] [3 8]
2 3 -->[4 3]
2 4 -->[7 4] [6 9]
1 5 -->[7 6]
1 6 -->[9 2]
2 7 -->[8 5]
1 8 -->[9 3]
2 9 -->
求拓扑序列(全局栈sQ2的值)：
0-->1-->2-->3-->4-->6-->5-->7-->8-->9
打印数组pEtv(各个事件的最早发生时间)：
0 3 4 12 15 11 24 19 24 27
关键路径：
<V0,V2> :4
<V2,V3> :8
<V3,V4> :3
<V4,V7> :4
<V7,V8> :5
<V8,V9> :3
 */