import { FormlyFieldConfig } from "@ngx-formly/core";

export interface Layout {
    sections: Section[]
}

export interface Section {
    name: string,
    rows: string[][]
}

export interface FormlyGroup {
    name: string
    headerTemaplte: string,
    fieldGroups: FormlyFieldConfig[][];
}