import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note.model';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.css'],
})
export class NoteDetailComponent implements OnInit {
  note: Note | undefined;

  constructor(
    private route: ActivatedRoute,
    private noteService: NoteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.noteService.getNoteById(id).subscribe((data) => {
      this.note = data;
    });
  }

  deleteNote(): void {
    if (this.note) {
      this.noteService.deleteNote(this.note.id).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
