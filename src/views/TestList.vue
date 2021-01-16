<template>
  <div class="test-list">
    <yu-list
      :pList="dataList"
      :height="300"
      showNav
      showSearch
      showImage
      showState
      round
      navName="隐患列表"
      placeholder="请输入隐患名称进行检索"
      @pullingUp="pullingUp"
    ></yu-list>
  </div>
</template>

<script>
import YuList from "components/content/show/YuList";
export default {
  name: "aaa",
  data() {
    return {
      dataList: [
        {
          id: "1", //数据id
          image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg", //图片路径
          name:
            "内蒙古呼伦贝尔一医院2次环境核酸检测均呈阳性,基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "超期未整改",
          currentUser: "张三、李四",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
            {
              key: "有效期", //key的名称,比如“姓名”
              value: "水电费是都发生了打飞机酸辣粉静安寺两地分居案例束带结发", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "2", //数据id
          image: "", //图片路径
          name: "过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "待审核",
          currentUser: "王五",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "3", //数据id
          image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg", //图片路径
          name:
            "内蒙古呼伦贝尔一医院2次环境核酸检测均呈阳性,基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "超期未整改",
          currentUser: "张三、李四",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
            {
              key: "有效期", //key的名称,比如“姓名”
              value: "水电费是都发生了打飞机酸辣粉静安寺两地分居案例束带结发", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "4", //数据id
          image: "", //图片路径
          name: "过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "待审核",
          currentUser: "王五",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "5", //数据id
          image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg", //图片路径
          name:
            "内蒙古呼伦贝尔一医院2次环境核酸检测均呈阳性,基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "超期未整改",
          currentUser: "张三、李四",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
            {
              key: "有效期", //key的名称,比如“姓名”
              value: "水电费是都发生了打飞机酸辣粉静安寺两地分居案例束带结发", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "6", //数据id
          image: "", //图片路径
          name: "过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "待审核",
          currentUser: "王五",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "7", //数据id
          image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg", //图片路径
          name:
            "内蒙古呼伦贝尔一医院2次环境核酸检测均呈阳性,基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "超期未整改",
          currentUser: "张三、李四",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
            {
              key: "有效期", //key的名称,比如“姓名”
              value: "水电费是都发生了打飞机酸辣粉静安寺两地分居案例束带结发", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "8", //数据id
          image: "", //图片路径
          name: "过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "待审核",
          currentUser: "王五",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "9", //数据id
          image:
            "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg", //图片路径
          name:
            "内蒙古呼伦贝尔一医院2次环境核酸检测均呈阳性,基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "超期未整改",
          currentUser: "张三、李四",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
            {
              key: "有效期", //key的名称,比如“姓名”
              value: "水电费是都发生了打飞机酸辣粉静安寺两地分居案例束带结发", //value的值，比如“张三”
            },
          ],
        },
        {
          id: "10", //数据id
          image: "", //图片路径
          name: "过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
          state: "待审核",
          currentUser: "王五",
          otherInfo: [
            {
              key: "设备号", //key的名称,比如“姓名”
              value: "SB551215454121", //value的值，比如“张三”
            },
            {
              key: "设备名称", //key的名称,比如“姓名”
              value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
            },
            {
              key: "检测日期", //key的名称,比如“姓名”
              value: "2020-12-18", //value的值，比如“张三”
            },
            {
              key: "是否超过有效保质期", //key的名称,比如“姓名”
              value: "否", //value的值，比如“张三”
            },
          ],
        },
      ],
      id: 11,
    };
  },
  components: {
    YuList,
  },
  methods: {
    pullingUp() {
      console.log("bbb");
      console.log(this.id);
      this.dataList.push({
        id: this.id++, //数据id
        image:
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg", //图片路径
        name:
          "内蒙古呼伦贝尔一医院2次环境核酸检测均呈阳性,基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组", //列表显示的标题，相对其他信息使用大号字体
        state: "超期未整改",
        currentUser: "张三、李四",
        otherInfo: [
          {
            key: "设备号", //key的名称,比如“姓名”
            value: "SB551215454121", //value的值，比如“张三”
          },
          {
            key: "设备名称", //key的名称,比如“姓名”
            value: "是多少了坚实的丝路精神收到", //value的值，比如“张三”
          },
          {
            key: "检测日期", //key的名称,比如“姓名”
            value: "2020-12-18", //value的值，比如“张三”
          },
          {
            key: "是否超过有效保质期", //key的名称,比如“姓名”
            value: "否", //value的值，比如“张三”
          },
          {
            key: "有效期", //key的名称,比如“姓名”
            value: "水电费是都发生了打飞机酸辣粉静安寺两地分居案例束带结发", //value的值，比如“张三”
          },
        ],
      });
    },
  },
};
</script>

<style scoped>
</style>
