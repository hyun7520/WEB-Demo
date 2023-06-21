#include <string>
#include <vector>

using namespace std;

vector<int> solution(vector<string> park, vector<string> routes) 
{
    vector<int> answer;

    int dx[4] = {0, 0, 1, -1};
    int dy[4] = {-1,1, 0, 0};
    bool ok = false;
    pair<int, int> cur_pos;
    // [1]: w, [2]: E, [3]: S, [4]: N

    vector<vector<char>> map;
    for ( int i = 0; i < park.size(); i++)
    {
        for (int j = 0; j < park[i].length(); j++)
        {
            map[i].push_back(park[i].at(j));
            if (park[i].at(j) == 'S')
            {
                cur_pos = make_pair(i, j);
            }
        }
    }
    
    for (string move : routes)
    {
        string direction = move.substr(0, 1);

    }

    return answer;
}

int main()
{
    vector<string> park {"SOO","OOO","OOO"};
    vector<string> routes {"E 2","S 2","W 1"};

    for (int x : solution(park, routes))
    {
        printf("%d", x);
    }
}