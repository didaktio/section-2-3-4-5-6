import { Pipe, PipeTransform } from '@angular/core';
import { camelToTitle } from '../methods';


/**
 * Transform **camelCase** strings to correctly-spaced, capitalised strings.
 */
@Pipe({ name: 'decamel' })
export class CamelToTitlePipe implements PipeTransform {
  transform = (camelCaseStr: string) => camelToTitle(camelCaseStr);
}