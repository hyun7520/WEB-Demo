#include <string>
#include <vector>

using namespace std;

vector<string> split(string data, string sep) 
{
    vector<string> vec;

    int idx;
    string tmp;
    while ( (idx = data.find(sep)) != string::npos )
    {
        tmp = data.substr(0, idx);
        vec.push_back(tmp);
        data.erase(0, idx + sep.length());
    }

    return vec;
}

vector<int> solution(string today, vector<string> terms, vector<string> privacies) {
    vector<int> answer;

    int year, month, day;

    vector<string> date;
    date = split(today, " ");

    vector<string> tday;
    tday = split(date.at(0), ".");
    for (string i: tday)
    {
        
    }

    return answer;
}

int main()
{
    string today = "2022.05.19";
    vector<string> terms{"A 6", "B 12", "C 3"};
    vector<string> privacies{"2019.01.01 D", "2019.11.15 Z", "2019.08.02 D", "2019.07.01 D", "2018.12.28 Z"};

    auto answer = solution(today, terms, privacies);

    for (int x: answer)
    {
        printf("%d", x);
    }
}