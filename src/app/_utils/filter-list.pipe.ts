import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {

  public transform(values: any[], filter: string): any[] {

    if (!values || !values.length) {
      return [];
    }
    if (!filter) {
      return values;
    }

    return values.filter(v => {
        let match = false;

        Object.keys(v).forEach(k => {
            console.log(v[k]);
            if (typeof v[k] === 'string') {
                match = match || v[k].toLowerCase().indexOf(filter.toLowerCase()) >= 0;
            } else {
                match = match || v[k] === filter.toLowerCase(); // == intentinally
            }
        });

        return match;
    });
}

}
