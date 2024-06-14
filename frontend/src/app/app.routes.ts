// app.routes.ts
import { Routes } from '@angular/router';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NoteDetailComponent } from './components/note-detail/note-detail.component';
import { NoteFormComponent } from './components/note-form/note-form.component';

export const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'note/:id', component: NoteDetailComponent },
  { path: 'create', component: NoteFormComponent },
  { path: 'edit/:id', component: NoteFormComponent },
];
