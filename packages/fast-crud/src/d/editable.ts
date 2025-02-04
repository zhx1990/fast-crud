import { Ref, ComputedRef } from "vue";
import { ColumnProps, EditableProps, EditableUpdateCellRequest, FormItemProps } from "./crud";
import Schema from "async-validator";
import { ValidateFieldsError } from "async-validator/dist-types/interface";

export type EditableValidateResult = boolean | ValidateFieldsError;
export type EditableTable = {
  options: Ref<EditableProps>;
  disabled?: boolean;
  setupEditable: (data?: any[]) => void;
  inactive: () => void;
  active: () => void;
  saveEach: () => Promise<void>;
  cancelAll: () => void;
  persist: () => void;
  resume: () => void;
  addRow: () => void;
  removeRow: (editableId: any) => void;
  getEditableRow: (editableId: any) => void;
  activeCols: (opts: { cols: string[] }) => void;
  hasDirty: () => void;
  getEditableCell: (editableId: any, key: string) => EditableCell;
  eachRows: (callback: (opts: EditableEachRowsOpts) => void) => void;
  eachCells: (callback: (opts: EditableEachCellsOpts) => void) => void;
  validate: () => Promise<EditableValidateResult>;
  getCleanTableData: (data?: any[]) => any[];
};
export type EditableCellActiveProps = {
  showAction?: boolean;
  exclusive?: boolean;
  exclusiveEffect?: "cancel" | "save";
};
export type EditableCell = {
  isEditing: boolean;
  loading: boolean;
  mode: string;
  activeTrigger: "onClick" | "onDbClick" | false;
  isEditable: () => boolean;
  isChanged: () => boolean;
  getForm: () => FormItemProps;
  active: (opts?: EditableCellActiveProps) => void;
  inactive: () => void;
  resume: () => void;
  persist: () => void;
  save: () => Promise<void>;
  cancel: () => void;
  oldValue: any;
  newValue: any;
  column: ColumnProps;
  updateCell: ComputedRef<EditableUpdateCellRequest>;
  showAction: boolean;
  validateErrors?: any[];
};

export type EditableRow = {
  isAdd?: boolean;
  inactive: () => void;
  active: () => void;
  isEditing: boolean;
  cells: Record<string, EditableCell>;
  persist: () => void;
  resume: () => void;
  cancel: () => void;
  save: (opts: { doSave: (opts: any) => Promise<void> }) => Promise<void>;
  loading: boolean;
  /**
   * 获取可以提交的行数据
   */
  getRowData: () => any;
  rowData: any;
  editableId: any;
  validate: (row?: any) => Promise<EditableValidateResult>;
  validator?: Schema;
};

export type EditableRowData = {
  __editableRowId__: number;
  [key: string]: any;
};

export type EditableEachCellsOpts = {
  rowData: any;
  row: EditableRow;
  cells: Record<string, EditableCell>;
  cell: EditableCell;
  key: string;
};

export type EditableEachRowsOpts = {
  rowData: any;
  row: EditableRow;
  cells: Record<string, EditableCell>;
};
