import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Note } from '../app/note'
import { SelectLevelDialogComponent } from './select-level-dialog/select-level-dialog.component';
var Soundfont = require('soundfont-player');

export interface DialogData {
  currentLevel: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  
  title = 'hauteur-app';
  shaked: string | undefined;
  @ViewChild('firstnote') firstnote: ElementRef | undefined;
  @ViewChild('secondnote') secondnote: ElementRef | undefined;
  setTimeout: any;
  destroy$ = new Subject();
  timer: number = 0;
  replay: boolean = false;
  rxjsTimer = timer(100, 100);
  noteSelected: string | undefined;
  streak: number = 0;
  answer: string | undefined;
  ac = new AudioContext();
  timer2: number = 0;
  isClickable: boolean = false;
  currentNote1: string | undefined;
  currentNote2: string | undefined;
  // user data 
  userStats: any = {}
  currentLevel:number = 1;
  count: number = 0;

  notes: Note[] = [
    { number: 1, name : "A0"},
    { number: 2, name : "B0"},
    { number: 3, name : "C0"},
    { number: 4, name : "D0"},
    { number: 5, name : "E0"},
    { number: 6, name : "F0"},
    { number: 7, name : "G0"},
    { number: 8, name : "A0"},
    { number: 9, name : "A1"},
    { number: 10, name : "B1"},
    { number: 11, name : "C1"},
    { number: 12, name : "D1"},
    { number: 13, name : "E1"},
  ];

  tableNotes: any =
    [
    {firstnote : 'C4', secondnote : 'C5'},
    {firstnote : 'C3', secondnote : 'D5'},
    {firstnote : 'C2', secondnote : 'C5'},
    {firstnote : 'C3', secondnote : 'F3'},
    {firstnote : 'C4', secondnote : 'C5'},
    {firstnote : 'C4', secondnote : 'C5'},
    {firstnote : 'C4', secondnote : 'C5'},
    {firstnote : 'C4', secondnote : 'C5'},
    {firstnote : 'C4', secondnote : 'C5'},
    {firstnote : 'C4', secondnote : 'C5'},]






  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectLevelDialogComponent, {
      data: {currentLevel : this.currentLevel},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.currentLevel = result;
    });
  }

  ngOnInit(): void {
    this.userStats = { currentLevel : 1 } 
  }

  public triggerGame(): void {
    this.playNotes(this.tableNotes[0].firstnote, this.tableNotes[0].secondnote);
    
  }; 

  public playNotes(firstnote: string, secondnote: string): void {
    console.log(firstnote);
    console.log(secondnote);
    console.log(this.count);
    
    
    
    this.answer = 'firstnote';
    this.isClickable = false;
    if (this.replay === true) {
      this.replay = !this.replay;
    }
    this.rxjsTimer.pipe(takeUntil(this.destroy$)).subscribe((val) => {
      if (!(this.timer % 10)) {
        console.log(this.timer);
      }

      this.timer = val;

      if (this.timer === 10) {
        this.playSound('firstnote');
        Soundfont.instrument(this.ac, 'acoustic_grand_piano', {
          soundfont: 'MusyngKite',
        }).then((marimba: any) => {
          marimba.play(firstnote);
        });
      }

      if (this.timer === 30) {
        this.playSound('secondnote');
        Soundfont.instrument(this.ac, 'acoustic_grand_piano', {
          soundfont: 'MusyngKite',
        }).then((marimba: any) => {
          marimba.play(secondnote);
        });
        this.isClickable = true;
      }
      if (this.timer >= 50) {
        this.playSound('');
        this.replay = true;
        this.destroy$.next(true);
      }
    });
  }

  private playSound(note: string): void {
    this.shaked = note;
  }

  public selectNote(note: string): void {
    if (this.isClickable === true) {
      this.destroy$.next(true);
      this.isClickable = false;
      this.noteSelected = note;
      if (this.noteSelected === this.answer) {
        console.log('gagné');
        this.streak++;
      } else {
        console.log('perdu');
        this.streak = 0;
      }
      this.count++ ;
      if (this.streak === 5) {
        this.openDialog();
      }
      this.playNotes(this.tableNotes[this.count].firstnote, this.tableNotes[this.count].secondnote);
    }
  }

}
