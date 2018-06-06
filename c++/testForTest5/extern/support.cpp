#include <iostream>
 
extern int count2;
 
void write_extern(void)
{
   std::cout << "Count2 is " << count2 << std::endl; 
}