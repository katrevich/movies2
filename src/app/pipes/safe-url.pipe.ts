import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'safeUrl'})
export class SafeUrlPipe implements PipeTransform {

  constructor(
    private _sanitizer: DomSanitizer
  ) {}

  transform(value: string, args: string[]): any {
    if (!value) return value;

    return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
