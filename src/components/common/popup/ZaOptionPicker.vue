<template>
  <div class="za-option-picker">
    <div class="selections">
      <div class="title-name">{{ name }}</div>
      <ZaScroll class="sc" ref="scroll">
        <ul>
          <li v-for="item in pData" :key="item.name" @click="itemSelect(item)">
            {{ item.name }} <i v-show="item.selected" class="cubeic-ok"></i>
          </li>
        </ul>
      </ZaScroll>

      <div class="funcs" v-if="multiSelect">
        <button @click="cancel">取消</button
        ><button @click="assert">确定</button>
      </div>
      <div class="funcs-cancel" v-else>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import ZaScroll from "components/common/scroll/ZaScroll";
export default {
  name: "ZaOptionPicker",
  props: {
    multiSelect: {
      type: Boolean,
      default: false,
    },
    name: "",
    pData: {
      type: Array, //数组中每个选项为一个item,必须包含name和id属性
    },
    initialSelect: {
      type: Array, //数组中每个选项为一个item,必须包含name和id属性
    },
  },
  data() {
    return {
      selected: [],
    };
  },
  components: {
    ZaScroll,
  },
  methods: {
    //初始化数据
    initData() {
      for (let i = 0; i < this.pData.length; i++) {
        this.$set(this.pData[i], "selected", false);
      }
      if (this.initialSelect) {
        for (let i = 0; i < this.initialSelect.length; i++) {
          for (let j = 0; j < this.pData.length; j++) {
            if (this.initialSelect[i].id == this.pData[j].id) {
              this.pData[j].selected = true;
              this.selected.push(this.pData[j]); //删除以前元素，插入元素数据中的元素
              break;
            }
          }
        }
      }
    },

    //点击节点
    itemSelect(item) {
      if (!this.multiSelect) {
        this.selected.forEach((ele) => {
          ele.selected = false;
        });
        this.selected = [];
        item.selected = true;
        this.selected.push(item);
        this.assert();
      } else {
        let index = this.selected.findIndex((ele) => ele.id == item.id);
        console.log(index);
        if (index != -1) {
          item.selected = false;
          this.selected.splice(index, 1);
        } else {
          item.selected = true;
          this.selected.push(item);
        }
      }
    },

    //点击确认
    assert() {
      this.$emit("assert");
    },

    //点击取消
    cancel() {
      this.selected.forEach((ele) => {
        ele.selected = false;
      });
      this.$emit("cancel");
    },
  },
  created() {
    this.initData();
  },
  mounted() {
    this.$refs.scroll && this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.za-option-picker {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  z-index: 500;
}
.selections {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  left: 50%;
  top: 50%;
  width: 70vw;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
}
.selections .title-name {
  font-weight: 600;
  line-height: var(--liHeight);
}
.selections .sc {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
.selections ul {
  width: 100%;
}
.selections li {
  position: relative;
  line-height: var(--liHeight);
  border-bottom: 1px solid #eee;
  width: 100%;
  text-align: center;
}

.selections li i {
  position: absolute;
  right: 10px;
}

.selections .funcs {
  width: 100%;
  height: var(--liHeight);
  line-height: var(--liHeight);
}
.selections .funcs button {
  width: 50%;
  border: none;
  outline: none;
  height: var(--liHeight);
}

.selections .funcs button:nth-child(1) {
  border-right: 1px solid #ccc;
}

.selections .funcs-cancel {
  width: 100%;
  height: var(--liHeight);
  line-height: var(--liHeight);
}
.selections .funcs-cancel button {
  width: 100%;
  border: none;
  outline: none;
  height: var(--liHeight);
}
</style>