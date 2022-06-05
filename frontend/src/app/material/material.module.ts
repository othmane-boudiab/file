import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

const materials = [
  MatButtonModule
];

@NgModule({
  declarations: [],
  imports: [
    materials
    // CommonModule,
    // MatButtonModule,
  ],
  exports: [materials]
})
export class MaterialModule { }
