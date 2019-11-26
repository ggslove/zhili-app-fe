
/* global window */
import { DropdownMenuItemType, IDropdownOption } from "office-ui-fabric-react";
import { IModelLink } from "src/models";
import { IConfig } from "src/models/operation";

export const INITIAL_ROUTE = {
  keys: {},
  options: {},
  path: window.location.hash, // 初始化为hash地址
  hash: '',
};

export const modelLinks: IModelLink[] = [
  {
    img: "/img/home.png", name: "标签市场", link: "/#"
  },
  {
    img: "/img/draw.png", name: "标签搭建", link: "/#/operation"
  },
  {
    img: "/img/task.png", name: "任务管理", link: "/#"
  },
  {
    img: "/img/system.png", name: "后台管理", link: "/#/back"
  },
];

export enum tagTypes {
  all = 'all',
  people = 'people',
  car = 'car',
  company = 'company',
  case = 'case',
  other = 'other',
}

export const tagTypeList: { code: tagTypes, text: string }[] = [
  { code: tagTypes.people, text: '人员' },
  { code: tagTypes.car, text: '车辆' },
  { code: tagTypes.company, text: '公司' },
  { code: tagTypes.case, text: '案件' },
  { code: tagTypes.other, text: '其他' },
];

export const tagAllTypeList: { code: tagTypes, text: string }[] = [
  { code: tagTypes.all, text: '所有' },
  { code: tagTypes.people, text: '人员' },
  { code: tagTypes.car, text: '车辆' },
  { code: tagTypes.company, text: '公司' },
  { code: tagTypes.case, text: '案件' },
  { code: tagTypes.other, text: '其他' },
];

export enum inputTypes {
  label = 'label',
  input = 'input',
  select = 'select',
  inputNumber = 'inputNumber',
  date = 'date',
}

export enum textAligns {
  left = 'left',
  center = 'center',
  right = 'right',
}

export const typeOptions: IDropdownOption[] = [
  { key: 'labelHeader', text: '文本', itemType: DropdownMenuItemType.Header },
  { key: 'label', text: '描述' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'inputHeader', text: '输入组件', itemType: DropdownMenuItemType.Header },
  { key: 'input', text: '输入框' },
  { key: 'select', text: '下拉选择框'},
  { key: 'inputNumber', text: '数字输入框' },
  { key: 'divider_2', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'dateHeader', text: '日期组件', itemType: DropdownMenuItemType.Header },
  { key: 'date', text: '日期' },
];

export const alignOptions: IDropdownOption[] = [
  { key: 'alignHeader', text: '定位', itemType: DropdownMenuItemType.Header },
  { key: textAligns.left, text: '居左' },
  { key: textAligns.center, text: '居中' },
  { key: textAligns.right, text: '居右' },
];

export const demoConfigs: IConfig[] = [
  {
    rowId: 'r-1',
    type: inputTypes.label,
    colNum: 2,
    labelText: '出现周期',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.right,
    defaultValue: '',
    value: '',
    maxValue: undefined,
    minValue: undefined,
  },
  {
    rowId: 'r-2',
    type: inputTypes.label,
    colNum: 1,
    labelText: '最近',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.right,
    defaultValue: '',
    value: '',
    maxValue: undefined,
    minValue: undefined,
  },
  {
    rowId: 'r-3',
    type: inputTypes.inputNumber,
    colNum: 1,
    labelText: '',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.left,
    defaultValue: 3,
    value: '2',
    maxValue: '4',
    minValue: '0',
  },
  {
    rowId: 'r-4',
    type: inputTypes.select,
    colNum: 2,
    labelText: '',
    fontSize: 12,
    color: 'black',
    options: '[{"key":"day","text":"天"},{"key":"week","text":"周"},{"key":"month","text":"月"}]',
    textAlign: textAligns.left,
    defaultValue: 'month',
    value: 'month',
    maxValue: undefined,
    minValue: undefined,
  },
  {
    rowId: 'r-5',
    type: inputTypes.label,
    colNum: 2,
    labelText: '出现次数',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.right,
    defaultValue: '',
    value: '',
    maxValue: undefined,
    minValue: undefined,
  },
  {
    rowId: 'r-6',
    type: inputTypes.date,
    colNum: 3,
    labelText: '',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.left,
    defaultValue: '2019-01-10',
    value: '2019-01-10',
    maxValue: '2019-01-16',
    minValue: '2019-01-05',
  },
  {
    rowId: 'r-7',
    type: inputTypes.label,
    colNum: 1,
    labelText: '次以上',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.left,
    defaultValue: '',
    value: '',
    maxValue: undefined,
    minValue: undefined,
  },
  {
    rowId: 'r-8',
    type: inputTypes.label,
    colNum: 2,
    labelText: '资产',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.right,
    defaultValue: '',
    value: '',
    maxValue: undefined,
    minValue: undefined,
  },
  {
    rowId: 'r-9',
    type: inputTypes.label,
    colNum: 1,
    labelText: '大于',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.right,
    defaultValue: '',
    value: '',
    maxValue: undefined,
    minValue: undefined,
  },
  {
    rowId: 'r-10',
    type: inputTypes.inputNumber,
    colNum: 2,
    labelText: '',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.left,
    defaultValue: 10000,
    value: 10000,
    maxValue: undefined,
    minValue: undefined,
  },
  {
    rowId: 'r-11',
    type: inputTypes.label,
    colNum: 1,
    labelText: '元',
    fontSize: 12,
    color: 'black',
    options: '',
    textAlign: textAligns.left,
    defaultValue: '',
    value: '',
    maxValue: undefined,
    minValue: undefined,
  }
];
