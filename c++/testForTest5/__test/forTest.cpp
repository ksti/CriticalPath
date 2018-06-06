#include <iostream>
#include <cmath>
#include <ctime>
#include <cstdlib>
#include <unistd.h>
#include <cstring>
#include <string>

using namespace std;
#include <bitset>
using std::bitset;
#include <iomanip>
using std::setw;

#include <exception>

#include "support.cpp"
#include "forTestAlgorithmToposort.cpp"
#include "forTestAlgorithmCriticalPath3.cpp"

// 函数声明
void func(void);
extern void write_extern();
void printNewLine(string str);

static int staticCount = 10; /* 全局变量 */
int count2;

int forTest(int argc, char *argv[])
{
    while (staticCount--) // if using namespace std, "count" is ambiguous
    {
        func();
    }

    write_extern();
    count2 = 5;
    write_extern();

    // 测试结构体
    printNewLine("------ for test ------");
    // printNewLine("------ 测试拓扑排序 ------");
    // testAlgorithmToposort();
    printNewLine("------ 测试关键路径 ------");
    testAlgorithmCriticalPath();
    // testJson();
    // testAlgorithmCriticalPathFromJson();

    return 0;
}
// 函数定义
void func(void)
{
    static int i = 5; // 局部静态变量
    i++;
    std::cout << "变量 i 为 " << i;
    std::cout << " , 变量 static count 为 " << staticCount << std::endl;
}
void printNewLine(string str)
{
    std::cout << std::endl
              << str << std::endl;
}
