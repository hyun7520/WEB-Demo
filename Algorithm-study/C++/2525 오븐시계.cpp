#include <iostream>
using namespace std;

int main()
{
    int A, B, C;

    scanf("%d%d", &A, &B);
    scanf("%d", &C);

    int min = A * 60 + B + C;

    A = min / 60 % 24;
    B = min % 60;

    // if (B + C > 60)
    // {   
    //     B = B+C;
    //     A += B/60;
    //     B = 0 + (B%60);
    //     if (B == 60)
    //     {
    //         B = 0;
    //     }
    //     if (A > 23)
    //     {
    //         A -= 24;
    //     }
    // }
    // else
    // {
    //     B += C;
    // }

    printf("%d%s%d", A, " ", B);

    return 0;
}