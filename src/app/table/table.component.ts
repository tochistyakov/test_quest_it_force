import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, InputSignal, signal, Signal, WritableSignal } from '@angular/core';
import { Issue } from '../interfaces/issue.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class Table {

  issues: InputSignal<Issue[]> = input.required<Issue[]>();
  total: Signal<number> = computed(() => this.issues().filter(issue => issue.status === 'open').length)
  selected_ids: WritableSignal<string[]> = signal<string[]>([])
  isIndeterminate: Signal<boolean> = computed(() => this.selected_ids().length > 0 && this.selected_ids().length < this.total())
  isSelectedAll: Signal<boolean> = computed(() => this.selected_ids().length === this.total())

  select(event: Event, id: string): void {
    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {
      this.selected_ids.update(ids => [...ids, id])
    } else {
      this.selected_ids.update(ids => ids.filter(_id => _id !== id))
    }
  }

  selectAll(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selected_ids.set(this.issues().filter(issue => issue.status === 'open').map(issue => issue.id))
    } else {
      this.selected_ids.set([])
    }
  }

  isSelected(id: string): boolean {
    return this.selected_ids().includes(id)
  }
}
