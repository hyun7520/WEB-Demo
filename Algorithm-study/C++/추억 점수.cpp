#include <string>
#include <vector>
#include <map>
using namespace std;

vector<int> solution(vector<string> name, vector<int> yearning, vector<vector<string>> photo) 
{
    vector<int> answer;
    map<string, int> score;
    int total;

    for (int i = 0; i < name.size(); i++)
    {   
        score.insert({name.at(i), yearning.at(i)});
    }

    for (int i = 0; i < photo.size(); i++)
    {   
        total = 0;
        for (int j = 0; j < photo[i].size(); j++)
        {   
            if (score.find(photo[i].at(j)) != score.end())
            {
                auto point = score.find(photo[i].at(j));
                total += point->second;
            } 
        }
        answer.push_back(total);
    }

    return answer;
}

int main()
{
    vector<string> name {"may", "kein", "kain", "radi"};
    vector<int> yearning {5, 10, 1, 3};
    vector<vector<string>> photo {{"may", "kein", "kain", "radi"},{"may", "kein", "brin", "deny"},
     {"kon", "kain", "may", "coni"}};

    for (int x :solution(name, yearning, photo))
    {
        printf("%d, ", x);
    }
}