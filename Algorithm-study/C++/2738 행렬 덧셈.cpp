// N*M크기의 두 행렬 A와 B가 주어졌을 때, 두 행렬을 더하는 프로그램을 작성하시오.

#include <iostream>
using namespace std;

int main()
{
    int N, M;

    scanf("%d%d", N, M);

    int arr[N][M];

    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < M; j++)
        {
            arr[i][j] = scanf("%d");
        }
    }
}