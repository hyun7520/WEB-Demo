// N을 입력받은 뒤, 구구단 N단을 출력하는 프로그램을 작성하시오. 출력 형식에 맞춰서 출력하면 된다.

#include <iostream>
using namespace std;

int main()
{   
    int N;

    scanf("%d", &N);

    for (int i = 1; i < 10; i++)
    {
 
        printf("%d * %d = %d\n", N, i, N*i);
    }

    return 0;
}
