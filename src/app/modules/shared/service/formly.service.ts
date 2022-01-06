import { Injectable } from '@angular/core';
import { FormlyField, FormlyFieldConfig } from '@ngx-formly/core';
import { ConnectionParameter } from 'src/app/models/connection.model';
import { FormlyFieldDeclaration, FormlyGroup, Layout, Section } from '../models/formly.model';

/**
 * Formly fields format example see https://formly.dev/examples/other/advanced-layout-flex
 */

@Injectable({
  providedIn: 'root'
})
export class FormlyService {

  mappedTypes = new Map<string, string>([
    ["string", "text"],
    ["integer", "number"]
  ]);

  relationalLayout: Layout = {
    sections: [
      {
        name: "Server",
        rows: [
          ["host", "port"],
          ["database"]
        ]
      },
      {
        name: "Authentication",
        rows: [["username", "password"]]
      }
    ]
  }

  constructor() { }

  createFormlyFieldConfigs(connectionParameter: ConnectionParameter[]) {
    const layout = this.relationalLayout;

    //create sections
    const formlyGroups: FormlyGroup[] = layout.sections.map(section => this.createFormlyGroup(section));

    //create fields inside of created sections
    connectionParameter.map(p => {
      const section = layout.sections.find(s => s.rows.flat().includes(p.key));

      if (section) {
        //known field
        const rowNumber = section.rows.indexOf(section.rows.find(v => v.includes(p.key))) || 0
        formlyGroups.find(g => g.name === section.name)
          .fieldGroups[rowNumber].push(this.createFormlyFieldConfig(p));
      } else {
        //Push to others
        const others = formlyGroups.find(group => group.name === 'Others') || (() => {
          const othersGroup = this.createFormlyGroup({ name: 'Others', rows: [[]] });
          formlyGroups.push(othersGroup);
          return othersGroup;
        }
        )();

        others.fieldGroups[0].push(this.createFormlyFieldConfig(p));
      }


    });



    const formlyFields: FormlyFieldConfig[] = formlyGroups.flatMap(g => {
      const sectionHeader: FormlyFieldConfig = {
        template: g.headerTemaplte
      }

      const formRows = g.fieldGroups.map(fg => {
        return {
          fieldGroupClassName: g.name === 'Others' ? 'form-group' : 'form-group-inline',
          fieldGroup: fg
        } as FormlyFieldConfig
      }
      );

      return [sectionHeader, ...formRows]
    });

    return formlyFields;
  }

  createFormlyFieldConfig({ key, type, className }: FormlyFieldDeclaration): FormlyFieldConfig {
    const fieldType = this.mappedTypes.get(type.toLowerCase());

    const fieldConfig: FormlyFieldConfig = {
      key: key,
      type: 'input',
      className: className,
      templateOptions: {
        label: key.toUpperCase(),
        type: fieldType
      }
    }
    return fieldConfig;
  }

  private createFormlyGroup(section: Section): FormlyGroup {
    return {
      name: section.name,
      headerTemaplte: `<div class="form-group-header"><hr /><h5>${section.name}</h5><hr /></div>`,
      fieldGroups: section.rows.map(r => [])
    }
  }
}
