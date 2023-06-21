#include <string>
#include <vector>
#include <map>

using namespace std;

vector<string> solution(vector<string> players, vector<string> callings) 
{
    vector<string> answer;
    map<int, string> runners;
    string current;
    for (int i = 0; i < players.size(); i++)
    {
        runners.insert({i, players.at(i)});
    }

    for (int i = 0; i < callings.size(); i++)
    {
        current = callings.at(i);
        
    }

    return answer;
}
