#include"topological_sort.h"

Graph_DG::Graph_DG(int vexnum, int edge) {
    this->vexnum = vexnum;
    this->edge = edge;
    this->arc = new Vnode[this->vexnum];
    this->indegree = new int[this->vexnum];
    for (int i = 0; i < this->vexnum; i++) {
        this->indegree[i] = 0;
        this->arc[i].firstarc = NULL;
        this->arc[i].data = "v" + to_string(i + 1);
    }
}
//释放内存空间
Graph_DG::~Graph_DG() {
    ArcNode * p, *q;
    for (int i = 0; i < this->vexnum; i++) {
        if (this->arc[i].firstarc) {
            p = this->arc[i].firstarc;
            while (p) {
                q = p->next;
                delete p;
                p = q;
            }
        }
    }
    delete [] this->arc;
    delete [] this->indegree;
}
//判断我们每次输入的的边的信息是否合法
//顶点从1开始编号
bool Graph_DG::check_edge_value(int start, int end) {
    if (start<1 || end<1 || start>vexnum || end>vexnum) {
        return false;
    }
    return true;
}
void Graph_DG::createGraph() {
    int count = 0;
    int start, end;
    cout << "输入每条起点和终点的顶点编号（从1开始编号）" << endl;
    while (count != this->edge) {
        cin >> start;
        cin >> end;
        //检查边是否合法
        while (!this->check_edge_value(start, end)) {
            cout << "输入的顶点不合法，请重新输入" << endl;
            cin >> start;
            cin >> end;
        }
        //声明一个新的表结点
        ArcNode * temp = new ArcNode;
        temp->adjvex = end - 1;
        temp->next = NULL;
        //如果当前顶点的还没有边依附时，
        if (this->arc[start - 1].firstarc == NULL) {
            this->arc[start - 1].firstarc = temp;
        }
        else {
            ArcNode * now = this->arc[start - 1].firstarc;
            while(now->next) {
                now = now->next;
            }//找到该链表的最后一个结点
            now->next = temp;
        }
        ++count;
    }
}
void Graph_DG::print() {
    int count = 0;
    cout << "图的邻接矩阵为：" << endl;
    //遍历链表，输出链表的内容
    while (count != this->vexnum) {
        //输出链表的结点
        cout << this->arc[count].data<<" ";
        ArcNode * temp = this->arc[count].firstarc;
        while (temp) {
            cout<<"<"<< this->arc[count].data<<","<< this->arc[temp->adjvex].data<<"> ";
            temp = temp->next;
        }
        cout << "^" << endl;
        ++count;
    }
}

bool Graph_DG::topological_sort() {
    cout << "图的拓扑序列为：" << endl;
    //栈s用于保存栈为空的顶点下标
    stack<int> s;
    int i;
    ArcNode * temp;
    //计算每个顶点的入度，保存在indgree数组中
    for (i = 0; i != this->vexnum; i++) {
        temp = this->arc[i].firstarc;
        while (temp) {
            ++this->indegree[temp->adjvex];
            temp = temp->next;
        }

    }

    //把入度为0的顶点入栈
    for (i = 0; i != this->vexnum; i++) {
        if (!indegree[i]) {
            s.push(i); 
        }
    }
    //count用于计算输出的顶点个数
    int count=0;
    while (!s.empty()) {//如果栈为空，则结束循环
        i = s.top();
        s.pop();//保存栈顶元素，并且栈顶元素出栈
        cout << this->arc[i].data << " ";//输出拓扑序列
        temp = this->arc[i].firstarc;
        while (temp) {
            if (!(--this->indegree[temp->adjvex])) {//如果入度减少到为0，则入栈
                s.push(temp->adjvex);
            }
            temp = temp->next;
        }
        ++count;
    }
    if (count == this->vexnum) {
        cout << endl;
        return true;
    } 
    cout << "此图有环，无拓扑序列" << endl;
    return false;//说明这个图有环
}
bool Graph_DG::topological_sort_by_dfs() {
    stack<string> result;
    int i;
    bool * visit = new bool[this->vexnum];
    //初始化我们的visit数组
    memset(visit, 0, this->vexnum);
    cout << "基于DFS的拓扑排序为：" << endl;
    //开始执行DFS算法
    for (i = 0; i < this->vexnum; i++) {
        if (!visit[i]) {
            dfs(i, visit, result);
        }
    }
    //输出拓扑序列，因为我们每次都是找到了出度为0的顶点加入栈中，
    //所以输出时其实就要逆序输出，这样就是每次都是输出入度为0的顶点
    for (i = 0; i < this->vexnum; i++) {
        cout << result.top() << " ";
        result.pop();
    }
    cout << endl;
    return true;
}
void Graph_DG::dfs(int n, bool * & visit, stack<string> & result) {

        visit[n] = true;
        ArcNode * temp = this->arc[n].firstarc;
        while (temp) {
            if (!visit[temp->adjvex]) {
                dfs(temp->adjvex, visit,result);
            }
            temp = temp->next;
        }
        //由于加入顶点到集合中的时机是在dfs方法即将退出之时，
        //而dfs方法本身是个递归方法，
        //仅仅要当前顶点还存在边指向其他不论什么顶点，
        //它就会递归调用dfs方法，而不会退出。
        //因此，退出dfs方法，意味着当前顶点没有指向其他顶点的边了
        //，即当前顶点是一条路径上的最后一个顶点。
        //换句话说其实就是此时该顶点出度为0了
        result.push(this->arc[n].data);

}