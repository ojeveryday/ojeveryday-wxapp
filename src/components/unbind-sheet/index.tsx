import {
  AtActionSheet,
  AtActionSheetItem,
} from "taro-ui";
import { observer, inject } from "@tarojs/mobx";
interface UnbindActionSheetProps {
  close: { (): void }
  isOpened: boolean;
  rankStore: {
    clear: Function
  }
}

interface UnbindActionSheetState {
  isOpened: boolean;
}
@inject((store) => {
  return { rankStore: store.rankStore }
})
@observer
class UnBindActionSheet extends Taro.Component<UnbindActionSheetProps, UnbindActionSheetState> {
  constructor(props: UnbindActionSheetProps) {
    super(props);
    this.state = {
      isOpened: props.isOpened,
    };
  }
  toast(title: string, duration: number = 1000) {
    Taro.showToast({
      title,
      icon: 'none',
      duration
    })
  }
  render() {
    return (
      <AtActionSheet {...this.props} cancelText="取消" title="">

        <AtActionSheetItem
          onClick={() => {
            // 解绑
            const result = this.props.rankStore.clear();
            if (result) {
              this.toast('解绑成功')
            } else {
              this.toast('解绑失败')
            }
            this.props.close();
          }}
        >
          解绑
        </AtActionSheetItem>
      </AtActionSheet>
    );
  }
}

export default UnBindActionSheet;
