import { Component, Input } from '@angular/core';

@Component({
  selector: 'loading-component',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  @Input() show: boolean = false;

  imageLoading = "assets/images/loading.gif";
}
