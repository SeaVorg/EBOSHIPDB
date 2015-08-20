#include<iostream>
#include<cstdlib>
#include<cstring>
#include<fstream>

using namespace std;

int main()
{
    ifstream in("Embarkations.json");
    ofstream out("Embarkations_modified.json");
    string e="        \"Embarking_date\":";
    string d="        \"Disembarking_date\":";
    bool eb, db;
    char a[12048];
    int i;
    while(in.getline(a,12048))
    {
        eb=1;
        db=1;
        for(i=0;i<strlen(a),i<e.size();i++) if(a[i]!=e[i]) eb=0;
        for(i=0;i<strlen(a),i<d.size();i++) if(a[i]!=d[i]) db=0;
        if(eb)
        {
            string date="test";
            string month="";
            int add=0;
            month+=a[e.size()+2];
            if(a[e.size()+3]!='/') {
                    month+=a[e.size()+3];
                    add+=1;
            }
            string day="";
            day+=a[e.size()+4+add];
            if(a[e.size()+5+add]!='/') {
                    day+=a[e.size()+5+add];
                    add+=1;
            }
            string year="";
            year+=a[e.size()+6+add];
            year+=a[e.size()+7+add];
            year+=a[e.size()+8+add];
            year+=a[e.size()+9+add];
            //date = month + "/" + day +"/" + year;
            if(day.size()==1) day="0"+day;
            if(month.size()==1) month="0"+month;
            date = year + "-" + day + "-" + month +"T12:30:00.000Z";
            out<<e<<" {" <<endl;
            out<<"                \"__type\": \"Date\","<<endl;
            out<<"                \"iso\": \""<< date <<"\"" <<endl;
            out<<"        },"<<endl;
        }
        if(db)
        {
            string date="test";
            string month="";
            int add=0;
            month+=a[d.size()+2];
            if(a[d.size()+3]!='/') {
                    month+=a[d.size()+3];
                    add+=1;
            }
            string day="";
            day+=a[d.size()+4+add];
            if(a[d.size()+5+add]!='/') {
                    day+=a[d.size()+5+add];
                    add+=1;
            }
            string year="";
            year+=a[d.size()+6+add];
            year+=a[d.size()+7+add];
            year+=a[d.size()+8+add];
            year+=a[d.size()+9+add];
            //date = month + "/" + day +"/" + year;
            if(day.size()==1) day="0"+day;
            if(month.size()==1) month="0"+month;
            date = year + "-" + day + "-" + month +"T12:30:00.000Z";
            out<<d<<" {" <<endl;
            out<<"                \"__type\": \"Date\","<<endl;
            out<<"                \"iso\": \""<< date <<"\"" <<endl;
            out<<"        },"<<endl;
        }
        if(eb==0&&db==0)out<<a<<endl;
    }
    return 0;
}
