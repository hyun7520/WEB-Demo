#include <string>
#include <vector>

using namespace std;

vector<string> split(string input, string delimiter){
    vector<string> ret;
    size_t pos;
    string token ="";
    while ( (pos = input.find(delimiter)) != string::npos ){
        token = input.substr(0,pos);
        ret.push_back(token);
        input.erase(0, pos + delimiter.length());
    }
    ret.push_back(input);

    return ret;
}

int main()
{
    string str = "2022.02.03 A";
    string splitter = ".";

    auto ans = split(str, splitter);

    for (string x : ans)
    {
        printf("%s ", x.c_str());
    }
    return 0;
}