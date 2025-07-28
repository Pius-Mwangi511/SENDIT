
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFormat'
})
export class StatusFormatPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'PENDING': return 'Awaiting Dispatch';
      case 'IN_TRANSIT': return 'On the Way';
      case 'DELIVERED': return 'Delivered ✔';
      default: return value;
    }
  }
}
