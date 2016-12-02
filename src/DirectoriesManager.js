/**
 * Created by xiayangqun on 2016/11/23.
 */
DirectoriesManager={

    _divNode:null,
    _csvRootPath:'',
    _currentItem:null,
    
    init:function (divNode, csvRootPath) {
        this._divNode=divNode;
        this._csvRootPath=csvRootPath;
        while(this._divNode.firstChild) this._divNode.removeChild(this._divNode.firstChild);

        var searchIput=document.createElement('input');
        searchIput.placeholder='查找文件夹';
        searchIput.type='text';
        searchIput.addEventListener('input',this.searchWordChange.bind(this));
        this._divNode.appendChild(searchIput);

        var fs=require('fs');
        var allCsvDirNames=fs.readdirSync(this._csvRootPath);

        var divInNode=document.createElement('div');
        divInNode.style.width='100%';
        divInNode.style.height='500px';
        divInNode.style.overflow='auto';
        allCsvDirNames.forEach(function (csvDirName) {
            var stat=fs.statSync(this._csvRootPath +'/'+csvDirName);
            if(stat.isDirectory())
            {
                var pNode=document.createElement('p');
                pNode.innerText=csvDirName;
                divInNode.appendChild(pNode);
                pNode.addEventListener('click',function (event) {
                    if(this._currentItem) this._currentItem.style.backgroundColor='transparent';
                    this._currentItem=pNode;
                    pNode.style.backgroundColor='rgba(255,90,0,1)';
                    EditManager.changeCurrentCsvRoot(this._csvRootPath+'/'+csvDirName);
                }.bind(this));
            }
        }.bind(this));
        this._divNode.appendChild(divInNode);

        var input=document.createElement('input');
        input.type='text';
        input.placeholder='新建文件夹';
        input.style.marginTop='15px';
        input.style.marginBottom='5px';
        this._divNode.appendChild(input);

        var sureButton=document.createElement('button');
        sureButton.className='leftButton';
        sureButton.textContent='新建文件夹';
        sureButton.addEventListener('click',function (event) {
            var fullPath= this._csvRootPath+'/'+input.value;
            var fs=require('fs');
            fs.mkdirSync(fullPath);
            this.init(this._divNode,this._csvRootPath);
        }.bind(this));
        this._divNode.appendChild(sureButton);
    },

    searchWordChange:function (event) {
        var target=event.target;
        var value=target.value;

        var allPNode=this._divNode.querySelectorAll('p');
        allPNode.forEach(function (pNode) {
            if(value == '')
                pNode.style.display='block';
            else if( pNode.innerText.includes(value))
                pNode.style.display='block';
            else
                pNode.style.display='none';

        }.bind(this));
    }
};