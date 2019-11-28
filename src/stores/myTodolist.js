export default {
  data: [
    { title: "看书", checked: false },
    { title: "睡觉", checked: false },
    { title: "等二蛋", checked: true }
  ],
  delItemByKey(key) {
    this.data.splice(key, 1);
  },
  changeStateByKey(key) {
    this.data[key].checked = !this.data[key].checked;
  },
  addItem(item) {
    this.data.push(item);
  }
};
