import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css']
})
export class ImageFormComponent implements OnInit {

  imageForm: FormGroup;

  get imageUrl() {
    return this.imageForm.get('url').value;
  }

  get imageName() {
    return this.imageForm.get('name').value;
  }

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private imageService: ImageService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getImage(params.id));

    this.createForm();
  }

  createForm() {
    this.imageForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required, Validators.maxLength(200)]],
      filePath: [''],
      url: ['']
    });
  }

  getImage(id: string) {
    this.imageService.getImageById(id).subscribe(image => {
      this.imageForm.get('id').setValue(image[0].id);
      this.imageForm.get('filePath').setValue(image[0].filePath);
      this.imageForm.get('name').setValue(image[0].name);
      this.imageForm.get('url').setValue(image[0].url);
    });
  }
  
  save() {
    this.imageService.updateImageName(this.imageForm.value);
    
    this.router.navigate(['/admin/galeria']);
  }

}
