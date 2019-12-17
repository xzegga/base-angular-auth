import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEqualValidatorDirective } from './confirm-equal-validator.directive';


@NgModule({
  declarations: [ConfirmEqualValidatorDirective],
  imports: [
    CommonModule
  ],
  exports: [ConfirmEqualValidatorDirective]
})
export class UtilsModule { }
