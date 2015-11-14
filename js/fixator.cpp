#include<iostream>
#include<fstream>
#include<cstring>
#include<cstdlib>
#include<cstdio>
#include<map>

using namespace std;

map<string, string> m;
map<string, string> p;

void input()
{

    freopen("Embarkations2.json","w",stdout);

    FILE* asd = freopen("Ships.json","r",stdin);
    string s;
    string z;
    char str[256];
    int count_desc = 0;
    int count_ship = 0;
    while(cin>>s)
    {
        if(s=="\"Description\":") {
                count_desc++;
                scanf("%[^\n]\n",str);
            s=str;
            z = s.substr(2,s.size()-4);
            while(z[z.size()-1]==' ') z=z.substr(0,z.size()-1);
            for(int i=0;i<z.size();i++) z[i]=toupper(z[i]);

        }
        if(s=="\"Ship\":") {
                count_ship++;
            cin>>s;
            //cout<<s.substr(1,s.size()-3)<<endl;
            m[z]=s.substr(1,s.size()-3);
            //cout<<z<<" = "<<m[z]<<endl;
        }
    }

    //cout<<"FINISHED READING, cnt1="<<count_desc<<" cnt2="<<count_ship<<endl;
    //cout<<m["BOTHNIA CARRIER"]<<endl;

    count_ship=0;
    count_desc=0;

    FILE* f = fopen("Embarkations.json","r");

    int count_unique=0;

     m["FJORDSTONEDSTONE"] = "FJOD";
 m["REMB"] = "REMB";
 m["MED MED SALVADORADOR"] = "MEDS";
 m["MED VERONANA CASTLE"] = "VECA";
 m["MADR"] = "MADR";
 m["MARINA(YAHT)"] = "YTMA";
 m["VIGO STONE STONE"] = "VIGO";
 m["MED SALVADOR(1)"] = "MEDS";
 m["PARS"] = "PARS";
 m["PORTINARILAND CASTLE"] = "POCA";
 m["BALTIC STONEIC TRADER"] = "BATR";
 m["BLUE PERL"] = "BLPR";
 m["BLPR"] = "BLPR";
 m["VERM"] = "BLPR";
 m["HEVER CASTLE"] = "TILA";
 m["BUST"] = "BUST";
 m["NOPE"] = "NOPE";
 m["AMANDA"] = "AMAN";
 m["SILVER PERL"] = "SIPE";
 m["MARN"] = "MARN";
 m["BOTHNIA CARRIERNIA CARRIER"] = "BOCA";
 m["BAPE"] = "BAPE";
 m["MED SALVADOR"] = "MEDS";
 m["BAWO"] = "BAWO";
 m["ZURB"] = "ZURB";
 m["NEWV"] = "NEWV";
 m["MED CARRARA"] = "MEDC";
 m["VADY"] = "VADY";
 m["SILKEBORG"] = "SIBO";
 m["CSAV"] = "CSAV";
 m["TIGR"] = "TIGR";
 m["RAFA"] = "RAFA";
 m["THEI"] = "THEI";
 m["SKBO"] = "SKBO";
 m["FJPR"] = "FJPR";
 m["MARO"] = "MARO";
 m["MARM"] = "MARM";
 m["MEST"] = "MEST";
 m["AUTU"] = "AUTU";
 m["NATA"] = "NATA";
 m["SCHA"] = "SCHA";
 m["BAME"] = "BAME";
 m["TRST"] = "TRST";
 m["CAVA"] = "CAVA";
 m["MONI"] = "MONI";
 m["DANI"] = "DANI";
 m["VALD"] = "VALD";

 string line;
  ifstream myfile( "Embarkations.json" );
  if (myfile)  // same as: if (myfile.good())
    {
    while (getline( myfile, line ))  // same as: while (getline( myfile, line ).good())
      {
          //0123456789
          //        "Ship": "YORK CASTLE",
          if(line.substr(0,15)=="        \"Ship\":")
          {
              s = line.substr(17,line.size()-19);
              string s2 = line.substr(17,line.size()-15);

              for(int i=0;i<s.size();i++) s[i]=toupper(s[i]);

              cout<<"        \"Ship\": \""<<m[s];
              cout<<s2[s2.size()-2]<<s2[s2.size()-1]<<endl;
          }
          else cout<<line<<endl;
          //if(line=="        \"Ship\": \"YORK CASTLE\",")
          //cout<<line.substr(0,15)<<endl;
      }
    myfile.close();
    }

    //cout<<"FINISHED "<<count_ship<<" "<<count_desc<<" "<<count_unique<<endl;


}
int main()
{

    input();
    //solve();
    return 0;
}
