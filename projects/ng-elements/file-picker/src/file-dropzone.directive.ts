import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

import { PickedFile } from './picked-file';
import { FilePickerError } from './file-picker-error';

@Directive({
  selector: '[valFileDropzone]'
})
export class FileDropzoneDirective implements OnInit {

  @Input()
  public accept = '';

  @Input()
  public maxSize = 0;

  @Output()
  public fileDrop = new EventEmitter<PickedFile | FilePickerError>();

  public constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  public ngOnInit() {
    this.renderer.listen(this.el.nativeElement, 'dragenter', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
    });

    this.renderer.listen(this.el.nativeElement, 'dragover', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();
    });

    this.renderer.listen(this.el.nativeElement, 'drop', (event: DragEvent) => {
      event.stopPropagation();
      event.preventDefault();

      let dt = event.dataTransfer;

      if (dt) {
        let files = dt.files;
        this.handleFiles(files);
      }
    });
  }

  private handleFiles(files: FileList) {

    let file = files[0];

    if (file == null) {
      this.fileDrop.emit(FilePickerError.UndefinedInput);
    } else if (!file.type.match(this.accept)) {
      this.fileDrop.emit(FilePickerError.InvalidFileType);
    } else if (this.maxSize > 0 && file.size > this.maxSize) {
      this.fileDrop.emit(FilePickerError.FileTooBig);
    } else {

      const reader = new FileReader();
      reader.onload = (loaded: ProgressEvent) => {

        const fileReader = loaded.target as FileReader;
        const droppedFile = new PickedFile(
          new Date(file.lastModified),
          file.name, file.size,
          file.type,
          fileReader.result!,
          file
        );

        this.fileDrop.emit(droppedFile);
      };

      reader.readAsDataURL(file);
    }
  }
}
