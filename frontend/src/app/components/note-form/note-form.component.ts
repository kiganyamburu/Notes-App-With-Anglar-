import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css'],
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup;
  isEditMode = false;
  noteId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = +params.get('id')!;
      if (id) {
        this.isEditMode = true;
        this.noteId = id;
        this.noteService.getNoteById(id).subscribe((note) => {
          this.noteForm.patchValue(note);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      const note: Note = {
        ...this.noteForm.value,
        createdAt: new Date(),
        id: this.noteId ? this.noteId : Date.now(),
      };

      if (this.isEditMode) {
        this.noteService.updateNote(note.id, note).subscribe(() => {
          this.router.navigate(['/notes']);
        });
      } else {
        this.noteService.createNote(note).subscribe(() => {
          this.router.navigate(['/notes']);
        });
      }
    }
  }
}
