this.Server = function(rooturl){
    this.root = rooturl;
    this.ACTIVITY_MATCH = /.*\/activity\/.*/;
    this.ACTIVITIES_QUERY_MATCH = /.*\/activities\?.*/;
    this.AVALIABLE_PROJECT_MATCH = /.*\/avaliableprojects\//;

    this.projects = function(){
        return [
            {"name": "Projetname1",
                "activities": [
                    {"name": "Activity1",
                        "id": "http://servername:port/hourreg/user/activity/id"
                    },
                    {"name": "Activity2",
                        "id": "http://servername:port/hourreg/user/activity/id"
                    }
                ]
            },
            {"name": "Projectname2",
                "activities": [
                    {"name": "Activity3",
                        "id": "http://servername:port/hourreg/user/activity/id"
                    },
                    {"name": "Activity4",
                        "id": "http://servername:port/hourreg/user/activity/id"
                    }
                ]}
        ]
    };

    this.activities = function(){
        return [
            { "name": "ActivityName",
                "id": "http://servername/hourreg/user/activity/id/2001-9-11",
                "date" :"2001-9-11",
                "hours" : "8",
                "minutes": "30"
            },
            { "name": "ActivityName2",
                "id": "http://servername/giohourreg/user/activity/id/2001-9-11",
                "date" : "2001-9-12",
                "hours" : "8",
                "minutes": "30"
            }
        ]
    };
};

this.Server.prototype.serve = function(request, response){
    var url = request.url;
    console.log(url);
    if(request.method == "POST"){
        response.writeHead(201);
        response.end();
    } else if(url.match(this.AVALIABLE_PROJECT_MATCH)) {
        var projects = this.projects();
        var jsonResp = JSON.stringify(projects);
        response.writeHead(200, {"Content-Type": "text/json", "Content-Length": jsonResp.length})
        response.write(jsonResp);
        response.end();
    } else if(url.match(this.ACTIVITIES_QUERY_MATCH)){
        var activities = this.activities();
        jsonResp = JSON.stringify(activities);
        response.writeHead(200, {"Content-Type": "text/json", "Content-Length": jsonResp.length})
        response.write(jsonResp);
        response.end();
    } else {
        response.writeHead(500);
        response.end();
    }

}


