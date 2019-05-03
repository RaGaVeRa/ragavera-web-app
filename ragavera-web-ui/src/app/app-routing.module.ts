import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TtsComponent } from './tts/tts.component';
import { OcrComponent } from './ocr/ocr.component';

const routes: Routes = [
  { path: 'tts', component: TtsComponent },
  { path: 'ocr', component: OcrComponent },
  { path: '', redirectTo: '/tts', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
