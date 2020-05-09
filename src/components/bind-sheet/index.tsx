import { AtActionSheet, AtActionSheetItem, AtInput } from "taro-ui";

interface IBindingIdActionSheetProps {
  isOpened: boolean;
}

interface IBindingIdActionSheetState {
  isOpened: boolean;
  searchId: string;
  resultId: string;
}

class BindingIdActionSheet extends Taro.Component<
  IBindingIdActionSheetProps,
  IBindingIdActionSheetState
> {
  constructor(props: IBindingIdActionSheetProps) {
    super(props);
    this.state = {
      isOpened: props.isOpened,
      searchId: "",
      resultId: ""
    };
  }

  render() {
    return (
      <AtActionSheet {...this.props} cancelText="取消" title="">
        <View>
          <AtInput
            name="value"
            type="text"
            placeholder="标准五个字"
            onChange={() => {}}
          />
        </View>
        <AtActionSheetItem>绑定</AtActionSheetItem>
        <AtActionSheetItem>复制</AtActionSheetItem>
      </AtActionSheet>
    );
  }
}

export default BindingIdActionSheet;
