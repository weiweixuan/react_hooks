# pro-scaffold

## 使用

```bash
$ npm start      // 启动预览服务器
$ npm run build  // 构建 dist
```

### 如何使用数据管理

1 在 stores 里建立相应的模块 js 文件
2 定义数据 state 和修改 state 的方法
3 页面上想使用，引入 stores

```javascript
import stores from "@/stores/index";
//  找到相应的模块
const expandAside = stores.useStore("expandAside");
//  结构方法直接使用
const { toggle } = expandAside;
```

### 多语言组件使用

```javascript
// 当做文本用
import { FormattedMessage } from "react-intl";

<FormattedMessage id="hello" />;

// 当做字符串用
import { injectIntl } from "react-intl";
// 首先该组件用 injectIntl 方法包裹下，然后可以拿到 props 下的 intl 属性：结构 formatMessage 方法即可直接使用

<Input
  value={val}
  onChange={setVal}
  placeholder={formatMessage({ id: "app.demo.mydemo.placeholder" })}
  style={{ flex: 1 }}
  ref={dom => {
    ref.current = dom;
  }}
/>;
```
