#include <string>
#include <vector>
#include <algorithm>

using namespace std;

string solution(string s, string skip, int index) 
{
    string answer = "";

    vector<char> ABC;
    int tmpindex;

    for (int i = 97; i < 123; i++)
    {   
        char tmp = i;
        ABC.push_back(tmp);       
    }

    for (int i = 0; i < skip.length(); i++)
    {      
        ABC.erase(remove(ABC.begin(), ABC.end(), skip.at(i)), ABC.end()); 
    }

    for (int i = 0; i < s.length(); i++)
    {
        tmpindex = find(ABC.begin(), ABC.end(), s.at(i)) - ABC.begin();
        char ans = ABC.at((tmpindex + index) % ABC.size());
        answer += ans;
    }
    return answer;
}

int main()
{
    string s = "aukks", skip = "wbqd";
    int index= 5;
    printf("%s", solution(s, skip, index).c_str());
}