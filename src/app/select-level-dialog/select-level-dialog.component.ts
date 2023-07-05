import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../app.component';

@Component({
  selector: 'app-select-level-dialog',
  templateUrl: './select-level-dialog.component.html',
  styleUrls: ['./select-level-dialog.component.scss']
})
export class SelectLevelDialogComponent {

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  constructor(
    public dialogRef: MatDialogRef<SelectLevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
