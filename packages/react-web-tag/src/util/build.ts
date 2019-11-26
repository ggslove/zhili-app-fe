import { IDatePickerStrings } from "office-ui-fabric-react";

export const showOptions = (options: string) => {
  const optionDom: any[] = [];
  try {
    const optionList: any[] = JSON.parse(options);
    if (optionList instanceof Array) {
      optionList.forEach((option: any) => {
        optionDom.push({ key: option.key, text: option.text });
      })
    }
  } catch (e) {
    console.error(e);
  }
  return optionDom;
};

export const onFormatDate = (date?: Date): string => {
  if (date) {
    const month = date.getMonth() + 1;
    return date.getFullYear() + '-' + ((Array(2).join('0') + month).slice(-2)) + '-' + ((Array(2).join('0') + date.getDate()).slice(-2));
  }
  return '';
};

export const onParseDateFromString = (value: string, dateValue?: Date | null): Date => {
  const date = dateValue || new Date();
  const values = (value || '').trim().split('/');
  const day = values.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
  const month = values.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
  let year = values.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
  if (year < 100) {
    year += date.getFullYear() - (date.getFullYear() % 100);
  }
  return new Date(year, month, day);
};

export const  DayPickerStrings: IDatePickerStrings = {
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '七月', '八月', '九月', '10月', '11月', '12月'],
  shortMonths: ['1月', '2月', '3月', '4月', '5月', '6月', '七月', '八月', '九月', '10月', '11月', '12月'],
  days: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  shortDays: ['日', '一', '二', '三', '四', '五', '六'],
  goToToday: '当前',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  isRequiredErrorMessage: 'Start date is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};

export const turnToDate = (dateStr: string) => {
  const date: Date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return undefined;
  }
  return date;
};
