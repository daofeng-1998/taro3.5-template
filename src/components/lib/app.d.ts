interface IBaseState {
    /** 是否激活 */
    activated: Boolean
}

interface IVisible {
    /** 是否显示 */
    show: Boolean
}

interface IMsg {
    /** 消息内容 */
    msg?: string
}

interface IController<C> {
    /** 控制器 */
    controller?: C
}

type NotifyType = 'success' | 'danger' | 'info' | 'warning';

/**
 * 通知状态
 */
interface INotifyState extends IBaseState, IVisible, IMsg {
    /** 持续时间，单位：毫秒*/
    duration?: number
    type?: NotifyType
}

/**
 * loading状态
 */
interface ILoadingState extends IBaseState, IVisible, IMsg {
}

interface IContentType {
    TEXT
    HTML
    SLOT
}

interface IDialogBase {
    /** 标题 */
    title?: string
    /** 标题字体颜色 */
    titleColor?: string
    /** 内容 */
    content?: string
    /** 内容字体颜色 */
    contentColor?: string
    /** 内容类型 */
    contentType?: keyof IContentType
    /** 是否显示取消按钮 */
    showCancel?: boolean
    /** 取消按钮文本 */
    cancelText?: string
    /** 取消按钮字体颜色 */
    cancelColor?: string
    /** 禁用取消按钮 */
    disableCancel?: boolean
    /** 确定按钮文本 */
    confirmText?: string
    /** 确定按钮字体颜色 */
    confirmColor?: string
    /** 禁用确定按钮 */
    disableConfirm?: boolean
}

/** dialog控制器 */
interface IDialogControl {

    /** 常规化配置 */
    show(options: IDialogBase): Promise<boolean>

    /** 无cancel，confirmText为"确定" */
    showContent(content: string, title?: string): Promise<boolean>

    /** 带cancel，confirmText为"确定"，cancelText为“取消” */
    showCancel(content: string, title?: string): Promise<boolean>

    /**
     * 手动设置状态
     * @param newState
     */
    setState(newState: IDialogBase): void

    /**
     * 主动关闭
     */
    close(): void
}

interface IDialogSync extends IBaseState, IDialogBase, IVisible, IController<IDialogControl> {
    onCancel?: Function
    onConfirm?: Function
}

interface ImageMode {
    'scaleToFill'
    'aspectFit'
    'aspectFill'
    'widthFix'
    'heightFix'
    'top'
    'bottom'
    'center'
    'left'
    'right'
    'top left'
    'top right'
    'bottom left'
    'bottom right'
}
