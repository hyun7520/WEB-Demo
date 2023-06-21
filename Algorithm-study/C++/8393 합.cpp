// n이 주어졌을 때, 1부터 n까지 합을 구하는 프로그램을 작성하시오.

#include <iostream>
using namespace std;

int main()
{
    int n, ans;

    scanf("%d", &n);
    ans = 0;
    for (int i = 1; i <= n; i++)
    {
        ans += i;
    }
    printf("%d", ans);
}