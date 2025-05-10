import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleTranslate',
})
export class RoleTranslatePipe implements PipeTransform {
  transform(role: string | undefined): string {
    if (!role) return '';
    return role === 'buyer' ? 'Vásárló' : 'Eladó';
  }
}
