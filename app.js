(function() {
    var _ = {
        addHandle: function(element, type, handler) {
            if(element.addEventListener) {
                element.addEventListener(type, handler, false)
            } else if(element.attachEvent) {
                element.attachEvent('on'+type, handler)
            } else {
                element['on'+type] = handler;
            }
        }
    }
    /**
     * aqiData，存储用户输入的空气指数数据
     * 示例格式：
     * aqiData = {
     *    "北京": 90,
     *    "上海": 40
     * };
     */
    var aqiData = {};

    /**
     * 从用户输入中获取数据，向aqiData中增加一条数据
     * 然后渲染aqi-list列表，增加新增的数据
     */
    var addAqiData = function() {
        var aqiCityInput = document.getElementById('aqi-city-input').value;
        var aqiValueInput = document.getElementById('aqi-value-input').value;

        // 数据验证
        if(!aqiCityInput.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
            alert('城市必须是中英文啊喂');
            return;
        }
        if(!aqiValueInput.match(/^\d+$/)) {
            alert('空气质量必须是数字啊喂');
            return;
        }

        aqiData[aqiCityInput] = aqiValueInput;

    }

    /**
     * 渲染aqi-table表格
     */
    function renderAqiList() {

        console.log(aqiData)

        var aqiTable = document.getElementById('aqi-table');
        aqiTable.innerHTML = '<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
        var tableFragments = document.createDocumentFragment();
        for (key in aqiData) {
            var trNode = document.createElement('tr');

            var tdFragments  = document.createDocumentFragment();

            var tdCity = document.createElement('td');
            tdCity.innerHTML = key;
            var tdQu = document.createElement('td');
            tdQu.innerHTML = aqiData[key];
            var tdBt = document.createElement('td');
            tdBt.innerHTML = '<button data-city="' + key + '"">删除</button>';

            tdFragments.appendChild(tdCity);
            tdFragments.appendChild(tdQu);
            tdFragments.appendChild(tdBt);

            trNode.appendChild(tdFragments);
            tableFragments.appendChild(trNode)
        }

        aqiTable.appendChild(tableFragments);
    }

    /**
     * 点击add-btn时的处理逻辑
     * 获取用户输入，更新数据，并进行页面呈现的更新
     */
    var addBtnHandle = function() {
        console.log('button add handle ok')
        addAqiData();
        renderAqiList();
    }

    /**
     * 点击各个删除按钮的时候的处理逻辑
     * 获取哪个城市数据被删，删除数据，更新表格显示
     */
    function delBtnHandle(city) {
        // do sth.
        console.log(event.target.nodeName);
        delete(aqiData[city]);
        renderAqiList();
    }

    var init = function() {
        console.log('init ok')
        // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
        var addBtn = document.getElementById('add-btn');
        _.addHandle(addBtn, 'click', addBtnHandle);

        // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
        var aqiTable = document.getElementById("aqi-table");
        _.addHandle(aqiTable, 'click', function(event) {
            if(event.target.nodeName.toLowerCase() === 'button') {
                //console.log(event.target.dataset.city)

                delBtnHandle(event.target.dataset.city)
            }
        });
    }

    init();
})();
