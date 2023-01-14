import {
    Button,
    Cell,
    CellGroup,
    Form,
    FormItem,
    Icon,
    Input,
    InputNumber,
    Navbar,
    Notify,
    OverLay,
    Price,
    Switch
} from '@nutui/nutui-taro';

const el = [Navbar, Icon, Button, Notify, OverLay, Cell, CellGroup, Switch, Form, FormItem, Input, Price, InputNumber];

export default {
    install(app) {
        el.forEach(app.use);
    },
};
