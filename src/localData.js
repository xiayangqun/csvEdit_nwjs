/**
 * Created by xiayangqun on 2016/11/28.
 */

LocalData={

    writeablePath:'',
    csvRootDir:'',
    currentCsvDir:'',
    currentCsvConfig:{

        rows:{
            row1:['scene','empty','empty','sceneid'],
            row2:['music','musicid','empty','empty']
        },

        cellEnum:{
            sceneid:['scene1','scene2','scene3'],
            musicid:['music1','nusic2','music3']
        }
    },
    
    init:function () {
        this.writeablePath=nw.App.dataPath;
        var fs=require('fs');
        if(fs.existsSync(this.writeablePath+'/data.json'))
        {
            var jsonString=fs.readFileSync(this.writeablePath+'/data.json','utf8');
            var jsonObj=JSON.parse(jsonString);
            this.csvRootDir=jsonObj.csvRootDir;
        }
        else
        {
            this.csvRootDir='';
        }
    },

    save:function () {
        var dataString= JSON.stringify(this,null,2);
        var fs=require('fs');
        fs.writeFileSync(this.writeablePath+'/data.json',dataString,'utf8');
    }
};

exports=LocalData;




