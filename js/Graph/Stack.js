/**
 * Created by chenhaoact on 16/8/14.
 */
/**
 * 1.栈是一种高效的数据结构， 因为数据只能在栈顶添加或删除， 所以这样的操作很快
 * 栈是一种特殊的列表， 栈内的元素只能通过列表的一端访问， 这一端称为栈顶。
 * 一摞盘子是现实世界中常见的栈的例子.
 * 栈具有后入先出的特点， 所以任何不在栈顶的元素都无法访问。
 * 为了得到栈底的元素， 必须先拿掉上面的元素。
 *
 * 属性:
 * top  栈数组的第一个空位置 = 栈顶元素的位置+1 ,top处是空的,它处于栈顶元素之上  (top从0开始,0代表在栈底,及栈是空的)，同时也为了标记哪里可以加入新元素，当向栈内压入元素时， 该变量增大
 * 即:第 栈顶元素的 数组下标是 top - 1
 * empty 栈内是否含有元素,用 length 属性也可以达到同样的目的
 *
 * 方法:
 * push() 元素入栈，
 * pop() 元素出栈,(也可以访问栈顶的元素，但是调用该方法后，栈顶元素被删除)
 * peek() 预览栈顶元素,只返回栈顶元素，不删除它。
 * top()  预览栈顶元素,只返回栈顶元素，不删除它。
 * length() 返回栈内元素的个数(top应该是等于数组的length的,所以用top属性也可)
 * clear() 清除栈内所有元素
 * empty() 返回栈是否为空
 * */
//栈类的构造函数
export default function Stack() {
  this.dataStore = []; //底层数据结构是数组
  this._top = 0; //top应该是等于数组的length的
  this.top = top;
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.length = length;
  this.clear = clear;
  this.empty = empty;
}

/**
 * 2. push()
 * 向栈中压入一个新元素， 需要将其保存在数组中变量 top 所对
 * 应的位置， 然后将 top 值加 1， 让top指向数组中下一个空位置
 * 特别注意 ++ 操作符的位置， 它放在 this.top 的后面， 这样新入栈的元素就被放在
 * top 的当前值对应的位置， 然后再将变量 top 的值加 1， 指向下一个位置
 * */
function push(element) {
  this.dataStore[this._top++] = element;
}

/**
 * 3. pop()
 * pop() 方法恰好与 push() 方法相反——它返回栈顶元素， 同时将变量 top 的值减 1
 * 也可以改造一下,只--this.top,不返回栈顶元素
 * */
function pop() {
  return this.dataStore[--this._top];
}

/**
 * 4. peek()
 * peek() 方法返回数组的第 top-1 个位置的元素， 即栈顶元素
 * */
function peek() {
  return this.dataStore[this._top-1];
}

function length(){
  return this._top;
}

function clear() {
  this._top = 0;
}

function empty() {
  return this._top === 0;
}

function top() {
  return this.peek();
}

/**
 * 5.测试 Stack 类的实现
 * */
// var s = new Stack();
// s.push("David");
// s.push("Raymond");
// s.push("Bryan");
// print("length: " + s.length());
// print(s.peek());
// var popped = s.pop();
// print("The popped element is: " + popped);
// print(s.peek());
// s.push("Cynthia");
// print(s.peek());
// s.clear();
// print("length: " + s.length());
// print(s.peek());
// s.push("Clayton");
// print(s.peek());

/**
 * 6.栈的应用一:数字进制间的相互转换
 *
 * 利用栈将一个数字从一种数制转换成另一种数制。
 * 假设想将数字 n 转换为以 b 为基数
 * 的数字， 实现转换的算法如下:
 * (1) 最高位为 n % b， 将此位压入栈。
 * (2) 使用 n/b 代替 n。
 * (3) 重复步骤 1 和 2， 直到 n 等于 0， 且没有余数。
 * (4) 持续将栈内元素弹出， 直到栈为空， 依次将这些元素排列， 就得到转换后数字的字符
 * 串形式。
 *
 * 下面就是该函数的定义， 可以将十进制的数字转化为二至九进制的数字：
 * */
// function mulBase(num, base) {
//   var s = new Stack();
//   do {
//     s.push(num % base);
//     num = Math.floor(num /= base);
//   } while (num > 0);
//   var converted = "";
//   while (s.length() > 0) {
//     converted += s.pop();
//   }
//   return converted;
// }
//
// //将数字转换为二进制和八进制
// function mulBase(num, base) {
//   var s = new Stack();
//   do {
//     s.push(num % base);
//     num = Math.floor(num /= base);
//   } while (num > 0);
//   var converted = "";
//   while (s.length() > 0) {
//     converted += s.pop();
//   }
//   return converted;
// }
// var num = 32;
// var base = 2;
// var newNum = mulBase(num, base);
// print(num + " converted to base " + base + " is " + newNum);
// num = 125;
// base = 8;
// var newNum = mulBase(num, base);
// print(num + " converted to base " + base + " is " + newNum);
// //输出: 32 converted to base 2 is 100000  125 converted to base 8 is 175

// ToDo: 而二进制转10进制和16进制怎么转?

/**
 * 7.栈的应用二: 回文
 * 使用栈，可以轻松判断一个字符串是否是回文。 将拿到的字符串的每个字符按从左至
 * 右的顺序压入栈。 当字符串中的字符都入栈后， 栈内就保存了一个反转后的字符串， 最后
 * 的字符在栈顶， 第一个字符在栈底.
 *
 * 字符串完整压入栈内后， 通过持续弹出栈中的每个字母就可以得到一个新字符串， 该字符
 * 串刚好与原来的字符串顺序相反。 我们只需要比较这两个字符串即可， 如果它们相等， 就
 * 是一个回文。
 * */
// //下例是一个利用前面定义的 Stack 类， 判断给定字符串是否是回文的程序。
// function isPalindrome(word) {
//   var s = new Stack();
//   for (var i = 0; i < word.length; ++i) {
//     s.push(word[i]);
//   }
//   var rword = "";
//   while (s.length() > 0) {
//     rword += s.pop();
//   }
//   if (word == rword) {
//     return true;
//   }
//   else {
//     return false;
//   }
// }
// var word = "hello";
// if (isPalindrome(word)) {
//   print(word + " is a palindrome.");
// }
// else {
//   print(word + " is not a palindrome.");
// }
// word = "racecar"
// if (isPalindrome(word)) {
//   print(word + " is a palindrome.");
// }
// else {
//   print(word + " is not a palindrome.");
// }

/**
 * 8.递归与使用栈模拟递归过程
 * 栈常常被用来实现编程语言， 使用栈实现递归即为一例
 * */
// //斐波那契递归
// function factorial(n) {
//   if (n === 0) {
//     return 1;
//   }
//   else {
//     return n * factorial(n-1);
//   }
// }
//
// print(factorial(5));
//
// //使用栈模拟上面的递归
// function fact(n) {
//   var s = new Stack();
//   while (n > 1) {
//     s.push(n--);
//   }
//   var product = 1;
//   while (s.length() > 0) {
//     product *= s.pop();
//   }
//   return product;
// }
// print(fact(5));
