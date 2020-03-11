class TmpEvent {
  ue = {};
  constructor(container,ue) {
    this.ue = ue;
    this.execIframe(container);
  }
  /**
   * 通过遍历得到的一个iframe执行方法
   * @param {Number} i
   * @param {Iframe} item
   */
  execIframe(item,ue) {
    $(document).on("keydown", e => {
      // if (e.keyCode == 46) return e.preventDefault();
      if (e.keyCode == 8 || e.keyCode == 13) {
        $(item)
          .parent(".tEdit")
          .css("z-index", 0);
        return this.onBackSpace(e);
      }
    });
    $(item).on("dblclick", ".control", e => {
      $(item)
        .parent(".tEdit")
        .css("z-index", 1000);
      // $(item).parent('.edui-container').css ('z-index', 1000);
      const selectData = JSON.parse($(e.target).attr("data-select"));
      this.onControlArg(e, selectData.title, selectData.option,ue);
    });
  }
  /**
   * 退格事件
   * @param {Event} e
   */
  onBackSpace(e) {
    // if (
    //   this.selectText(e).lastIndexOf("〕") !== -1 ||
    //   this.selectText(e).lastIndexOf("〔") !== -1
    // ) {
    //   return e.preventDefault();
    // }
    // if (this.selectLastString(e)) {
    //   return e.preventDefault();
    // }
  }
  /**
   * 在页面中控件事件
   * @param {Event} e
   */
  onControlArg(e, title, option, multiple) {
    const tips = new Tips(this.ue);
    const optionDomArr = option.map(
      item => `<option value="${item.value}">${item.lable}</optopn>`
    );
    const tmp = `<div><b>${title}</b></div><select class="tipValue" style="width:100%;" ${multiple}>${optionDomArr.join(
      ""
    )}</select>`;
    tips.show(e, tmp);
    e.preventDefault();
  }
  /**
   * 光标选中的文字
   * @param {Event} e
   */
  selectText(e) {
    const win = e.view;
    var selecter = win.getSelection
      ? e.view.getSelection().focusNode.data
      : win.document.selection.createRange().text;
    return selecter ? selecter : "";
  }
  /**
   * 查询最后一个字是不是关键字
   * @param {Event} e
   */
  selectLastString(e) {
    const win = e.view;
    let anchorNodeData =
      win.getSelection().anchorNode.innerText ||
      win.getSelection().anchorNode.data;
    if (anchorNodeData.length === 1) {
      win.getSelection().anchorNode.data = "请选择";
      return true;
    }
    if (anchorNodeData === "请选择") {
      return true;
    }
    const text = win.document.body.innerText.charAt(
      win.document.body.innerText.search(anchorNodeData) +
        win.getSelection().anchorOffset -
        1
    );
    return text === "〔" || text === "〕";
  }
  addTips() {}
  removeTips() {
    $(e.target)
      .find(".control_box")
      .remove(".control_box");
  }
}
/**
 * 控件
 */
class Tips {
  ue = {};
  constructor(ue) {
    this.ue = ue;
  }
  tmp(str, layout) {
    return `
    <div class="control_box" contenteditable="false"  onselectstart="return false;" style="display: inline-block;">
    <div class="control_box_back" style="position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,0.1);top: 0;left: 0;z-index: 0;">&#8203;</div>
    <div style="position: absolute;border:1px solid #ccc; background:#fff;box-shadow: 0px 0px 4px #bbb;border-radius: 5px;width: 200px;padding: 10px; z-index: 1;left:${
      layout.left
    }px;top:${
      layout.top
    }px">${str}<div style="text-align:right;padding:10px 10px 0 10px"><button class="tipOk">确定</button></div></div>
    </div>`;
  }
  show(e, str) {
    const dom = e.target;
    this.hide(dom);
    $(dom.offsetParent).prop({
      contenteditable: false
    });
    $(dom).after(this.tmp(str, this.layout(e.clientX, e.clientY)));
    const _controlArgBox = $(dom).next(".control_box");
    $(".control_box_back").one("click", () => {
      this.hide(dom);
      $(".control_box_back").remove();
    });
    _controlArgBox.find(".tipOk").one("click", () => {
      this.onOk(dom);
      $(".control_box_back").remove();
    });
  }
  layout(clientX, clientY) {
    return {
      left: window.innerWidth - clientX > 220 ? clientX : clientX - 220,
      top: window.innerHeight - clientY > 95 ? clientY : clientY - 95
    };
  }
  hide(dom) {
    $(".control_box").remove();
    $('.ueditor_ueid').prop({
      contenteditable: true
    });
  }
  onOk(dom) {
    const _dom = $(dom);

    _dom.text(
      _dom
        .next(".control_box")
        .find(".tipValue")
        .val()
    );
    this.hide(dom);
    this.ue.addListener("ready", function () {
    　　this.ue.setContent(_dom.parents('.ueditor_ueid').html());
    });
  }
}
class ControlData {
  // 有无控件
  isExist = {
    title: "有无",
    option: [
      {
        lable: "有",
        value: "有"
      },
      {
        lable: "无",
        value: "无"
      }
    ]
  };
  // 确认否认控件
  isOk = {
    title: "是否",
    option: [
      {
        lable: "伴",
        value: "伴"
      },
      {
        lable: "否认",
        value: "否认"
      }
    ]
  };
  // 年份控件
  num(max) {
    return {
      title: "数值",
      option: (() => {
        const arr = [];
        for (let index = 0; index < max; index++) {
          const element = {
            lable: String(index + 1),
            value: String(index + 1)
          };
          arr.push(element);
        }
        return arr;
      })()
    };
  }
  beforeHtml = `<span style="color:red" contenteditable="false">〔</span>`;
  afterHtml = `'>请选择</span><span style="color:red" contenteditable="false">〕</span>`;
  html(type, option) {
    if (!type) return "";
    if (type === "select")
      return (
        this.beforeHtml +
        `<span class="control" onselectstart="return false;" style="display: inline-block;" data-select='` +
        JSON.stringify(option) +
        this.afterHtml
      );
  }
}
