import { AtActionSheet, AtActionSheetItem } from "taro-ui";

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
      <AtActionSheet {...this.props} cancelText="取消" title="title">
        <AtActionSheetItem>按钮一</AtActionSheetItem>
        <AtActionSheetItem>按钮二</AtActionSheetItem>
      </AtActionSheet>
    );
  }
}

export default BindingIdActionSheet;
