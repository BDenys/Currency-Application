import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixedLength'
})
export class FixedLengthPipe implements PipeTransform {

  transform(value: number, length: number): number {
    return Number((value).toFixed(length));
  }

}
