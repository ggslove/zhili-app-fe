import { action, observable } from 'mobx';
import { IBasicInfo, IRowConfig } from "src/models/build";
import { inputTypes, tagTypes, textAligns } from "src/constants/commonConstants";
import { getMaxVId } from 'src/util/operate';
import { IPage } from "src/models/operation";

// 标签模板
class Build {
  @observable leftWidth: number;
  @observable rightWidth: number;
  @observable tagList: string[];
  @observable basicInfo: IBasicInfo;
  @observable rowConfigs: IRowConfig[];
  @observable activeId: string;
  @observable activeTagId: string;
  @observable pagination: IPage;

  constructor () {
    this.leftWidth = 280;
    this.rightWidth = 280;
    this.basicInfo = { name: '新建标签', type: tagTypes.people, sql: '' };
    this.rowConfigs = [
      {
        rowId: 'r-1',
        type: inputTypes.label,
        colNum: 2,
        labelText: '新建label',
        fontSize: 12,
        color: 'black',
        options: '',
        textAlign: textAligns.left,
        defaultValue: '',
        maxValue: undefined,
        minValue: undefined,
      }
    ];
    this.activeId = '';
    this.tagList = ['常口1','常口2','常口3','常口4','常口5','常口6','常口7','常口8','常口9','常口10','常口11','常口12','常口13',];
    this.activeTagId = '';
    this.pagination = { current: 0, total: 100, pageSize: 10 };
  }

  @action changeBasicInfo = (basicInfo: IBasicInfo) => {
    this.basicInfo = basicInfo;
  };

  @action addRowConfig = () => {
    const rowIds = this.rowConfigs.map((row: IRowConfig) => row.rowId);
    const rowId = `r-${getMaxVId(rowIds)}`;
    this.rowConfigs.push(
      {
        rowId,
        type: inputTypes.label,
        colNum: 2,
        labelText: '新建label',
        fontSize: 12,
        color: 'black',
        options: '',
        textAlign: textAligns.left,
        defaultValue: '',
        maxValue: undefined,
        minValue: undefined,
      }
    );
    this.activeId = rowId;
  };

  @action delRowConfig = () => {
    if (this.activeId) {
      const rowIds = this.rowConfigs.map((rowConfig: IRowConfig) => {
        return rowConfig.rowId;
      });
      const activeIndex = rowIds.indexOf(this.activeId);
      this.rowConfigs = this.rowConfigs.filter((rowConfig: IRowConfig) => {
        return rowConfig.rowId !== this.activeId;
      });
      if (rowIds[activeIndex + 1]) {
        this.activeId = rowIds[activeIndex + 1];
      } else if (rowIds[activeIndex - 1]) {
        this.activeId = rowIds[activeIndex - 1];
      } else {
        this.activeId = '';
      }
    }
  };

  @action checkActiveId = (activeId: string) => {
    this.activeId = activeId;
  };

  @action changeConfigType = (val: inputTypes) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.type = val;
          rowConfig.defaultValue = undefined;
          rowConfig.maxValue = undefined;
          rowConfig.minValue = undefined;
        }
      });
    }
  };

  @action changeConfigAlign = (val: textAligns) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.textAlign = val;
        }
      });
    }
  };

  @action changeConfigColNum = (colNum: number) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.colNum = colNum;
        }
      });
    }
  };

  @action changeConfigFontSize = (fontSize: number) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.fontSize = fontSize;
        }
      });
    }
  };

  @action changeConfigColor = (color: string) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.color = color;
        }
      });
    }
  };

  @action changeConfigLabelText = (labelText: string) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.labelText = labelText;
        }
      });
    }
  };

  @action changeConfigDefaultValue = (defaultValue: string | number | undefined) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.defaultValue = defaultValue;
        }
      });
    }
  };

  @action changeConfigOptions = (options: string) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.options = options;
        }
      });
    }
  };

  @action changeConfigMax = (maxValue: string | number) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.maxValue = maxValue;
        }
      })
    }
  };

  @action changeConfigMin = (minValue: string | number) => {
    if (this.activeId) {
      this.rowConfigs.forEach((rowConfig: IRowConfig) => {
        if (rowConfig.rowId === this.activeId) {
          rowConfig.minValue = minValue;
        }
      })
    }
  };

  @action checkTag = (tagId: string) => {
    this.activeTagId = tagId;
  };

  @action pageChange = (current: number) => {
    this.pagination.current = current;
  }

}

export default Build;
